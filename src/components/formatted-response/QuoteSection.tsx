
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface QuoteSectionProps {
  content: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ content }) => {
  // Function to format text with asterisks as bold
  const formatContent = (text: string) => {
    // Handle both *** and ** patterns for bold text
    const parts = text.split(/(\*\*\*|\*\*)/);
    
    return parts.map((part, index) => {
      if (part === '***' || part === '**') {
        // Skip the asterisk markers
        return null;
      }
      
      // Check if this part should be bold (follows an asterisk marker)
      const prevPart = index > 0 ? parts[index - 1] : '';
      const isBold = prevPart === '***' || prevPart === '**';
      
      // If there's content to render
      if (part.trim()) {
        return isBold ? <strong key={index}>{part}</strong> : part;
      }
      
      return null;
    });
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
