import hre, {ethers} from "hardhat";
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'

async function main() {
    const WrappedForLootAndGloryAddress = "0x025296871C7767dd0DA6397484bA0bF7809D54e1";
    const ForLootAndGloryTokenAddress = "0x264d55eABBF7423A0C7146DD38708474c7E1aF7f";
    const ExistingTokenAddress = "0x997028Fe7173b8861f707DCb64EcAc90088003a0";
    const ExistingTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGloryFactory = await hre.ethers.getContractFactory("WrappedForLootAndGlory");
    const ForLootAndGloryTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGlory = WrappedForLootAndGloryFactory.attach(WrappedForLootAndGloryAddress);
    const ForLootAndGloryToken = ForLootAndGloryTokenFactory.attach(ForLootAndGloryTokenAddress);
    const ExistingToken = ExistingTokenFactory.attach(ExistingTokenAddress);

    // function setPeer(uint32 _eid, bytes32 _peer)

    const peerAddress = ethers.utils.zeroPad(WrappedForLootAndGloryAddress, 32);
    const peerChainId = EndpointId.SEPOLIA_V2_TESTNET;

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`);
    await ForLootAndGloryToken.setPeer(peerChainId, peerAddress);

    console.log("Peer set!");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });