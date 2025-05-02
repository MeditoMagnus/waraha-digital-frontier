
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface ActionPointsProps {
  content: string;
}

const ActionPoints: React.FC<ActionPointsProps> = ({ content }) => {
  // Parse action points from content
  const points = content.split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^[-*]|\d+\.\s+/, '').trim());

  return (
    <div className="my-4">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-2 flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 text-primary" />
            Next Steps / Action Points
          </h3>
          <ul className="space-y-2">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionPoints;
