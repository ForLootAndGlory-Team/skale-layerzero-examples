import hre, {ethers} from "hardhat";
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'

async function main() {
    const WrappedForLootAndGloryAddress = "0xc83c963785B2dAB7b9Ae7bD71B3a7617940E4047";
    const ForLootAndGloryTokenAddress = "0x264d55eABBF7423A0C7146DD38708474c7E1aF7f";
    const ForLootAndGloryTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const ForLootAndGloryToken = ForLootAndGloryTokenFactory.attach(ForLootAndGloryTokenAddress);

    const peerAddress = ethers.utils.zeroPad(WrappedForLootAndGloryAddress, 32);
    const peerChainId = EndpointId.POLYGON_V2_MAINNET;

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`);
    await ForLootAndGloryToken.setPeer(peerChainId, peerAddress);

    console.log("Peer set!");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });