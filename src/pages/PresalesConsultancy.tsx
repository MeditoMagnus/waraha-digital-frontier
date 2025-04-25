
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateAIResponse } from "@/services/openai";
import { ArrowLeft, Send, MessageSquare, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import ApiKeyForm from "@/components/ApiKeyForm";

const PresalesConsultancy = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
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

    if (!isApiKeySet) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenAI API key before submitting a query.",
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
      let errorMessage = "Failed to generate response. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format response with proper headings
  const formatResponse = (text: string) => {
    if (!text) return [];
    
    // Split by markdown headings
    const sections = text.split(/^(#{1,3} .+)$/m);
    
    let formatted: React.ReactNode[] = [];
    let currentHeading: string | null = null;
    
    sections.forEach((section, index) => {
      // If this is a heading
      if (/^#{1,3} .+$/.test(section)) {
        currentHeading = section;
        const level = (section.match(/^(#+)/) || [''])[0].length;
        
        formatted.push(
          <div key={`heading-${index}`} className={`font-bold mt-4 mb-2 ${level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-lg'}`}>
            {section.replace(/^#+\s/, '')}
          </div>
        );
      } 
      // If this is content under a heading
      else if (section.trim()) {
        // Split paragraphs
        const paragraphs = section.split(/\n\n+/);
        
        paragraphs.forEach((paragraph, pIndex) => {
          if (paragraph.trim()) {
            // Handle code blocks
            if (paragraph.includes('```')) {
              const parts = paragraph.split(/```[\w]*\n|```/);
              parts.forEach((part, partIndex) => {
                if (partIndex % 2 === 0) {
                  // Regular text
                  if (part.trim()) {
                    formatted.push(
                      <p key={`p-${index}-${pIndex}-${partIndex}`} className="mb-3">
                        {part}
                      </p>
                    );
                  }
                } else {
                  // Code block
                  formatted.push(
                    <pre key={`code-${index}-${pIndex}-${partIndex}`} className="bg-gray-100 p-3 rounded my-3 overflow-x-auto">
                      <code>{part}</code>
                    </pre>
                  );
                }
              });
            } else {
              formatted.push(
                <p key={`p-${index}-${pIndex}`} className="mb-3">
                  {paragraph}
                </p>
              );
            }
          }
        });
      }
    });
    
    return formatted;
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
      
      {!isApiKeySet ? (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-4xl text-center">AI Technical Consultant</CardTitle>
              <CardDescription className="text-center">
                Secure OpenAI integration for IT consultancy services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-6">
                To start using the AI consultant, please provide your OpenAI API key below.
              </p>
              <ApiKeyForm onKeySet={() => setIsApiKeySet(true)} />
            </CardContent>
          </Card>
        </>
      ) : (
        <>
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
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isLoading}
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
              </div>
            </CardContent>
          </Card>

          {response && (
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>Expert Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formatResponse(response)}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default PresalesConsultancy;
