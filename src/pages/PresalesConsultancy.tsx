
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CoinWallet from '@/components/CoinWallet';
import PurchaseCoins from '@/components/PurchaseCoins';
import QueryForm from '@/components/presales/QueryForm';
import ResponseDisplay from '@/components/presales/ResponseDisplay';
import { supabase } from "@/integrations/supabase/client";

const PresalesConsultancy = () => {
  const [response, setResponse] = useState('');
  const [activeTab, setActiveTab] = useState('query');
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  
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

  const handleResponse = (newResponse: string) => {
    setResponse(newResponse);
    setActiveTab('response');
  };
  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear local storage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      
      // Navigate to home page
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
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
        
        <Button variant="ghost" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? (
            <>Processing...</>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </>
          )}
        </Button>
      </div>
      
      <CoinWallet onPurchaseClick={() => setShowPurchaseDialog(true)} />
      
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

            <TabsContent value="query">
              <QueryForm onQuerySubmit={handleResponse} />
            </TabsContent>

            <TabsContent value="response">
              <ResponseDisplay response={response} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Coins</DialogTitle>
            <DialogDescription>
              Select an amount of coins to purchase. Each AI consultation costs 25 coins.
            </DialogDescription>
          </DialogHeader>
          <PurchaseCoins />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PresalesConsultancy;
