// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

const polygonContract = {
    eid: EndpointId.POLYGON_V2_MAINNET,
    contractName: 'WrappedForLootAndGlory',
}

const skaleEuropaContract = {
    eid: EndpointId.SKALE_V2_MAINNET,
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
    ],
    connections: [
        {
            from: skaleEuropaContract,
            to: polygonContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0xce8358bc28dd8296Ce8cAF1CD2b44787abd65887"
                        ]
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0xce8358bc28dd8296Ce8cAF1CD2b44787abd65887"
                        ]
                    }
                },
            },
            
        },
        {
            from: polygonContract,
            to: skaleEuropaContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0x23de2fe932d9043291f870324b74f820e11dc81a"
                        ]
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0x23de2fe932d9043291f870324b74f820e11dc81a"
                        ]
                    },
                },
            }
        },
    ],
}