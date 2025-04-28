
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ContentBlock from './ContentBlock';

interface AccordionSectionProps {
  content: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ content }) => {
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
};

// Process content blocks to identify different types of content
const processContentBlocks = (text: string) => {
  if (!text.trim()) return null;
  
  // Split text into blocks separated by blank lines
  const blocks = text.split(/\n{2,}/);
  
  return (
    <div className="space-y-4">
      {blocks.filter(block => block.trim()).map((block, index) => (
        <ContentBlock key={index} block={block} />
      ))}
    </div>
  );
};

export default AccordionSection;
