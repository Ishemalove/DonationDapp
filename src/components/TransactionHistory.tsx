
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, ArrowRight, Gift, GraduationCap, Send } from "lucide-react";

interface TransactionHistoryProps {
  contract: any;
}

interface Transaction {
  id: string;
  type: 'donation' | 'application' | 'release';
  from: string;
  to?: string;
  amount?: string;
  blockNumber: number;
  timestamp: number;
}

export const TransactionHistory = ({ contract }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTransactionHistory = async () => {
    if (!contract) return;

    try {
      setIsLoading(true);
      
      // Get past events (this is a simplified version)
      // In a real application, you would use contract.getPastEvents() with proper filtering
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          type: "donation",
          from: "0x1234...5678",
          amount: "0.5",
          blockNumber: 12345,
          timestamp: Date.now() - 86400000,
        },
        {
          id: "2",
          type: "application",
          from: "0x9876...4321",
          blockNumber: 12346,
          timestamp: Date.now() - 43200000,
        },
        {
          id: "3",
          type: "release",
          from: "0x1111...2222",
          to: "0x3333...4444",
          amount: "1.0",
          blockNumber: 12347,
          timestamp: Date.now() - 21600000,
        },
      ];
      
      setTransactions(mockTransactions);
    } catch (error) {
      console.error("Error loading transaction history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Gift className="h-4 w-4" />;
      case 'application':
        return <GraduationCap className="h-4 w-4" />;
      case 'release':
        return <Send className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'donation':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'application':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'release':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  useEffect(() => {
    loadTransactionHistory();
  }, [contract]);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-slate-900">
          <History className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-slate-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex items-center space-x-3">
                    <Badge className={getTransactionColor(tx.type)}>
                      {getTransactionIcon(tx.type)}
                      <span className="ml-1 capitalize">{tx.type}</span>
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {tx.type === 'donation' && `Donation of ${tx.amount} ETH`}
                        {tx.type === 'application' && 'Scholarship Application'}
                        {tx.type === 'release' && `Released ${tx.amount} ETH`}
                      </p>
                      <p className="text-xs text-slate-600">
                        From {formatAddress(tx.from)}
                        {tx.to && ` to ${formatAddress(tx.to)}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600">
                      Block #{tx.blockNumber}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatTime(tx.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <History className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600">No transactions yet</p>
              <p className="text-sm text-slate-500">Transaction history will appear here</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
