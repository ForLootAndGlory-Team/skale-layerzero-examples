import hre, { ethers } from "hardhat";
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { utils } from "ethers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from '@layerzerolabs/lz-definitions';

async function main() {
    // Charger ou déployer vos contrats ici. Pour cet exemple, nous allons simplement charger des contrats déjà déployés.
    const WrappedForLootAndGloryAddress = "0x025296871C7767dd0DA6397484bA0bF7809D54e1";
    const ForLootAndGloryTokenAddress = "0x515Fd92d7864e8D9d93ce8EeD3181866a72811E5";
    const ExistingTokenAddress = "0x997028Fe7173b8861f707DCb64EcAc90088003a0";
    const ExistingTokenFactory = await hre.ethers.getContractFactory("ForLootAndGlory");
    const WrappedForLootAndGloryFactory = await hre.ethers.getContractFactory("WrappedForLootAndGlory");
    const ForLootAndGloryTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGlory = WrappedForLootAndGloryFactory.attach(WrappedForLootAndGloryAddress);
    const ForLootAndGloryToken = ForLootAndGloryTokenFactory.attach(ForLootAndGloryTokenAddress);
    const ExistingToken = ExistingTokenFactory.attach(ExistingTokenAddress);

    // Vous devez avoir les adresses des comptes participants.
    const [owner] = await ethers.getSigners();

    // Mint testnet tokens pour le propriétaire.
    const initialAmount = utils.parseEther("1");
    console.log(`Mint ${initialAmount.toString()} tokens to owner`);
    let tx = await ExistingToken.mint(owner.address, initialAmount);
    let receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.hash}`);

    // Effectuer une opération, par exemple, un transfert de tokens.
    console.log(`Approve ${initialAmount.toString()} tokens to ${WrappedForLootAndGloryAddress} on Contract A`);
    tx = await ExistingToken.approve(WrappedForLootAndGloryAddress, initialAmount);
    receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.hash}`);

    // Préparer les paramètres pour le transfert.
    const tokensToSend = utils.parseEther("1");
    const destinationChainId = EndpointId.SKALE_V2_TESTNET
    const destinationAddress = owner.address; // Adresse de destination sur la chaîne B.

    // Construction des options de message.
    const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();

    // Construction des paramètres de la fonction send.
    const sendParam = [
        destinationChainId,
        utils.zeroPad(destinationAddress, 32),
        tokensToSend,
        tokensToSend,
        options,
        '0x',
        '0x',
    ];

    // Obtenir le frais natif pour l'opération de send.
    const [nativeFee] = await WrappedForLootAndGlory.quoteSend(sendParam, false);
    console.log(`Sending ${tokensToSend.toString()} tokens from Contract A to Contract B`);
    tx = await WrappedForLootAndGlory.send(sendParam, [nativeFee, 0], owner.address, { value: nativeFee });
    receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.hash}`);
    console.log("Transfer successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
