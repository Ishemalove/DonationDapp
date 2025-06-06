
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Send } from "lucide-react";

interface AdminPanelProps {
  web3: any;
  contract: any;
  account: string;
  onSuccess: () => void;
}

export const AdminPanel = ({ web3, contract, account, onSuccess }: AdminPanelProps) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [releaseAmount, setReleaseAmount] = useState("");
  const [isReleasing, setIsReleasing] = useState(false);
  const { toast } = useToast();

  const handleReleaseFunds = async () => {
    if (!recipientAddress || !releaseAmount) {
      toast({
        title: "Missing Information",
        description: "Please provide both recipient address and amount.",
        variant: "destructive",
      });
      return;
    }

    if (!web3.utils.isAddress(recipientAddress)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(releaseAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setIsReleasing(true);
    
    try {
      const weiAmount = web3.utils.toWei(releaseAmount, 'ether');
      
      await contract.methods.releaseFunds(recipientAddress, weiAmount).send({
        from: account
      });
      
      toast({
        title: "Funds Released! 💰",
        description: `Successfully released ${releaseAmount} ETH to the recipient.`,
      });
      
      setRecipientAddress("");
      setReleaseAmount("");
      onSuccess();
    } catch (error: any) {
      console.error("Fund release failed:", error);
      toast({
        title: "Release Failed",
        description: error.message || "Failed to release funds.",
        variant: "destructive",
      });
    } finally {
      setIsReleasing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-purple-50/50 border-purple-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-purple-900">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
          <span>Admin Panel</span>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 ml-2">
            Admin Only
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipient-address" className="text-slate-700 font-medium">
              Recipient Address
            </Label>
            <Input
              id="recipient-address"
              type="text"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="release-amount" className="text-slate-700 font-medium">
              Amount (ETH)
            </Label>
            <Input
              id="release-amount"
              type="number"
              step="0.001"
              placeholder="1.0"
              value={releaseAmount}
              onChange={(e) => setReleaseAmount(e.target.value)}
              className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <Button
          onClick={handleReleaseFunds}
          disabled={isReleasing || !recipientAddress || !releaseAmount}
          className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-2"
        >
          <Send className="h-4 w-4 mr-2" />
          {isReleasing ? "Releasing Funds..." : "Release Funds"}
        </Button>
        
        <p className="text-xs text-slate-600 text-center">
          As an admin, you can release scholarship funds to approved recipients.
        </p>
      </CardContent>
    </Card>
  );
};
