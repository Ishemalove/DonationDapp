
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Wallet, Users, DollarSign } from "lucide-react";

interface StatsDisplayProps {
  contractBalance: string;
  totalDonations: string;
  isConnected: boolean;
}

export const StatsDisplay = ({ contractBalance, totalDonations, isConnected }: StatsDisplayProps) => {
  const stats = [
    {
      title: "Total Donations",
      value: isConnected ? `${parseFloat(totalDonations).toFixed(3)} ETH` : "Connect Wallet",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Available Funds",
      value: isConnected ? `${parseFloat(contractBalance).toFixed(3)} ETH` : "Connect Wallet",
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Impact Score",
      value: isConnected ? "95%" : "Connect Wallet",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Students Helped",
      value: isConnected ? "247" : "Connect Wallet",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-3 ${stat.bgColor} rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
