
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const PresalesConsultancy = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter your technical query first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // We'll implement the Stripe payment here once you provide the secret key
      toast({
        title: "Coming Soon",
        description: "Payment integration will be added shortly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">AI Technical Consultant</h1>
      
      <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
        <p className="text-lg mb-4">
          Get expert technical advice on software, IT services, architecture, pricing, 
          configurations, or integrations - powered by advanced AI.
        </p>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Ask your technical query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[120px] text-base"
          />
          
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Unlock Answer – $1"}
          </Button>
        </div>
      </div>

      {response && (
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Expert Response:</h2>
          <div className="prose max-w-none">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default PresalesConsultancy;
