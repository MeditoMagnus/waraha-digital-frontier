import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, MessageSquare, Loader2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import FormattedResponse from "@/components/FormattedResponse";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import CoinWallet from '@/components/CoinWallet';
import PurchaseCoins from '@/components/PurchaseCoins';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PresalesConsultancy = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('query');
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [searchParams] = useSearchParams();
  
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
      const { data: wallet, error: walletError } = await supabase
        .from('user_wallets')
        .select('coin_balance')
        .single();

      if (walletError) throw walletError;

      if (!wallet || wallet.coin_balance < 25) {
        toast({
          title: "Insufficient Coins",
          description: "You need 25 coins to generate an AI response. Please purchase more coins.",
          variant: "destructive",
        });
        setShowPurchaseDialog(true);
        return;
      }

      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { query },
      });

      if (error) throw error;

      const { error: deductError } = await supabase.rpc('deduct_coins', {
        amount: 25,
        description: 'AI consultation cost'
      });

      if (deductError) throw deductError;

      setResponse(data.response);
      setActiveTab('response');
      
      toast({
        title: "Success",
        description: "Response generated successfully. 25 coins have been deducted.",
      });
    } catch (error) {
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
