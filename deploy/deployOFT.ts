import hre from 'hardhat'
import assert from 'assert'

const contractNameEuropa = 'ForLootAndGloryToken'
const contractNamePolygon = 'WrappedForLootAndGlory'
const existingContractAddress = '0x9111D6446Ac5b88A84cf06425c6286658368542F'
async function main() {
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
                'ForLootAndGlory',
                'FLAG',
                endpointV2Deployment.address,
                deployer,
            ],
            log: true,
            skipIfAlreadyDeployed: true,
            gasLimit: 3_000_000
        })
        console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
        console.log('verify contract')
        await new Promise(resolve => setTimeout(resolve, 10000))
        await hre.run("verify:verify", {
            address,
            constructorArguments: [
                'ForLootAndGlory',
                'FLAG',
                endpointV2Deployment.address,
                deployer,
            ],
        });
    } else if (hre.network.name === 'polygon') {
        contractName = contractNamePolygon
        const endpointV2Deployment = await hre.deployments.get('EndpointV2')
        const {address} = await deploy(contractName, {
            from: deployer,
            args: [
                existingContractAddress,
                endpointV2Deployment.address,
                deployer,
            ],
            log: true,
            skipIfAlreadyDeployed: true,
            gasLimit: 3_000_000
        })
        console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
        // sleep 10 seconds
        console.log('verify contract')
        await new Promise(resolve => setTimeout(resolve, 10000))
        await hre.run("verify:verify", {
            address: address,
            constructorArguments: [
                existingContractAddress,
                endpointV2Deployment.address,
                deployer,
            ],
        });
        console.log('contract verified')
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
