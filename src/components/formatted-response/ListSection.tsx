
import React from 'react';
import { List } from 'lucide-react';

interface ListSectionProps {
  content: string;
}

const ListSection: React.FC<ListSectionProps> = ({ content }) => {
  return (
    <div className="flex items-start gap-2 my-4">
      <List className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <ul className="list-disc list-inside space-y-2">
        {content.split(/\n/).filter(line => line.trim()).map((item, index) => (
          <li key={index} className="pl-0">{item.replace(/^[-*•]\s+/, '')}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListSection;
