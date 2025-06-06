Decentralized Scholarship Funding DApp
A decentralized application (DApp) built on the Ethereum blockchain for scholarship funding. Users can donate ETH, apply for scholarships, and (for admins) release funds using a Solidity smart contract. This project uses Truffle, Ganache, MetaMask, and Web3.js.
Features

Donate ETH: Users can donate ETH to the scholarship fund.
Apply for Scholarship: Users can apply to be scholarship recipients.
Release Funds: Admins can release funds to approved applicants.
View Balance: Check the contract's total balance.

Prerequisites

Node.js (v16.0.0 or later): Download
Truffle: Install globally with npm install -g truffle
Ganache: Install CLI with npm install -g ganache-cli or download GUI from Truffle Suite
MetaMask: Browser extension from MetaMask
Code Editor: e.g., Visual Studio Code

Project Structure
scholarship-dapp/
├── client/                 # Front-end files
│   ├── index.html          # HTML interface
│   └── web3.js             # Web3.js logic for blockchain interaction
├── contracts/              # Solidity smart contracts
│   └── Scholarship.sol     # Main smart contract
├── migrations/             # Deployment scripts
├── test/                   # Test scripts
├── truffle-config.js       # Truffle configuration
├── package.json            # Node.js dependencies
└── README.md               # This file

Setup Instructions

Clone the Repository:
git clone https://github.com/Ishemalove/DonationDapp.git
cd scholarship-dapp


Install Dependencies:
npm install


Start Ganache:

Run Ganache CLI: ganache-cli -p 8545
Or open Ganache GUI and click "Quickstart" (default port: 8545).
Note the mnemonic phrase for MetaMask.


Configure Truffle:

Ensure truffle-config.js is set to connect to Ganache:module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  compilers: {
    solc: { version: "0.8.0" }
  }
};




Compile and Deploy Smart Contract:
truffle compile
truffle migrate


Note the deployed contract address (e.g., 0xFdb73027D4d93993B6F8e3Ac2506Fcbf251BAe55).


Set Up MetaMask:

Install MetaMask browser extension.
Import Ganache mnemonic into MetaMask.
Add custom network:
Network Name: Ganache
RPC URL: http://127.0.0.1:8545
Chain ID: 1337
Currency Symbol: ETH


Switch to the Ganache network.


Run the Front-End:

Navigate to the client directory:cd client


Update web3.js with the deployed contract address:const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with address from truffle migrate


Serve the front-end (e.g., using a local server):npx http-server


Open http://localhost:8080 in your browser.



Usage

Connect Wallet: Click "Connect Wallet" to link MetaMask.
Donate ETH: Enter an amount (e.g., 0.1 ETH) and click "Donate." Confirm in MetaMask.
Apply for Scholarship: Click "Apply" to submit an application. Confirm in MetaMask.
Release Funds (Admin Only): Using the admin account (first Ganache account), enter a recipient address and amount, then click "Release." Confirm in MetaMask.
Check Balance: View the contract’s balance via the front-end or smart contract’s getBalance function.

Smart Contract Details

File: contracts/Scholarship.sol
Functions:
donate(): Accepts ETH donations and emits Donated event.
applyForScholarship(): Registers applicants and emits Applied event.
releaseFunds(address, uint256): Admin-only function to send funds, emits FundsReleased event.
getBalance(): Returns contract balance.


Events: Donated, Applied, FundsReleased
Compiler: Solidity 0.8.0

Deployment to Testnet
To deploy on a public testnet (e.g., Sepolia):

Configure truffle-config.js with an Infura provider and HDWalletProvider.
Run:truffle migrate --network sepolia



Troubleshooting

Push Errors: If git push fails, ensure your branch is up-to-date:git pull origin main

Resolve conflicts, commit, and push again.
MetaMask Connection: Ensure MetaMask is on the Ganache network (Chain ID: 1337).
Contract Errors: Verify the contract address in web3.js matches the deployed address.

References

Truffle Suite - Ganache
Truffle Ethereum Tutorial
GeeksforGeeks - Ganache Tutorial
Codementor - Ethereum DApps
RiseIn - Build DApp
DEV Community - DApp Guide

