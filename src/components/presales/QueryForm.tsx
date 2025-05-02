
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getCachedFormData } from "@/utils/formCache";

interface QueryFormProps {
  onQuerySubmit: (response: string) => void;
}

const QueryForm = ({ onQuerySubmit }: QueryFormProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [cachedData, setCachedData] = useState<ReturnType<typeof getCachedFormData>>({
    email: '',
    userName: '',
    companyName: '',
    companySize: ''
  });

  // Load cached data on component mount
  useEffect(() => {
    const formData = getCachedFormData();
    setCachedData(formData);
  }, []);

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
      // Use cached data if available, otherwise fallback to localStorage
      const userEmail = cachedData.email || localStorage.getItem('userEmail');
      const companyName = cachedData.companyName || localStorage.getItem('companyName');
      const companySize = cachedData.companySize || localStorage.getItem('companySize');
      
      if (!userEmail) {
        toast({
          title: "Information Required",
          description: "Please provide your information to use the AI consultant.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Call our edge function for AI query
      const { data, error } = await supabase.functions.invoke('ai-query', {
        body: { 
          query,
          userEmail,
          companyName,
          companySize
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || "Failed to process query");
      }

      if (!data) {
        throw new Error("No response received");
      }
      
      if (!data.success) {
        throw new Error(data.error || "Failed to process query");
      }

      console.log("Query processed successfully:", data);
      
      // Process successful response
      onQuerySubmit(data.response);
      setQuery('');
      
      // Show success toast
      toast({
        title: "Success",
        description: "Response generated successfully.",
      });
    } catch (error: any) {
      console.error('Error:', error);
      
      toast({
        title: "Error",
        description: error.message || "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Ask your technical query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="min-h-[120px] text-base"
      />
      
      <Button 
        onClick={handleSubmit} 
        className="w-full flex items-center justify-center gap-2"
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Generate Response
          </>
        )}
      </Button>
      
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">Ask anything you need for your IT project or technical needs:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Which cloud providers should I use for my e-commerce site?</li>
          <li>What tech stack is best for building a CRM system?</li>
          <li>How can I migrate my on-premise database to the cloud?</li>
          <li>What are the security considerations for my mobile app?</li>
        </ul>
      </div>
    </div>
  );
};

export default QueryForm;
