import assert from 'assert'
import { type DeployFunction } from 'hardhat-deploy/types'

const contractNameEuropa = 'ForLootAndGloryToken'
const contractNameMumbai = 'WrappedForLootAndGlory'
const existingContractAddress = '0x7bBbAb1F58FdCC2dC32C6fC4faC210fD7E4BEA56'
const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    assert(deployer, 'Missing named deployer account')
    let contractName;
    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)
    if (hre.network.name === 'europa') {
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
    } else if (hre.network.name === 'mumbai') {
        contractName = contractNameMumbai
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
deploy.tags = [contractNameMumbai, contractNameEuropa]
export default deploy
