import assert from 'assert'
import { type DeployFunction } from 'hardhat-deploy/types'

const contractNameEuropa = 'ForLootAndGloryToken'
const contractNamePolygon = 'WrappedForLootAndGlory'
const existingContractAddress = '0x9111D6446Ac5b88A84cf06425c6286658368542F'
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
    } else if (hre.network.name === 'polygon') {
        contractName = contractNamePolygon
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
deploy.tags = [contractNamePolygon, contractNameEuropa]
export default deploy
