import hre from 'hardhat'
import assert from 'assert'

async function main() {
    const { getNamedAccounts, deployments } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    assert(deployer, 'Missing named deployer account')
    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)
    if (hre.network.name === 'polygon') {
        const contractName = 'ForLootAndGlory'
        const { address } = await deploy(contractName, {
            from: deployer,
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