import hre, { ethers } from "hardhat";
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'

async function main() {
    const WrappedForLootAndGloryAddress = "0xc83c963785B2dAB7b9Ae7bD71B3a7617940E4047";
    const ForLootAndGloryTokenAddress = "0xcdF030a3E65f917DFa8d74555A64a5eC5303c88e";
    const WrappedForLootAndGloryFactory = await hre.ethers.getContractFactory("WrappedForLootAndGlory");
    const WrappedForLootAndGlory = WrappedForLootAndGloryFactory.attach(WrappedForLootAndGloryAddress);

    const peerAddress = ethers.utils.zeroPad(ForLootAndGloryTokenAddress, 32);
    const peerChainId = EndpointId.SKALE_V2_MAINNET;
    console.log('peerAddress:', peerAddress);
    console.log('peerChainId:', peerChainId);

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`);
    await WrappedForLootAndGlory.setPeer(peerChainId, peerAddress);

    console.log("Peer set!");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });