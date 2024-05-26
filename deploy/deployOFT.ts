import hre from 'hardhat'
import assert from 'assert'
import { type DeployFunction } from 'hardhat-deploy/types'

const contractNameEuropa = 'ForLootAndGloryToken'
const contractNameSepolia = 'WrappedForLootAndGlory'
const existingContractAddress = '0x997028Fe7173b8861f707DCb64EcAc90088003a0'
async function main() {
    const { getNamedAccounts, deployments } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    assert(deployer, 'Missing named deployer account')
    let contractName;
    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)
    if (hre.network.name === 'europaTestnet') {
        contractName = contractNameEuropa
        const endpointV2Deployment = await hre.deployments.get('EndpointV2')
        const { address } = await deploy(contractName, {
            from: deployer,
            args: [
                'ForLootAndGlory', // name
                'FLAG', // symbol
                endpointV2Deployment.address, // LayerZero's EndpointV2 address
                deployer, // owner
            ],
            log: true,
            skipIfAlreadyDeployed: false,
            gasLimit: 3_000_000
        })
        console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
    } else if (hre.network.name === 'sepolia') {
        contractName = contractNameSepolia
        const endpointV2Deployment = await hre.deployments.get('EndpointV2')
        const { address } = await deploy(contractName, {
            from: deployer,
            args: [
                existingContractAddress, // existing contract address
                endpointV2Deployment.address, // LayerZero's EndpointV2 address
                deployer, // owner
            ],
            log: true,
            skipIfAlreadyDeployed: false,
            gasLimit: 3_000_000
        })
        console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
