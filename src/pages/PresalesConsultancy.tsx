
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateAIResponse } from "@/services/openai";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      const aiResponse = await generateAIResponse(query);
      setResponse(aiResponse);
      toast({
        title: "Success",
        description: "Response generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Waraha Group
        </Link>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-4xl text-center">AI Technical Consultant</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6 text-muted-foreground">
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
              {isLoading ? "Processing..." : "Generate Response"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Expert Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {response.split('\n').map((paragraph, index) => (
                paragraph ? <p key={index} className="mb-4">{paragraph}</p> : null
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PresalesConsultancy;
