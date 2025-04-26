
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useProcessQuery } from "@/hooks/useProcessQuery";

interface QueryFormProps {
  onQuerySubmit: (response: string) => void;
}

const QueryForm = ({ onQuerySubmit }: QueryFormProps) => {
  const [query, setQuery] = React.useState('');
  const { processQuery, isLoading } = useProcessQuery(onQuerySubmit);

  const handleSubmit = async () => {
    const response = await processQuery(query);
    if (response) {
      setQuery('');
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
  );
};

export default QueryForm;
