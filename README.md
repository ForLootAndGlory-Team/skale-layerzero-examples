Pour mettre à jour la documentation avec les commandes spécifiques que vous avez mentionnées et intégrer les éléments fournis, voici comment vous pourriez structurer les ajouts dans votre fichier README.md. Cette mise à jour comprend l'ajout de commandes pour le déploiement et l'interaction avec les contrats sur les réseaux testnet, ainsi que des modifications et des ajouts pour clarifier l'utilisation des commandes et des outils de développement.

---

<p align="center">
  <a href="https://layerzero.network">
    <img alt="LayerZero" style="max-width: 500px" src="https://d3a2dpnnrypp5h.cloudfront.net/bridge-app/lz.png"/>
  </a>
</p>

<p align="center">
  <a href="https://layerzero.network" style="color: #a77dff">Homepage</a> | <a href="https://docs.layerzero.network/" style="color: #a77dff">Docs</a> | <a href="https://layerzero.network/developers" style="color: #a77dff">Developers</a>
</p>

<h1 align="center">OFT Example</h1>

<p align="center">
  <a href="https://docs.layerzero.network/contracts/oft" style="color: #a77dff">Quickstart</a> | <a href="https://docs.layerzero.network/contracts/oapp-configuration" style="color: #a77dff">Configuration</a> | <a href="https://docs.layerzero.network/contracts/options" style="color: #a77dff">Message Execution Options</a> | <a href="https://docs.layerzero.network/contracts/endpoint-addresses" style="color: #a77dff">Endpoint Addresses</a>
</p>

<p align="center">Template project for getting started with LayerZero's <code>OFT</code> contract development.</p>

## 1) Developing Contracts

### Installing dependencies

```bash
yarn install
```

### Compiling your contracts

This project supports both `hardhat` and `forge` for compilation. By default, the `compile` command will execute both:

```bash
yarn compile
```

## 2) Deploying and Interacting with Contracts

### Setting up deployer wallet/account

- Rename `.env.example` to `.env`
- Choose your preferred method for setting up your deployer wallet/account:

```
MNEMONIC="test test test test test test test test test test test junk"
or...
PRIVATE_KEY="0xabc...def"
```

- Ensure this address is funded with the native tokens of the chain you wish to deploy to.

### Deploying Contracts

To deploy your contracts to your desired blockchains, run the following command:

```bash
npx hardhat run ./deploy/deployOFT.ts --network sepolia &&  npx hardhat run ./deploy/deployOFT.ts --network europaTestnet 
```

### Setting Peers and Bridging Tokens

After deploying, set up the peer contracts on different networks and bridge tokens using the following commands:

```bash
# Setting peer on Sepolia network
npx hardhat run ./scripts/peerSepolia.ts --network sepolia

# Setting peer on Europa network
npx hardhat run ./scripts/peerEuropa.ts --network europaTestnet

# Bridging tokens from Contract A to Contract B on Mumbai network
npx hardhat run ./scripts/bridge.ts --network sepolia
```

Note: You might encounter warnings about `

bigint` bindings. These can usually be ignored for testnet interactions, but ensure your environment supports `bigint` for production deployments.

For more detailed CLI arguments and options:

```bash
npx hardhat lz:deploy --help
```

By following these steps, you can focus more on creating innovative omnichain solutions and less on the complexities of cross-chain communication.

<br></br>

<p align="center">
  Join our community on <a href="https://discord-layerzero.netlify.app/discord" style="color: #a77dff">Discord</a> | Follow us on <a href="https://twitter.com/LayerZero_Labs" style="color: #a77dff">Twitter</a>
</p>