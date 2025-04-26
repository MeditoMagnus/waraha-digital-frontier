
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateAIResponse } from "@/services/openai";
import { ArrowLeft, Send, MessageSquare, Loader2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import FormattedResponse from "@/components/FormattedResponse";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PresalesConsultancy = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('query');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get user information from local storage
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  
  // Check if user is logged in
  useEffect(() => {
    if (!userRole || userRole !== 'user') {
      toast({
        title: "Access Denied",
        description: "Please login to access the AI consultant",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast, userRole]);

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
      setActiveTab('response'); // Automatically switch to response tab
      
      // In a real app, we would save this query to a database
      console.log("Query logged:", {
        user: userName,
        query: query,
        timestamp: new Date().toISOString()
      });
      
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
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Waraha Group
        </Link>
        
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-4xl text-center">AI Technical Consultant</CardTitle>
          <CardDescription className="text-center">
            Welcome, {userName || 'User'}! Get expert technical advice on software, IT services, architecture, pricing, 
            configurations, or integrations - powered by advanced AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="query">Your Query</TabsTrigger>
              <TabsTrigger value="response" disabled={!response}>Expert Response</TabsTrigger>
            </TabsList>

            <TabsContent value="query" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="response">
              {response && (
                <Card className="border-0 shadow-none">
                  <CardHeader className="flex flex-row items-center gap-2 px-0 pt-0">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle>Technical Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pt-2">
                    <FormattedResponse content={response} />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PresalesConsultancy;
