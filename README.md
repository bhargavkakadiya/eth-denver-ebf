# 🌍 EBF Network of Trust 🌱

<p align="center">
  First, connect to Linea: https://chainlist.org/?search=linea<br>
  Then, see the demo: <a href="https://ethden24-ebf.vercel.app/"><strong>🚀 Testnet Demo</strong></a>
</p>

<div align="center">

🧪 **Project Overview** 🧪

A discoverable network of trust for registering impact projects and verifying their ecological benefits, built using Verax attestations and the Ecological Benefits Framework.

⚙️ **Technology Stack** ⚙️

📈 Linea 🔍 Verax 💡 Phosphor 🧩 ERC1155 🌐 IPFS 🖼️ NFT.Storage ⚛️ NextJS 🛠️ Hardhat 🌈 RainbowKit 🏗️ ScaffoldETH2 ✊ Wagmi 🛂 Gitcoin Passport

✅ **Current Status**: Live on Linea Testnet

![image](https://github.com/bhargavkakadiya/eth-denver-ebf/assets/31582215/8708af1a-31a2-4a1d-bab2-d5b4536d93b3)
![image](https://github.com/bhargavkakadiya/eth-denver-ebf/assets/31582215/2d9bca0a-9d63-4c8c-b1ef-8d5464b2ae27)

</div>

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone git@github.com:bhargavkakadiya/eth-denver-ebf.git
cd eth-denver-ebf
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

## 🌐 The Problem We Solve

The ecological benefits framework offers a standardized way of quantifying and communicating ecological benefits for projects. However, discovering these projects and verifying their benefits remains a challenge.

EBFNT introduces a standard way to connect attestation networks of trust to projects that claim ecological benefits. This makes projects discoverable and their benefits verifiable through an intuitive dashboard, aiding in the evaluation of impact essential for grants programs and funding mechanisms. Each project is registered as an 1155 NFT. Project owners can reward attesters with airdrops. The system maintains a network of trust between attesters and projects. Sybil defence is implemented using gitcoin passport.

## 💡 Key Features

- **Discoverable Network of Trust**: Easily find and connect with ecological projects and trusted contributors.
- **Verifiable Impact**: Ecological benefits framework offers standardized impact classifications.
- **Airdrop Rewards to Attesters**: Phosphor allows one click airdrops to attester network.
- **Sybil Resistant**: Using Gitcoin Passport

## 🌎 User Flow

![Drawing 2024-03-02 04 34 29 excalidraw](https://github.com/bhargavkakadiya/eth-denver-ebf/assets/31582215/98f9b1d9-6554-41b4-b46c-519d1ad6fd9d)

## 🚧 Challenges Overcome

- Fixed an issue with the initial Verax subgraph not working on Goerli Linea by obtaining a working subgraph URL from the Linea team.
- Resolved challenges in decoding the attestation payload from the GraphQL API with mentorship and detailed examination of encode and decode examples.

## 🤝 How to Contribute

We welcome contributions from those passionate about building a sustainable future. If you're interested in contributing, please feel free to get in touch or submit a pull request.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started, follow the steps below:

1. Clone this repo & install dependencies

```
git clone <>
cd <>
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## 🔗 Resources

- **Phosphor Documentation for Airdrops**: [https://docs.phosphor.xyz/introduction](https://docs.phosphor.xyz/introduction)
- **Deployed Contract**: [View on Lineascan](https://goerli.lineascan.build/address/0xaCC29f908Dd44C9df734c8a8125DbDcc1b375CA1#code)
- **Ecological Benefits Framework**: https://www.canyouchangethefuture.org/

Let's build a sustainable future together! 🌟

## 🐾 Team Members

- @bhargavkakadiya
- @Dharmik79
- @DarrenZal
- @LinuxIsCool
