
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import FormattedResponse from "@/components/FormattedResponse";

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay = ({ response }: ResponseDisplayProps) => {
  if (!response) return null;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center gap-2 px-0 pt-0">
        <MessageSquare className="h-5 w-5 text-primary" />
        <CardTitle>Technical Analysis</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-2">
        <FormattedResponse content={response} />
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;
