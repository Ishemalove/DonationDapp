
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Wallet, ExternalLink } from "lucide-react";

interface WalletConnectionProps {
  onConnect: (connected: boolean) => void;
  onAccountChange: (account: string) => void;
  onWeb3Change: (web3: any) => void;
  onContractChange: (contract: any) => void;
  contractAddress: string;
  contractABI: any[];
  onAdminCheck: (web3: any, contract: any, account: string) => void;
}

export const WalletConnection = ({
  onConnect,
  onAccountChange,
  onWeb3Change,
  onContractChange,
  contractAddress,
  contractABI,
  onAdminCheck
}: WalletConnectionProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to use this application.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Load Web3
      const Web3 = (await import('web3')).default;
      const web3 = new Web3(window.ethereum);
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts.length > 0) {
        const userAccount = accounts[0];
        setAccount(userAccount);
        setIsConnected(true);
        
        // Create contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        
        onConnect(true);
        onAccountChange(userAccount);
        onWeb3Change(web3);
        onContractChange(contract);
        onAdminCheck(web3, contract, userAccount);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`,
        });
      }
    } catch (error: any) {
      console.error("Connection failed:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connectWallet();
          }
        });
    }

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount("");
          onConnect(false);
          onAccountChange("");
        } else {
          connectWallet();
        }
      });
    }
  }, []);

  return (
    <div className="flex items-center space-x-3">
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Connected
          </Badge>
          <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-200">
            <Wallet className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">
              {formatAddress(account)}
            </span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </div>
        </div>
      ) : (
        <Button 
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          <Wallet className="h-4 w-4 mr-2" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
};
