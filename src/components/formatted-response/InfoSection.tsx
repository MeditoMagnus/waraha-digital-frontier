
import React from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';

interface InfoSectionProps {
  content: string;
  type: 'tip' | 'warning';
}

const InfoSection: React.FC<InfoSectionProps> = ({ content, type }) => {
  const Icon = type === 'tip' ? Lightbulb : AlertTriangle;
  const styles = type === 'tip' 
    ? 'bg-muted p-4 rounded-lg w-full'
    : 'bg-destructive/10 text-destructive p-4 rounded-lg w-full';

  return (
    <div className="flex items-start gap-2 my-4">
      <Icon className={`h-5 w-5 mt-1 flex-shrink-0 ${type === 'tip' ? 'text-primary' : 'text-destructive'}`} />
      <div className={styles}>
        {content}
      </div>
    </div>
  );
};

export default InfoSection;
