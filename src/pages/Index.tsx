import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { WalletConnection } from "@/components/WalletConnection";
import { DonationCard } from "@/components/DonationCard";
import { ScholarshipApplication } from "@/components/ScholarshipApplication";
import { AdminPanel } from "@/components/AdminPanel";
import { StatsDisplay } from "@/components/StatsDisplay";
import { TransactionHistory } from "@/components/TransactionHistory";
import { GraduationCap, Heart, Shield, Users } from "lucide-react";

declare global {
  interface Window {
    ethereum?: any;
    Web3?: any;
  }
}

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contractBalance, setContractBalance] = useState("0");
  const [totalDonations, setTotalDonations] = useState("0");
  const { toast } = useToast();

  // Use a valid placeholder contract address (this is just an example address)
  // Replace this with your actual deployed contract address
  const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
  
  // Contract configuration
  const CONTRACT_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        }
      ],
      "name": "Applied",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Donated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FundsReleased",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "applicants",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "applyForScholarship",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "releaseFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalDonations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const checkIfAdmin = async (web3Instance: any, contractInstance: any, userAccount: string) => {
    try {
      // Only check admin status if we have a valid contract
      if (contractInstance && CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000") {
        const adminAddress = await contractInstance.methods.admin().call();
        setIsAdmin(adminAddress.toLowerCase() === userAccount.toLowerCase());
      } else {
        // For demo purposes, set admin to false when no contract is deployed
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const loadContractData = async () => {
    if (contract && CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000") {
      try {
        const balance = await contract.methods.getBalance().call();
        const donations = await contract.methods.totalDonations().call();
        setContractBalance(web3.utils.fromWei(balance, 'ether'));
        setTotalDonations(web3.utils.fromWei(donations, 'ether'));
      } catch (error) {
        console.error("Error loading contract data:", error);
        // Set default values if contract interaction fails
        setContractBalance("0");
        setTotalDonations("0");
      }
    } else {
      // Set default values when no contract is available
      setContractBalance("0");
      setTotalDonations("0");
    }
  };

  useEffect(() => {
    loadContractData();
  }, [contract]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ScholarFund
                </h1>
                <p className="text-sm text-slate-600">Decentralized Scholarship Platform</p>
              </div>
            </div>
            <WalletConnection 
              onConnect={setIsConnected}
              onAccountChange={setAccount}
              onWeb3Change={setWeb3}
              onContractChange={setContract}
              contractAddress={CONTRACT_ADDRESS}
              contractABI={CONTRACT_ABI}
              onAdminCheck={checkIfAdmin}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contract Status Notice */}
        {CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000" && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-amber-600" />
              <p className="text-amber-800 font-medium">Demo Mode</p>
            </div>
            <p className="text-sm text-amber-700 mt-1">
              This is a demo version. Deploy your smart contract and update the CONTRACT_ADDRESS in the code to enable full functionality.
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Empowering Education Through
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Blockchain Technology
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A transparent, decentralized platform where donors can fund scholarships 
            and students can apply for educational support, all powered by Ethereum smart contracts.
          </p>
        </div>

        {/* Stats Display */}
        <StatsDisplay 
          contractBalance={contractBalance}
          totalDonations={totalDonations}
          isConnected={isConnected}
        />

        {isConnected ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Donation Section */}
            <DonationCard 
              web3={web3}
              contract={contract}
              account={account}
              onSuccess={loadContractData}
            />

            {/* Scholarship Application */}
            <ScholarshipApplication 
              contract={contract}
              account={account}
            />

            {/* Admin Panel */}
            {isAdmin && (
              <div className="lg:col-span-2">
                <AdminPanel 
                  web3={web3}
                  contract={contract}
                  account={account}
                  onSuccess={loadContractData}
                />
              </div>
            )}
          </div>
        ) : (
          <Card className="p-8 text-center bg-white/70 backdrop-blur-sm border-slate-200">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-slate-100 rounded-full">
                <Shield className="h-12 w-12 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Connect Your Wallet</h3>
              <p className="text-slate-600 max-w-md">
                Please connect your MetaMask wallet to interact with the scholarship funding platform.
              </p>
            </div>
          </Card>
        )}

        {/* Transaction History */}
        {isConnected && (
          <TransactionHistory contract={contract} />
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Transparent Donations</h3>
            <p className="text-slate-600">
              All donations are recorded on the blockchain, ensuring complete transparency and accountability.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Student Applications</h3>
            <p className="text-slate-600">
              Students can easily apply for scholarships with just one click, no paperwork required.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Community Driven</h3>
            <p className="text-slate-600">
              Built by the community, for the community. Decentralized governance ensures fairness.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p>Built with ❤️ for education. Powered by Ethereum blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
