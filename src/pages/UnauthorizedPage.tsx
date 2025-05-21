
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 space-y-4 text-center bg-card rounded-lg shadow-lg">
        <div className="mx-auto bg-destructive/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
        
        <p className="text-muted-foreground">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        
        <div className="pt-4 flex justify-center">
          <Button 
            onClick={() => navigate("/")}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
