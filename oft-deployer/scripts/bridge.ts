import hre, { ethers } from "hardhat";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { Contract, ContractFactory, utils } from "ethers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from '@layerzerolabs/lz-definitions'

async function main() {
    // Charger ou déployer vos contrats ici. Pour cet exemple, nous allons simplement charger des contrats déjà déployés.
    const WrappedForLootAndGloryAddress = "0x22Aa29c2a15cea061f7d7910CA908909164a98C3";
    const ForLootAndGloryTokenAddress = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";
    const ExistingTokenAddress = "0x7bBbAb1F58FdCC2dC32C6fC4faC210fD7E4BEA56";
    const ExistingTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGloryFactory = await hre.ethers.getContractFactory("WrappedForLootAndGlory");
    const ForLootAndGloryTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGlory = WrappedForLootAndGloryFactory.attach(WrappedForLootAndGloryAddress);
    const ForLootAndGloryToken = ForLootAndGloryTokenFactory.attach(ForLootAndGloryTokenAddress);
    const ExistingToken = ExistingTokenFactory.attach(ExistingTokenAddress);

    // Vous devez avoir les adresses des comptes participants.
    const [owner] = await ethers.getSigners();

    // Effectuer une opération, par exemple, un transfert de tokens.
    const initialAmount = utils.parseEther("1");
    console.log(`Approve ${initialAmount.toString()} tokens to ${WrappedForLootAndGloryAddress} on Contract A`);
    await ExistingToken.approve(WrappedForLootAndGloryAddress, initialAmount);

    // Préparer les paramètres pour le transfert.
    const tokensToSend = utils.parseEther("1");
    const destinationChainId =  EndpointId.SKALE_V2_TESTNET
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
    await WrappedForLootAndGlory.send(sendParam, [nativeFee, 0], owner.address, { value: nativeFee });

    console.log("Transfer successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
