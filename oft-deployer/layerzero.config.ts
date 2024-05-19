// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

const polygonContract = {
    eid: EndpointId.POLYGON_MAINNET,
    contractName: 'WrappedForLootAndGlory',
}

const skaleEuropaContract = {
    eid: EndpointId.SKALE_MAINNET,
    contractName: 'ForLootAndGloryToken'
}

export default {
    contracts: [
        {
            contract: polygonContract,
        },
        {
            contract: skaleEuropaContract
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
    ],
}