# 🎓 Blockchain-Powered Donation & Scholarship Platform  

> **A decentralized application (DApp)** built on the **Ethereum network** to streamline donations and scholarship management.  
> Users can donate ETH, apply for scholarships, and admins can release funds—all secured by **smart contracts**.  

---

## 🚀 Tech Stack  
| Technology | Purpose |
|------------|---------|
| **Solidity** | Smart contract development |
| **Truffle** | Development & deployment framework |
| **Ganache** | Local Ethereum blockchain |
| **MetaMask** | Wallet & account management |
| **Web3.js** | Blockchain interaction |
| **HTML / CSS / JavaScript** | Frontend UI |

---

## 🧠 Key Features  

- 📥 **Donate ETH** to support scholarship applicants  
- 🧑‍🎓 **Apply for scholarships** with one click  
- 🔑 **Admin-only fund release** to selected recipients  
- 📊 **Real-time contract balance** display  

---

## ⚙️ How to Run Locally  

```bash
# 1️⃣ Clone the repository
git clone <your-repo-url>

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start Ganache & configure MetaMask
#    Add Ganache's network and import accounts

# 4️⃣ Compile and deploy the smart contract
truffle compile
truffle migrate

# 5️⃣ Launch the frontend
npx http-server client/

# 6️⃣ Open in browser
http://localhost:8080  # Ensure MetaMask is connected ✅
