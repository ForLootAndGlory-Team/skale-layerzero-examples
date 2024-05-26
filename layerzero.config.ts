// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

const polygonContract = {
    eid: EndpointId.POLYGON_V2_MAINNET,
    contractName: 'WrappedForLootAndGlory',
}

const sepoliaContract = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'ForLootAndGloryToken'
}

const skaleEuropaContract = {
    eid: EndpointId.SKALE_V2_MAINNET,
    contractName: 'ForLootAndGloryToken'
}

const skaleEuropaTestnetContract = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'ForLootAndGloryToken'
}

const arbitrumContract = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'ForLootAndGloryToken'
}


export default {
    contracts: [
        {
            contract: polygonContract,
        },
        {
            contract: skaleEuropaContract
        },
        {
            contract: arbitrumContract
        },
        {
            contract: sepoliaContract
        },
        {
            contract: skaleEuropaTestnetContract
        }
    ],
    connections: [
        {
            from: polygonContract,
            to: skaleEuropaContract
        },
        {
            from: skaleEuropaContract,
            to: polygonContract
        },
        {
            from: polygonContract,
            to: arbitrumContract
        },
        {
            from: arbitrumContract,
            to: polygonContract
        },
        {
            from: skaleEuropaContract,
            to: arbitrumContract
        },
        {
            from: arbitrumContract,
            to: skaleEuropaContract
        },
        {
            from: sepoliaContract,
            to: skaleEuropaTestnetContract
        },
        {
            from: skaleEuropaTestnetContract,
            to: sepoliaContract
        },

    ],
}