import React, { useState, useEffect } from 'react';
import './App.css';
import { approveTokens, bridgeTokens, checkCurrentChain, connectWallet, getTokenBalance, isApproved, quoteSend, switchChain } from './web3/web3';
import img from './mHeading.png';
import TokenABI from "./web3/ForLootAndGloryTokenABI.json";
import { ethers } from 'ethers';

function App() {
  const [signer, setSigner] = useState(null);
  const [amount, setAmount] = useState('');
  const [isApprove, setIsApproved] = useState(false);
  const [sendParamsFee, setSendParamsFee] = useState({});
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeSuccess, setBridgeSuccess] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const contractEuropa = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";

  useEffect(() => {
    // Fonction pour estimer les frais de gas
    const fetchGasEstimate = async () => {
      if (signer && amount > 0) {
        try {
          const fees = await quoteSend(signer, amount);
          setSendParamsFee(fees);
          const isApprove = await isApproved(signer, amount);
          setIsApproved(isApprove);
          const balance = await getTokenBalance(signer);
          setTokenBalance(balance);
        } catch (error) {
          console.error("Erreur lors de l'estimation des frais de gas:", error);
          // Gérer l'erreur, par exemple en réinitialisant l'estimation des frais
          setSendParamsFee({});
        }
      }
    };

    fetchGasEstimate();
  }, [amount, signer]);

  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress');
    if (walletAddress) {
      // Logique pour gérer un portefeuille déjà connecté
      // Par exemple, instancier un nouveau signer avec ethers.js si nécessaire
      console.log(`Portefeuille trouvé : ${walletAddress}`);
      // Mettre à jour l'état ou l'UI ici en conséquence
    }
  }, []);

  function listenForBridgeCompletion(userAddress) {
    // Assurez-vous d'utiliser le bon provider et l'adresse du contrat
    const provider = new ethers.JsonRpcProvider("https://testnet.skalenodes.com/v1/juicy-low-small-testnet");
    const contract = new ethers.Contract(contractEuropa, TokenABI, provider);
    contract.on("Transfer", (from, to, amount, event) => {
      if (to === userAddress) {
        setIsBridging(false); // Arrête le pontage
        setBridgeSuccess(true); // Marque le succès du pontage
        console.log(`Bridge successful: ${ethers.formatEther(amount)} tokens to ${to}`);
        // Vous pouvez ajouter ici d'autres actions de succès, comme fermer un modal ou rafraîchir un état
        contract.off("Transfer");
        console.log("Listener removed");
      }
    });
  }

  const handleConnect = async () => {
    const signer = await connectWallet();
    const isCorrectChain = await checkCurrentChain();
    if (!isCorrectChain) {
      const didSwitch = await switchChain();
      if (didSwitch) {
        const address = await signer.getAddress();
        localStorage.setItem('walletAddress', address); // Stocke l'adresse dans localStorage
        setSigner(signer);
      } else {
        console.log("L'utilisateur n'a pas changé de chaîne.");
      }
    } else {
      const address = await signer.getAddress();
      localStorage.setItem('walletAddress', address); // Stocke l'adresse dans localStorage
      setSigner(signer);
    }
  };



  const handleApprove = async () => {
    if (!signer) {
      console.log("Wallet not connected");
      return;
    }
    const success = await approveTokens(signer, amount);
    setIsApproved(success);
  };

  const handleBridge = async () => {
    setIsBridging(true);
    setBridgeSuccess(false);
    if (!isApproved) {
      console.log("Tokens not approved for bridge");
      return;
    }
    await bridgeTokens(signer, sendParamsFee.sendParams, sendParamsFee.nativeFees);
    listenForBridgeCompletion(await signer.getAddress());
  };

  return (
    <div className="App">
      <div className="image-container">
        <img src={img} alt="For Loot & Glory" />
      </div>
      <div className="bridge-form">
        {signer ? (
          <p>Wallet: {localStorage.getItem('walletAddress')}</p>
        ) : (
          <button type="button" onClick={handleConnect}>Connect Wallet</button>
        )}
        <p>Bridge your FLAG token from Polygon to Skale Europa Hub </p>
        <div className="bridge-box">
          <p style={{ color: 'black' }}>Your balance: {tokenBalance} FLAG</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to bridge"
          />
          {!isApprove &&
            <button type="button" onClick={handleApprove} disabled={!amount || amount <= 0}>Approve Tokens</button>}
          {sendParamsFee.nativeFees && <p style={{ color: 'black' }}>Estimated Gas Fee: {sendParamsFee.nativeFees}</p>}
          <button type="button" onClick={handleBridge} disabled={!isApproved || !sendParamsFee.nativeFees}>Bridge</button>
          {isBridging && <p style={{ color: 'black' }}>Bridging in progress... Please wait.</p>}
          {bridgeSuccess && <p style={{ color: 'black' }}>The bridge was successful!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;