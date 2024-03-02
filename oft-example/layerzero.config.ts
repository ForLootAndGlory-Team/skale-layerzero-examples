// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

const celoContract = {
    eid: EndpointId.CELO_V2_TESTNET,
    contractName: 'ForLootAndGloryToken',
}

const fantomContract = {
    eid: EndpointId.FANTOM_V2_TESTNET,
    contractName: 'ForLootAndGloryToken',
}

const mumbaiContract = {
    eid: EndpointId.POLYGON_V2_TESTNET,
    contractName: 'WrappedForLootAndGlory',
}

const skaleContract = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'ForLootAndGloryToken'
}

export default {
    contracts: [
        {
            contract: fantomContract,
        },
        {
            contract: celoContract,
        },
        {
            contract: mumbaiContract,
        },
        {
            contract: skaleContract
        }
    ],
    connections: [
        {
            from: fantomContract,
            to: celoContract,
            config: {},
        },
        {
            from: fantomContract,
            to: mumbaiContract,
        },
        {
            from: fantomContract,
            to: skaleContract
        },
        {
            from: celoContract,
            to: fantomContract,
        },
        {
            from: celoContract,
            to: mumbaiContract,
        },
        {
            from: celoContract,
            to: skaleContract
        },
        {
            from: mumbaiContract,
            to: celoContract,
        },
        {
            from: mumbaiContract,
            to: fantomContract,
        },
        {
            from: mumbaiContract,
            to: skaleContract
        },
        {
            from: skaleContract,
            to: fantomContract
        },
        {
            from: skaleContract,
            to: mumbaiContract
        },
        {
            from: skaleContract,
            to: celoContract
        }
    ],
}