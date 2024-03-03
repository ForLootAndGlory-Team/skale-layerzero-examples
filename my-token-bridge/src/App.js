import React, { useState } from 'react';
import './App.css';
import { approveTokens, bridgeTokens, checkCurrentChain, connectWallet, quoteSend, switchChain } from './web3/web3';
import img from './mHeading.png';
import TokenABI from "./web3/ForLootAndGloryTokenABI.json";
import { ethers } from 'ethers';

function App() {
  const [signer, setSigner] = useState(null);
  const [amount, setAmount] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [sendParamsFee, setSendParamsFee] = useState({});
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeSuccess, setBridgeSuccess] = useState(false);
  const contractEuropa = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";

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
        setSigner(signer);
      } else {
        console.log("L'utilisateur n'a pas changé de chaîne.");
      }
    } else {
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

  const handleQuoteSend = async () => {
    if (!signer || !amount) {
      console.log("Wallet not connected or amount is not set");
      return;
    }
    const fees = await quoteSend(signer, amount);
    setSendParamsFee(fees);
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
        <button onClick={handleConnect}>Connect Wallet</button>
        <div className="bridge-box">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to bridge"
          />
          <button type="button" onClick={handleApprove} disabled={!amount || amount <= 0}>Approve Tokens</button>
          <button type="button" onClick={handleQuoteSend} disabled={!amount || amount <= 0 || !isApproved}>Estimate Gas Fee</button>
          {sendParamsFee.nativeFees && <p>Estimated Gas Fee: {sendParamsFee.nativeFees}</p>}
          <button type="button" onClick={handleBridge} disabled={!isApproved || !sendParamsFee.nativeFees}>Bridge</button>
          {isBridging && <p>Bridging in progress... Please wait.</p>}
          {bridgeSuccess && <p>The bridge was successful!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;