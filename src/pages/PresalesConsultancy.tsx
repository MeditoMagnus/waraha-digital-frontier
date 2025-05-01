
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QueryForm from '@/components/presales/QueryForm';
import ResponseDisplay from '@/components/presales/ResponseDisplay';
import { useQueryClient } from "@tanstack/react-query";

const PresalesConsultancy = () => {
  const [response, setResponse] = useState('');
  const [activeTab, setActiveTab] = useState('query');
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get stored user information
  const userName = localStorage.getItem('userName') || 'User';
  const companyName = localStorage.getItem('companyName') || 'your company';
  
  useEffect(() => {
    // Check if user has provided their information
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      toast({
        title: "Access Denied",
        description: "Please provide your information to access the AI consultant",
        variant: "destructive",
      });
      navigate('/consultant-access');
    }
  }, [navigate, toast, queryClient]);

  const handleResponse = (newResponse: string) => {
    setResponse(newResponse);
    setActiveTab('response');
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
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 mb-8">
        <h2 className="text-lg font-medium mb-2">Welcome, {userName}!</h2>
        <p>
          You can now ask our AI Technical Consultant any technical questions related to 
          IT services, software development, cloud infrastructure, or any other technical 
          needs for {companyName}.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-4xl text-center">AI Technical Consultant</CardTitle>
          <CardDescription className="text-center">
            Get expert technical advice on software, IT services, architecture, pricing, 
            configurations, or integrations - powered by advanced AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="query">Your Query</TabsTrigger>
              <TabsTrigger value="response" disabled={!response}>Expert Response</TabsTrigger>
            </TabsList>

            <TabsContent value="query">
              <QueryForm onQuerySubmit={handleResponse} />
            </TabsContent>

            <TabsContent value="response">
              <ResponseDisplay response={response} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PresalesConsultancy;
