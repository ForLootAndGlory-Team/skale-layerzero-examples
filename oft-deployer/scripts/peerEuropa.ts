import hre, { ethers } from "hardhat";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { Contract, ContractFactory, utils } from "ethers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from '@layerzerolabs/lz-definitions'

async function main() {
    const WrappedForLootAndGloryAddress = "0x22Aa29c2a15cea061f7d7910CA908909164a98C3";
    const ForLootAndGloryTokenAddress = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";
    const ExistingTokenAddress = "0x7bBbAb1F58FdCC2dC32C6fC4faC210fD7E4BEA56";
    const ExistingTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGloryFactory = await hre.ethers.getContractFactory("WrappedForLootAndGlory");
    const ForLootAndGloryTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGlory = WrappedForLootAndGloryFactory.attach(WrappedForLootAndGloryAddress);
    const ForLootAndGloryToken = ForLootAndGloryTokenFactory.attach(ForLootAndGloryTokenAddress);
    const ExistingToken = ExistingTokenFactory.attach(ExistingTokenAddress);

    const [owner] = await ethers.getSigners();

    // function setPeer(uint32 _eid, bytes32 _peer)

    const peerAddress = utils.zeroPad(WrappedForLootAndGloryAddress, 32);
    const peerChainId = EndpointId.POLYGON_MAINNET;

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`);
    await ForLootAndGloryToken.setPeer(peerChainId, peerAddress);

    console.log("Peer set!");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });