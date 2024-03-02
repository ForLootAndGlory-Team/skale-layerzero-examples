import React, { useState } from 'react';
import { switchChain } from '../web3/web3';

function BridgeForm({ onBridge, chains }) {
    const [amount, setAmount] = useState('');
    const [sendChain, setSendChain] = useState({ id: 80001, name: "Mumbai", endpointId: 40109 });
    const [receiveChain, setReceiveChain] = useState({ id: 1444673419, name: "Europa", endpointId: 40254 });

    const handleSendChainChange = (event) => {
        const selectedChain = chains.find(chain => chain.name === event.target.value);
        setSendChain(selectedChain);
    };

    const handleReceiveChainChange = (event) => {
        const selectedChain = chains.find(chain => chain.name === event.target.value);
        setReceiveChain(selectedChain);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (amount <= 0) {
            alert("Le montant doit être supérieur à 0");
            return;
        }
        console.log("Bridge", amount, sendChain, receiveChain);
        // await switchChain(sendChain)
        onBridge(amount, receiveChain.endpointId);
    };

    return (
        <div className="bridge-box">
            <form onSubmit={handleSubmit}>
                <select value={sendChain.name} onChange={handleSendChainChange}>
                    {chains.map((chain) => (
                        <option key={chain.id} value={chain.name}>{chain.name}</option>
                    ))}
                </select>
                <select value={receiveChain.name} onChange={handleReceiveChainChange}>
                    {chains.map((chain) => (
                        <option key={chain.id} value={chain.name}>{chain.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount to bridge"
                />
                <button type="submit">Bridge</button>
            </form>
        </div>
    );
}

export default BridgeForm;
