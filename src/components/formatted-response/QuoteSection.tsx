
import React from 'react';

interface QuoteSectionProps {
  content: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ content }) => {
  // Remove the leading > characters and trim whitespace
  const cleanedContent = content
    .split('\n')
    .map(line => line.replace(/^>\s*/, '').trim())
    .join('\n');
    
  // Format the content - handle bold text formatting
  const formattedContent = cleanedContent
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong>$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>');

  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 text-gray-700 italic">
      <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
    </blockquote>
  );
};

export default QuoteSection;
