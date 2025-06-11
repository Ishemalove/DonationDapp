A blockchain-powered donation and scholarship management platform built on the Ethereum network. This DApp allows users to donate ETH, apply for scholarships, and enables the admin to release funds—all via a smart contract!

🚀 Tech Stack
Solidity for smart contracts

Truffle for development & deployment

Ganache as a local Ethereum blockchain

MetaMask for wallet management

Web3.js for blockchain interaction

HTML/CSS/JavaScript for the front end

🧠 Features
📥 Donate ETH to support scholarship applicants

🧑‍🎓 Apply for a scholarship with a single click

🛠 Admin-only fund release to selected recipients

📊 View contract balance in real-time

🔧 How to Run
Clone the repo and install dependencies.

Start Ganache and configure MetaMask with Ganache's network.

Compile and deploy the smart contract with Truffle.

Launch the frontend via a simple HTTP server.

Interact with the contract: donate, apply, or release funds!

💡 Demo Commands
bash
Copy
Edit
truffle compile
truffle migrate
npx http-server client/
Open your browser at http://localhost:8080 and make sure MetaMask is connected ✅

👨‍💻 Contract Functions
donate(): Send ETH to the contract

applyForScholarship(): Apply as a scholarship candidate

releaseFunds(address, amount): Admin sends ETH to recipients

getBalance(): Get total funds available

📷 Preview

📝 License
MIT License

