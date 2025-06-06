
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Heart, DollarSign } from "lucide-react";

interface DonationCardProps {
  web3: any;
  contract: any;
  account: string;
  onSuccess: () => void;
}

export const DonationCard = ({ web3, contract, account, onSuccess }: DonationCardProps) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [isDonating, setIsDonating] = useState(false);
  const { toast } = useToast();

  const handleDonate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setIsDonating(true);
    
    try {
      const weiValue = web3.utils.toWei(donationAmount, 'ether');
      
      await contract.methods.donate().send({
        from: account,
        value: weiValue
      });
      
      toast({
        title: "Donation Successful! 🎉",
        description: `Thank you for donating ${donationAmount} ETH to support education!`,
      });
      
      setDonationAmount("");
      onSuccess();
    } catch (error: any) {
      console.error("Donation failed:", error);
      toast({
        title: "Donation Failed",
        description: error.message || "Transaction was rejected or failed.",
        variant: "destructive",
      });
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50/50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Heart className="h-5 w-5 text-blue-600" />
          </div>
          <span>Make a Donation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="donation-amount" className="text-slate-700 font-medium">
            Donation Amount (ETH)
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="donation-amount"
              type="number"
              step="0.001"
              placeholder="0.1"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          {["0.1", "0.5", "1.0"].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => setDonationAmount(amount)}
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              {amount} ETH
            </Button>
          ))}
        </div>
        
        <Button 
          onClick={handleDonate}
          disabled={isDonating || !donationAmount}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2"
        >
          {isDonating ? "Processing..." : "Donate Now"}
        </Button>
        
        <p className="text-xs text-slate-600 text-center">
          Your donation will be securely stored in the smart contract and used to fund scholarships.
        </p>
      </CardContent>
    </Card>
  );
};
