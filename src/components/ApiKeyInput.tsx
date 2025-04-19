
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('openai_api_key', apiKey);
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-card rounded-lg shadow-lg mb-6">
      <h2 className="text-lg font-semibold">OpenAI API Key Configuration</h2>
      <p className="text-sm text-muted-foreground">
        Enter your OpenAI API key to enable the AI consultant feature.
      </p>
      <div className="flex gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="flex-1"
        />
        <Button onClick={handleSaveKey}>Save Key</Button>
      </div>
    </div>
  );
};

export default ApiKeyInput;
