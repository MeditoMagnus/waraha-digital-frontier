
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, AlertTriangle, List, Code, Table as TableIcon } from 'lucide-react';

interface FormattedResponseProps {
  content: string;
}

const FormattedResponse: React.FC<FormattedResponseProps> = ({ content }) => {
  const formatSection = (text: string) => {
    // Detect if the section is a list
    if (text.match(/^[-*•]\s/m)) {
      return (
        <div className="flex items-start gap-2 mb-4">
          <List className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <ul className="list-disc list-inside space-y-2">
            {text.split(/\n/).map((item, index) => (
              item.trim() && <li key={index}>{item.replace(/^[-*•]\s/, '')}</li>
            ))}
          </ul>
        </div>
      );
    }

    // Detect if the section contains code
    if (text.includes('```')) {
      const [before, code, after] = text.split(/```(?:\w+)?\n?|\n?```/);
      return (
        <div className="space-y-2 mb-4">
          {before && <p>{before}</p>}
          {code && (
            <div className="flex items-start gap-2">
              <Code className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto w-full">
                <code>{code.trim()}</code>
              </pre>
            </div>
          )}
          {after && <p>{after}</p>}
        </div>
      );
    }

    // Detect if the section looks like a table
    if (text.includes('|') && text.includes('\n')) {
      const rows = text.trim().split('\n');
      if (rows.length > 1 && rows[0].includes('|')) {
        const headers = rows[0].split('|').map(h => h.trim()).filter(Boolean);
        const dataRows = rows.slice(2).map(row => 
          row.split('|').map(cell => cell.trim()).filter(Boolean)
        );

        return (
          <div className="flex items-start gap-2 mb-4">
            <TableIcon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
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
        );
      }
    }

    // Detect tips/important notes
    if (text.toLowerCase().includes('tip:') || text.toLowerCase().includes('important:')) {
      return (
        <div className="flex items-start gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div className="bg-muted p-4 rounded-lg w-full">
            {text}
          </div>
        </div>
      );
    }

    // Detect warnings
    if (text.toLowerCase().includes('warning:') || text.toLowerCase().includes('caution:')) {
      return (
        <div className="flex items-start gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg w-full">
            {text}
          </div>
        </div>
      );
    }

    // Default text formatting
    return <p className="mb-4">{text}</p>;
  };

  const formatContent = (text: string) => {
    // Split content into sections based on headers
    const sections = text.split(/(?=#{1,3} )/);
    
    if (sections.length > 1) {
      return (
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => {
            if (section.startsWith('#')) {
              const [title, ...content] = section.split('\n');
              const headingLevel = (title.match(/^#+/) || [''])[0].length;
              const cleanTitle = title.replace(/^#+\s/, '');
              
              return (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger className={`
                    ${headingLevel === 1 ? 'text-2xl' : headingLevel === 2 ? 'text-xl' : 'text-lg'}
                    font-bold
                  `}>
                    {cleanTitle}
                  </AccordionTrigger>
                  <AccordionContent>
                    {content.join('\n').split('\n\n').map((part, i) => (
                      <React.Fragment key={i}>
                        {formatSection(part.trim())}
                      </React.Fragment>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            }
            return section.split('\n\n').map((part, i) => (
              <React.Fragment key={`default-${index}-${i}`}>
                {formatSection(part.trim())}
              </React.Fragment>
            ));
          })}
        </Accordion>
      );
    }

    // If no sections, format the content directly
    return text.split('\n\n').map((part, i) => (
      <React.Fragment key={i}>
        {formatSection(part.trim())}
      </React.Fragment>
    ));
  };

  return (
    <div className="prose max-w-none">
      {formatContent(content)}
    </div>
  );
};

export default FormattedResponse;
