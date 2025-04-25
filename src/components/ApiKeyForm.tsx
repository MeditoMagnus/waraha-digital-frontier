
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { setApiKey } from "@/services/openai";
import { AlertCircle, CheckCircle, Lock } from "lucide-react";

const ApiKeyForm = ({ onKeySet }: { onKeySet: () => void }) => {
  const [apiKey, setApiKeyState] = useState("");
  const [isKeySet, setIsKeySet] = useState(false);
  const { toast } = useToast();

  // Check if key was previously stored in sessionStorage
  useEffect(() => {
    const storedKey = sessionStorage.getItem('openai_key');
    if (storedKey) {
      // Don't display the actual key, but set it in the service
      setApiKey(storedKey);
      setIsKeySet(true);
      onKeySet();
    }
  }, [onKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for API key format
    if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'",
        variant: "destructive",
      });
      return;
    }

    // Store in session storage (cleared when browser is closed)
    sessionStorage.setItem('openai_key', apiKey);
    setApiKey(apiKey);
    setIsKeySet(true);
    setApiKeyState(""); // Clear the input field for security
    
    toast({
      title: "API Key Set",
      description: "Your API key has been securely stored for this session",
    });
    
    onKeySet();
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          {isKeySet ? "API Key Configured" : "Enter OpenAI API Key"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isKeySet ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <p>API key is securely stored for this session</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Your API key will be stored securely in your browser session and will not be sent to our servers.
              The key will be cleared when you close your browser.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input 
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKeyState(e.target.value)}
                  className="w-full"
                  required
                />
                <Button type="submit" className="w-full">
                  Secure and Use Key
                </Button>
              </div>
            </form>
          </>
        )}
      </CardContent>
      {isKeySet && (
        <CardFooter className="flex justify-center border-t pt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              sessionStorage.removeItem('openai_key');
              setIsKeySet(false);
              setApiKey("");
              toast({
                title: "API Key Removed",
                description: "Your API key has been removed from session storage",
              });
            }}
          >
            Reset API Key
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ApiKeyForm;
