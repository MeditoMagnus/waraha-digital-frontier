
import React from 'react';
import { ListCheck } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

interface ChecklistSectionProps {
  content: string;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ content }) => {
  // Parse checklist items from content
  const items = content.split('\n')
    .filter(line => line.trim().match(/^[-*]|\d+\.\s+/))
    .map(line => line.replace(/^[-*]|\d+\.\s+/, '').trim());

  return (
    <div className="flex items-start gap-2 my-4">
      <ListCheck className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <div className="space-y-2 w-full">
        <h3 className="text-base font-medium">Checklist</h3>
        {items.map((item, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Checkbox id={`checklist-${index}`} className="mt-1" />
            <label 
              htmlFor={`checklist-${index}`} 
              className="text-sm leading-tight cursor-pointer"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistSection;
