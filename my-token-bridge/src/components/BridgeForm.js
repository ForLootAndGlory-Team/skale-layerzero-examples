import React, { useState } from 'react';

function BridgeForm({ onBridge, chains }) {
    const [amount, setAmount] = useState('');
    const [sendChain, setSendChain] = useState('');
    const [receiveChain, setReceiveChain] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (amount <= 0) {
            alert("Le montant doit être supérieur à 0");
            return;
        }
        onBridge(amount, sendChain, receiveChain);
    };


    return (
        <div className="bridge-box">
            <form onSubmit={handleSubmit}>
                <select value={sendChain} onChange={(e) => setSendChain(e.target.value)}>
                    {chains.map((chain) => (
                        <option key={chain.id} value={chain.id}>{chain.name}</option>
                    ))}
                </select>
                <select value={receiveChain} onChange={(e) => setReceiveChain(e.target.value)}>
                    {chains.map((chain) => (
                        <option key={chain.id} value={chain.id}>{chain.name}</option>
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