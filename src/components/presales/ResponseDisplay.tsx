
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare, Download, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormattedResponse from "@/components/FormattedResponse";
import { generateResponsePDF } from "@/utils/pdfGenerator";
import { toast } from "@/components/ui/use-toast";

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay = ({ response }: ResponseDisplayProps) => {
  if (!response) return null;

  const handleDownloadPDF = () => {
    try {
      generateResponsePDF(response, "Technical Consultation Analysis");
      toast({
        title: "Success",
        description: "PDF successfully downloaded",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Determine if the response contains certain types of content
  const hasRoadmap = /\b(roadmap|timeline|phases|steps|stages|plan|schedule|milestones)\b/i.test(response);
  const hasChecklist = /\b(checklist|task list|to-?do)\b/i.test(response);
  const hasCodeExamples = response.includes('```');

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle>Technical Analysis</CardTitle>
        </div>
        <div className="flex gap-2">
          {hasRoadmap && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => {
              // Scroll to the first roadmap section
              const roadmapElement = document.querySelector('.RoadmapSection');
              if (roadmapElement) {
                roadmapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}>
              <Calendar className="h-4 w-4 mr-1" />
              View Roadmap
            </Button>
          )}
          {hasCodeExamples && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => {
              // Scroll to the first code block
              const codeElement = document.querySelector('pre');
              if (codeElement) {
                codeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}>
              <FileText className="h-4 w-4 mr-1" />
              Code Samples
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <FormattedResponse content={response} />
        
        {hasChecklist && (
          <div className="mt-6 border-t pt-4">
            <Button variant="secondary" size="sm" className="w-full">
              Track Progress on Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;
