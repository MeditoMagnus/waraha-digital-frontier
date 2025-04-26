
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoginAlertsProps {
  loginError: string | null;
  defaultEmail?: string;
}

export const LoginAlerts = ({ loginError, defaultEmail }: LoginAlertsProps) => {
  if (!loginError && !defaultEmail) return null;
  
  return (
    <>
      {loginError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Issue</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      {defaultEmail && (
        <Alert className="mb-4">
          <AlertTitle>Registration Received</AlertTitle>
          <AlertDescription>
            Your registration has been processed. You can now login with your credentials.
            {loginError && " If you're experiencing issues, please try again in a minute."}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
