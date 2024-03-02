import React, { useState } from 'react';
import './App.css';
import { approveTokens, bridgeTokens, connectWallet, listenForBridgeCompletion } from './web3/web3';
import BridgeForm from './components/BridgeForm';
import img from './mHeading.png';

function App() {
  const [signer, setSigner] = useState(null);
  const chains = [
    { id: 80001, name: "Mumbai", endpointId: 40109},
    { id: 1444673419, name: "Europa", endpointId: 40254 },
  ];

  const handleConnect = async () => {
    const signer = await connectWallet();
    setSigner(signer);
  };

  const handleBridge = async (amount, endpointId) => {
    if (!signer) {
      console.log("Wallet non connecté");
      return;
    }
    console.log("Bridge", amount, endpointId);
    await approveTokens(signer, amount);
    await bridgeTokens(signer, amount, endpointId);
    listenForBridgeCompletion(signer.address);
  };

  return (
    <div className="App">
      <div className="image-container">
        <img src={img} alt="For Loot & Glory" /> {/* Utilisez une balise img ici */}
      </div>
      <div className="bridge-form">
        <button onClick={handleConnect}>Connect Wallet</button>
        <BridgeForm onBridge={handleBridge} chains={chains} />
      </div>
    </div>

  );
}

export default App;