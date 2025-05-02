
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface QuoteSectionProps {
  content: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ content }) => {
  return (
    <div className="flex items-start gap-2 my-4">
      <MessageSquare className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <blockquote className="bg-primary/5 border-l-4 border-primary px-4 py-2 italic text-muted-foreground">
        {content.trim()}
      </blockquote>
    </div>
  );
};

export default QuoteSection;
