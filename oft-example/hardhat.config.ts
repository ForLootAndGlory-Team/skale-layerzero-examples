import 'dotenv/config'
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'
import { EndpointId } from '@layerzerolabs/lz-definitions'

// Set your preferred authentication method

// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: '0.8.20',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        celo: {
            eid: EndpointId.ARBITRUM_TESTNET,
            url: 'https://celo-alfajores.infura.io/v3/768fc166c44e4505a858c8bfa754a4b3',
            accounts,
        },
        fantom: {
            eid: EndpointId.FANTOM_V2_TESTNET,
            url: 'https://fantom.api.onfinality.io/public',
            accounts,
        },
        mumbai: {
            eid: EndpointId.POLYGON_V2_TESTNET,
            url: 'https://polygon-mumbai.infura.io/v3/768fc166c44e4505a858c8bfa754a4b3',
            accounts,
        },
        europa: {
            eid: EndpointId.SKALE_V2_TESTNET,
            url: "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
            accounts,
        }
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
