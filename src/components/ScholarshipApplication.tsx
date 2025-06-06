
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, CheckCircle, Clock } from "lucide-react";

interface ScholarshipApplicationProps {
  contract: any;
  account: string;
}

export const ScholarshipApplication = ({ contract, account }: ScholarshipApplicationProps) => {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkApplicationStatus = async () => {
    if (contract && account) {
      try {
        const applied = await contract.methods.applicants(account).call();
        setHasApplied(applied);
      } catch (error) {
        console.error("Error checking application status:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleApply = async () => {
    setIsApplying(true);
    
    try {
      await contract.methods.applyForScholarship().send({
        from: account
      });
      
      toast({
        title: "Application Submitted! 📚",
        description: "Your scholarship application has been successfully submitted.",
      });
      
      setHasApplied(true);
    } catch (error: any) {
      console.error("Application failed:", error);
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    checkApplicationStatus();
  }, [contract, account]);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-white to-green-50/50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-green-50/50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-green-900">
          <div className="p-2 bg-green-100 rounded-lg">
            <GraduationCap className="h-5 w-5 text-green-600" />
          </div>
          <span>Scholarship Application</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasApplied ? (
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <Badge className="bg-green-100 text-green-700 border-green-200 mb-2">
                Application Submitted
              </Badge>
              <p className="text-green-700 font-medium">
                Your application has been successfully submitted!
              </p>
              <p className="text-sm text-slate-600 mt-1">
                You will be notified when the admin reviews your application.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <p className="text-slate-700 font-medium">
                Ready to apply for a scholarship?
              </p>
              <p className="text-sm text-slate-600">
                Submit your application to be considered for educational funding.
              </p>
            </div>
            
            <Button
              onClick={handleApply}
              disabled={isApplying}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2"
            >
              {isApplying ? "Submitting Application..." : "Apply for Scholarship"}
            </Button>
            
            <p className="text-xs text-slate-600 text-center">
              Once submitted, your application will be reviewed by the scholarship committee.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
