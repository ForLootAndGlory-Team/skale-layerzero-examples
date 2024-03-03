// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

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
            contract: mumbaiContract,
        },
        {
            contract: skaleContract
        }
    ],
    connections: [
        {
            from: mumbaiContract,
            to: skaleContract
        },
        {
            from: skaleContract,
            to: mumbaiContract
        },
    ],
}