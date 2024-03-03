import { ethers } from 'ethers';
import WTokenABI from "./WrappedForLootAndGloryABI.json";
import TokenABI from "./ForLootAndGloryTokenABI.json";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from '@layerzerolabs/lz-definitions';

// Adresses des contrats pour chaque réseau
const contractEuropa = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";
const contractMumbai = '0x22Aa29c2a15cea061f7d7910CA908909164a98C3';
const existingTokenMumbai = "0x7bBbAb1F58FdCC2dC32C6fC4faC210fD7E4BEA56";
// Définissez l'ID de chaîne pour Mumbai Testnet
const REQUIRED_CHAIN_ID = "0x13881"; // Hexadécimal pour 80001

// Connecter le portefeuille de l'utilisateur
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

export async function checkCurrentChain() {
    if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== REQUIRED_CHAIN_ID) {
            alert("Vous n'êtes pas connecté à la chaîne Mumbai. Veuillez changer de chaîne.");
            return false;
        }
        return true;
    } else {
        alert("Veuillez installer MetaMask !");
        return false;
    }
}

export async function switchChain() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: REQUIRED_CHAIN_ID }],
            });
            return true;
        } catch (switchError) {
            // Gérer les erreurs, par exemple si l'utilisateur rejette la demande de changement de chaîne
            console.error("Impossible de changer de chaîne: ", switchError);
            return false;
        }
    }
}

// Fonction de pontage des tokens
export async function bridgeTokens(signer, sendParams, nativeFees) {
    const contract = new ethers.Contract(contractMumbai, WTokenABI, signer);
    try {
        const tx = await contract.send(sendParams, [ethers.parseEther(nativeFees), 0], signer.address, { value: ethers.parseEther(nativeFees) });
        await tx.wait();
        console.log("Bridge transaction hash:", tx.hash);
        return tx;
    } catch (error) {
        console.error("Error during bridging: ", error);
    }
}

// Obtenir une estimation des frais pour le pontage
export async function quoteSend(signer, amount) {
    const contract = new ethers.Contract(contractMumbai, WTokenABI, signer);
    const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex();

    const sendParams = [
        EndpointId.SKALE_V2_TESTNET,
        ethers.zeroPadValue(signer.address, 32),
        ethers.parseUnits(amount.toString(), "ether"),
        ethers.parseUnits(amount.toString(), "ether"),
        options,
        "0x",
        "0x"
    ];

    const [nativeFees] = await contract.quoteSend(sendParams, false);
    console.log("Estimated native fees: ", ethers.formatUnits(nativeFees, "ether"));
    return { nativeFees: ethers.formatUnits(nativeFees, "ether"), sendParams };
}

// Approuver les tokens avant le pontage
export async function approveTokens(signer, amount) {
    const contract = new ethers.Contract(existingTokenMumbai, TokenABI, signer);
    try {
        const tx = await contract.approve(contractMumbai, ethers.parseUnits(amount, "ether"));
        await tx.wait();
        console.log("Approval successful",tx.hash);
        return tx;
    } catch (error) {
        console.error("Error during token approval: ", error);
    }
}

// Obtenir le solde du token de l'utilisateur
export async function getTokenBalance(signer) {
    const contract = new ethers.Contract(existingTokenMumbai, TokenABI, signer);
    const balance = await contract.balanceOf(await signer.getAddress());
    return ethers.formatEther(balance);
}
