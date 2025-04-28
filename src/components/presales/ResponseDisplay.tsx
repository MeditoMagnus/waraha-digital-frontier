
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormattedResponse from "@/components/FormattedResponse";
import { generateResponsePDF } from "@/utils/pdfGenerator";

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay = ({ response }: ResponseDisplayProps) => {
  if (!response) return null;

  const handleDownloadPDF = () => {
    generateResponsePDF(response, "Technical Consultation Analysis");
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle>Technical Analysis</CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleDownloadPDF}
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent className="px-0 pt-2">
        <FormattedResponse content={response} />
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;
