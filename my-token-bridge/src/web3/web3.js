import { ethers } from 'ethers';
import TokenABI from "./ForLootAndGloryTokenABI.json";

const contractEuropa = "0x47AAE803FBa959F3bd1FDBCA8E1f101D31c22304";
const contractMumbai = '0x3B823a275684f6bd9b6bDCbB293082d9dB6F1b75';
const existingTokenMumbai = "0x7bBbAb1F58FdCC2dC32C6fC4faC210fD7E4BEA56";

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
            params: [{ chainId: ethers.toBeHex(chainId) }],
        });
    } catch (switchError) {
        console.error("Could not switch to the chain: ", switchError);
    }
}

export function listenForBridgeCompletion(userAddress) {
    console.log("Listening for bridge completion");
    const provider = new ethers.JsonRpcProvider("https://testnet.skalenodes.com/v1/juicy-low-small-testnet");
    const contract = new ethers.Contract(contractEuropa, TokenABI, provider);
    contract.on("Transfer", (from, to, amount, event) => {
        console.log(`Token Bridged: ${amount} to ${to}`);
        if (from === "0x0000000000000000000000000000000000000000" && to === userAddress) {
            console.log("Bridge successful", amount.toString());
        }
    });
}

export async function bridgeTokens(signer, amount, endId) {
    const contractAddress = contractMumbai;
    const contractABI = TokenABI // L'ABI de votre contrat
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.bridgeTokens(ethers.parseUnits(amount, "ether"), 0, endId);
        await tx.wait();
        console.log("Bridge réussi");
    } catch (error) {
        console.error("Erreur lors du bridge: ", error);
    }
}

export async function approveTokens(signer, amount) {
    const contractAddress = existingTokenMumbai;
    const contractABI = TokenABI // L'ABI de votre contrat
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.approve(contractMumbai, ethers.parseUnits(amount, "ether"));
        await tx.wait();
        console.log("Approve réussi");
    } catch (error) {
        console.error("Erreur lors de l'approve: ", error);
    }
}

export async function getTokenBalance(signer) {
    const contractAddress = contractMumbai;
    const contractABI = TokenABI // L'ABI de votre contrat
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const balance = await contract.balanceOf((await signer).address);
    return ethers.formatUnits(balance, "ether");
}