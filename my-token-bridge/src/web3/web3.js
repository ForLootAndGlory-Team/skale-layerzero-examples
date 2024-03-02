import { ethers } from 'ethers';
import TokenABI from "./ForLootAndGloryTokenABI.json";

export async function connectWallet() {
    if (window.ethereum) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log('Connected', (await signer).address);
            return signer;
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

export async function switchChain(chainId) {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethers.toBeHex(chainId) }], // `chainId` doit être en hexadécimal
        });
    } catch (switchError) {
        console.error("Could not switch to the chain: ", switchError);
    }
}

export function listenForBridgeCompletion(contractAddress, provider, fromBlock) {
    const contract = new ethers.Contract(contractAddress, TokenABI, provider);
    contract.on("Transfer", (from, to, amount, event) => {
        console.log(`Token Bridged: ${amount} tokens from ${from} to ${to}`);
        // Traiter l'événement ici
    });
}

export async function bridgeTokens(signer, amount) {
    const contractAddress = "ADRESSE_DU_CONTRAT";
    const contractABI = TokenABI // L'ABI de votre contrat
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.bridgeTokens(ethers.parseUnits(amount, "ether"));
        await tx.wait();
        console.log("Bridge réussi");
    } catch (error) {
        console.error("Erreur lors du bridge: ", error);
    }
}

