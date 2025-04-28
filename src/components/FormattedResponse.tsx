
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
