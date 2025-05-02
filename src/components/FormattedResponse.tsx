
import React from 'react';
import ContentBlock from './formatted-response/ContentBlock';
import AccordionSection from './formatted-response/AccordionSection';

interface FormattedResponseProps {
  content: string;
}

const FormattedResponse: React.FC<FormattedResponseProps> = ({ content }) => {
  // Process content to identify sections and format appropriately
  const renderContent = () => {
    // First, check if there are headers to create an accordion structure
    if (content.match(/^#{1,3} .+/m)) {
      return <AccordionSection content={content} />;
    }
    
    // Check if content contains structured sections marked by keywords
    const hasStructuredSections = /\b(comparison:|versus:|pros and cons:|advantages:|disadvantages:|benefits:|drawbacks:)/i.test(content);
    
    // If structured sections exist, split content by those sections
    if (hasStructuredSections) {
      // Split by common section indicators
      const sectionRegex = /\n\s*(comparison:|versus:|pros and cons:|advantages:|disadvantages:|benefits:|drawbacks:|summary:|conclusion:)/i;
      const sections = content.split(sectionRegex).filter(Boolean);
      
      if (sections.length > 1) {
        return (
          <div className="space-y-6">
            {sections.map((section, index) => {
              // The first element might be an intro before any section header
              if (index === 0 && !sectionRegex.test(section)) {
                return processContentBlocks(section);
              }
              
              // For other sections, extract the header and content
              const sectionTitle = section.match(/^[^:]+:/i)?.[0] || "Section";
              const sectionContent = section.replace(/^[^:]+:\s*/i, '').trim();
              
              return (
                <div key={index} className="border rounded-md p-4 bg-muted/10">
                  <h3 className="text-lg font-semibold mb-3 capitalize">{sectionTitle.replace(':', '')}</h3>
                  {processContentBlocks(sectionContent)}
                </div>
              );
            })}
          </div>
        );
      }
    }
    
    // If no special structure, process the entire content
    return processContentBlocks(content);
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

  return (
    <div className="prose max-w-none dark:prose-invert">
      {renderContent()}
    </div>
  );
};

export default FormattedResponse;
