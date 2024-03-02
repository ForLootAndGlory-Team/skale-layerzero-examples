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
    const chains = [
        { id: 80001, name: "Mumbai", endpointId: 40109 },
        { id: 1444673419, name: "Europa", endpointId: 40254 },
    ];

    const contractSender = endId === chains[0].endpointId ? contractMumbai : contractEuropa;
    const contractReceiver = endId === chains[0].endpointId ? contractEuropa : contractMumbai;
    const contractABI = TokenABI // L'ABI de votre contrat
    const contract = new ethers.Contract(contractSender, contractABI, signer);
    const sendParams = {
        dstEid: endId,
        to: ethers.toBeHex(signer.address, 32),
        amountLD: ethers.parseUnits(amount.toString(), "ether"),
        minAmountLD: ethers.parseUnits(amount.toString(), "ether"),
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x"
    };
    console.log("sendParams", sendParams);
    const msgFee = {
        nativeFee: 0n,
        lzTokenFee: 0n,
    }
    try {
        // console.log("check peer : ", endId, ethers.toBeHex(contractReceiver, 32));
        // const isPeer = await contract.isPeer(endId, ethers.toBeHex(contractReceiver, 32));
        // console.log("Is peer : ", isPeer);
        const [quote] = await contract.quoteOFT(sendParams);
        console.log("Quote : ", [quote]);
        const tx = await contract.send(sendParams, [quote, 0], signer.address, { value: quote });
        console.log("Bridge : ", tx);
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