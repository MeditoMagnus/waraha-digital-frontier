
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Lightbulb, AlertTriangle, List, Code, Table as TableIcon } from 'lucide-react';

interface FormattedResponseProps {
  content: string;
}

const FormattedResponse: React.FC<FormattedResponseProps> = ({ content }) => {
  
  // Format list sections
  const formatList = (text: string) => {
    return (
      <div className="flex items-start gap-2 my-4">
        <List className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <ul className="list-disc list-inside space-y-2">
          {text.split(/\n/).filter(line => line.trim()).map((item, index) => (
            <li key={index} className="pl-0">{item.replace(/^[-*•]\s+/, '')}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Format code blocks
  const formatCodeBlock = (codeText: string) => {
    return (
      <div className="flex items-start gap-2 my-4">
        <Code className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto w-full">
          <code>{codeText.trim()}</code>
        </pre>
      </div>
    );
  };
  
  // Format tables
  const formatTable = (tableText: string) => {
    const lines = tableText.trim().split('\n');
    
    // Extract headers (first row)
    const headers = lines[0]
      .split('|')
      .filter(cell => cell.trim() !== '')
      .map(header => header.trim());
    
    // Skip separator row (second row with dashes)
    // Process data rows (third row onwards)
    const dataRows = lines.slice(2).map(row => 
      row.split('|')
        .filter(cell => cell.trim() !== '')
        .map(cell => cell.trim())
    );
    
    return (
      <div className="flex items-start gap-2 my-4">
        <TableIcon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, i) => (
                  <TableHead key={i}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataRows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };
  
  // Format tips/important notes
  const formatTip = (text: string) => {
    return (
      <div className="flex items-start gap-2 my-4">
        <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <div className="bg-muted p-4 rounded-lg w-full">
          {text}
        </div>
      </div>
    );
  };
  
  // Format warnings
  const formatWarning = (text: string) => {
    return (
      <div className="flex items-start gap-2 my-4">
        <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg w-full">
          {text}
        </div>
      </div>
    );
  };

  // Process content to identify sections and format appropriately
  const renderContent = () => {
    // First, check if there are headers to create an accordion structure
    if (content.match(/^#{1,3} .+/m)) {
      // Split by headers
      const sections = content.split(/(?=^#{1,3} .+)/m);
      
      return (
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => {
            // If section starts with a header
            if (section.match(/^#{1,3} .+/m)) {
              const [headerLine, ...contentLines] = section.split('\n');
              const headerText = headerLine.replace(/^#{1,3} /, '').trim();
              const sectionContent = contentLines.join('\n');
              
              return (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger className="text-lg font-bold">
                    {headerText}
                  </AccordionTrigger>
                  <AccordionContent>
                    {processContentBlocks(sectionContent)}
                  </AccordionContent>
                </AccordionItem>
              );
            }
            // For content before any headers
            return processContentBlocks(section);
          })}
        </Accordion>
      );
    }
    
    // If no headers, process the entire content
    return processContentBlocks(content);
  };
  
  // Process content blocks to identify different types of content
  const processContentBlocks = (text: string) => {
    if (!text.trim()) return null;
    
    // Split text into blocks separated by blank lines
    const blocks = text.split(/\n{2,}/);
    
    return (
      <div className="space-y-4">
        {blocks.filter(block => block.trim()).map((block, index) => {
          const trimmedBlock = block.trim();
          
          // Check for lists (lines starting with -, *, or •)
          if (trimmedBlock.match(/^[-*•] .+/m)) {
            return formatList(trimmedBlock);
          }
          
          // Check for code blocks (wrapped in ```)
          if (trimmedBlock.includes('```')) {
            const parts = trimmedBlock.split(/```(?:\w+)?\n?|\n?```/);
            if (parts.length >= 3) {
              // We have content before, code, and potentially after
              return (
                <div key={index}>
                  {parts[0] && <p>{parts[0].trim()}</p>}
                  {formatCodeBlock(parts[1])}
                  {parts[2] && <p>{parts[2].trim()}</p>}
                </div>
              );
            }
          }
          
          // Check for tables (contains | and multiple lines)
          if (trimmedBlock.includes('|') && 
              trimmedBlock.includes('\n') &&
              trimmedBlock.split('\n').length >= 3 &&
              trimmedBlock.split('\n')[1].includes('-')) {
            return formatTable(trimmedBlock);
          }
          
          // Check for tips/important notes
          if (trimmedBlock.toLowerCase().startsWith('tip:') || 
              trimmedBlock.toLowerCase().startsWith('important:')) {
            return formatTip(trimmedBlock);
          }
          
          // Check for warnings
          if (trimmedBlock.toLowerCase().startsWith('warning:') || 
              trimmedBlock.toLowerCase().startsWith('caution:')) {
            return formatWarning(trimmedBlock);
          }
          
          // Default: regular paragraph
          return <p key={index} className="my-4">{trimmedBlock}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="prose max-w-none dark:prose-invert">
      {renderContent()}
    </div>
  );
};

export default FormattedResponse;
