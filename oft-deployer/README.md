Pour mettre à jour la documentation avec les commandes spécifiques que vous avez mentionnées et intégrer les éléments fournis, voici comment vous pourriez structurer les ajouts dans votre fichier README.md. Cette mise à jour comprend l'ajout de commandes pour le déploiement et l'interaction avec les contrats sur les réseaux testnet, ainsi que des modifications et des ajouts pour clarifier l'utilisation des commandes et des outils de développement.

---

```markdown
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

We recommend using `pnpm` as a package manager (but you can of course use a package manager of your choice):

```bash
pnpm install
```

### Compiling your contracts

This project supports both `hardhat` and `forge` for compilation. By default, the `compile` command will execute both:

```bash
pnpm compile
```

If you prefer one over the other, you can use the tooling-specific commands:

```bash
pnpm compile:forge
pnpm compile:hardhat
```

Or adjust the `package.json` to for example remove `forge` build:

```diff
- "compile": "$npm_execpath run compile:forge && $npm_execpath run compile:hardhat",
- "compile:forge": "forge build",
- "compile:hardhat": "hardhat compile",
+ "compile": "hardhat compile"
```

### Running tests

Similarly to the contract compilation, we support both `hardhat` and `forge` tests. By default, the `test` command will execute both:

```bash
pnpm test
```

If you prefer one over the other, you can use the tooling-specific commands:

```bash
pnpm test:forge
pnpm test:hardhat
```

Or adjust the `package.json` to for example remove `hardhat` tests:

```diff
- "test": "$npm_execpath test:forge && $npm_execpath test:hardhat",
- "test:forge": "forge test",
- "test:hardhat": "$npm_execpath hardhat test"
+ "test": "forge test"
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
npx hardhat lz:deploy
```

### Setting Peers and Bridging Tokens

After deploying, set up the peer contracts on different networks and bridge tokens using the following commands:

```bash
# Setting peer on Mumbai network
npx hardhat run ./scripts/peerMumbai.ts --network mumbai

# Setting peer on Europa network
npx hardhat run ./scripts/peerEuropa.ts --network europa

# Bridging tokens from Contract A to Contract B on Mumbai network
npx hardhat run ./scripts/bridge.ts --network mumbai
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