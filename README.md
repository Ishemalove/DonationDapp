# 🎓 Decentralized Scholarship Funding DApp

A decentralized application (DApp) built on the **Ethereum blockchain** for scholarship funding. Users can **donate ETH**, **apply for scholarships**, and (for admins) **release funds** via a Solidity smart contract.

Built with ❤️ using:
- Truffle
- Ganache
- MetaMask
- Web3.js

---

## ✨ Features

| Feature               | Description                                  |
|----------------------|----------------------------------------------|
| 💸 Donate ETH         | Support the scholarship fund with Ethereum. |
| 📩 Apply for Scholarship | Students can submit scholarship applications. |
| ✅ Release Funds (Admin) | Admins can approve and send ETH to applicants. |
| 👀 View Balance       | Check the total ETH in the contract.         |

---

## 🧰 Prerequisites

Make sure you have the following installed:

- 📦 [Node.js (v16+)](https://nodejs.org/)
- 🧪 Truffle: `npm install -g truffle`
- 🔧 Ganache CLI: `npm install -g ganache-cli` or [download GUI](https://trufflesuite.com/ganache/)
- 🦊 [MetaMask Extension](https://metamask.io/)
- 🖊️ Code Editor (e.g., VS Code)

---

## 📁 Project Structure

| Folder/File           | Description                         |
|-----------------------|-------------------------------------|
| `client/`             | Front-end files                     |
| └── `index.html`      | HTML interface                      |
| └── `web3.js`         | Web3 logic for blockchain interaction |
| `contracts/`          | Solidity smart contracts            |
| └── `Scholarship.sol` | Main smart contract                 |
| `migrations/`         | Truffle deployment scripts          |
| `test/`               | Contract test scripts               |
| `truffle-config.js`   | Truffle configuration               |
| `package.json`        | Project dependencies                |
| `README.md`           | You're reading it! 😄               |

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ishemalove/DonationDapp.git
cd scholarship-dapp
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start Ganache
bash
Copy
Edit
ganache-cli -p 8545
Or open Ganache GUI and click Quickstart (default port: 8545).
⚠️ Note the mnemonic phrase – you’ll need it in MetaMask.

🔧 Configure Truffle
Make sure truffle-config.js looks like this:

js
Copy
Edit
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
📦 Compile & Deploy Smart Contract
bash
Copy
Edit
truffle compile
truffle migrate
⚠️ Copy the deployed contract address (you’ll use it in the frontend).

🦊 Set Up MetaMask
Install the MetaMask browser extension.

Import Ganache mnemonic.

Add a Custom Network:

Field	Value
Network Name	Ganache
RPC URL	http://127.0.0.1:8545
Chain ID	1337
Currency Symbol	ETH

Switch to the Ganache network.

🌐 Run the Frontend
bash
Copy
Edit
cd client
In web3.js, update with your deployed contract address:

js
Copy
Edit
const contractAddress = "YOUR_CONTRACT_ADDRESS";
Then run a local server:

bash
Copy
Edit
npx http-server
🌍 Open http://localhost:8080 in your browser.
🧪 Usage Guide
| Step                     | Action                                                      |
| ------------------------ | ----------------------------------------------------------- |
| 🦊 Connect Wallet        | Click “Connect Wallet” and approve MetaMask connection.     |
| 💰 Donate ETH            | Enter amount (e.g., `0.1 ETH`) and click "Donate".          |
| 🎓 Apply for Scholarship | Click "Apply" and confirm in MetaMask.                      |
| 🏦 Release Funds (Admin) | Enter recipient + amount → click "Release".                 |
| 🔍 Check Balance         | View contract balance in UI or via `getBalance()` function. |


🔍 Smart Contract Summary

🛠️ Functions
Function	Description
donate()	Accepts ETH and emits Donated event.
applyForScholarship()	Registers applicants and emits Applied event.
releaseFunds(address, uint)	Admin-only, sends ETH and emits FundsReleased.
getBalance()	Returns total ETH in contract.

📣 Events
Event	Triggered When...
Donated	A user donates ETH to the contract.
Applied	A student applies for a scholarship.
FundsReleased	Admin releases ETH to a recipient.

⚙️ Compiler
Solidity ^0.8.0

🌐 Deploying to a Testnet (Optional)
Set up truffle-config.js with Infura + HDWalletProvider.

Deploy with:

bash
Copy
Edit
truffle migrate --network sepolia
🛠️ Troubleshooting
Problem	Solution
Git Push Errors	git pull origin main, resolve conflicts, git push
MetaMask Not Connecting	Ensure you're on Ganache network (Chain ID 1337)
Contract Not Responding	Make sure the contract address in web3.js is correct

📚 References
Truffle Suite – Ganache

Truffle Ethereum DApp Tutorial

GeeksforGeeks – Ganache

Codementor – DApp Building

RiseIn – Build a DApp

DEV Community – DApp Guide
