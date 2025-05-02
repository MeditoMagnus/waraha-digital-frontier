
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface QuoteSectionProps {
  content: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ content }) => {
  // Function to format text with asterisks as bold
  const formatContent = (text: string) => {
    // Create a regex pattern that matches text between ** or *** markers
    const regex = /(\*\*\*|\*\*)(.*?)(\*\*\*|\*\*)/g;
    let formattedContent = [];
    let lastIndex = 0;
    let match;
    
    // Find all matches of bold text patterns
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        formattedContent.push(text.substring(lastIndex, match.index));
      }
      
      // Add the bold text
      formattedContent.push(
        <strong key={`bold-${match.index}`}>{match[2]}</strong>
      );
      
      // Update the lastIndex to skip past this match
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      formattedContent.push(text.substring(lastIndex));
    }
    
    return formattedContent.length > 0 ? formattedContent : text;
  };

  return (
    <div className="flex items-start gap-2 my-4">
      <MessageSquare className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <blockquote className="bg-primary/5 border-l-4 border-primary px-4 py-2 italic text-muted-foreground">
        {formatContent(content.trim())}
      </blockquote>
    </div>
  );
};

export default QuoteSection;
