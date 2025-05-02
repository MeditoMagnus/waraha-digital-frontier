
import React from 'react';
import { CalendarCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface RoadmapSectionProps {
  content: string;
}

const RoadmapSection: React.FC<RoadmapSectionProps> = ({ content }) => {
  // Parse phases from content (expected format: Phase 1: Description\nPhase 2: Description)
  const phases = content.split('\n')
    .filter(line => line.match(/^(Phase|Step|Stage|Week|Month|Quarter|Year)\s*\d+:?/i))
    .map(line => {
      const [title, ...description] = line.split(':');
      return {
        title: title.trim(),
        description: description.join(':').trim()
      };
    });

  return (
    <div className="flex items-start gap-2 my-4">
      <CalendarCheck className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <div className="w-full space-y-2">
        {phases.map((phase, index) => (
          <Card key={index} className="bg-muted/50 border-primary/10">
            <CardContent className="p-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{phase.title}</h4>
                  <p className="text-muted-foreground text-sm">{phase.description}</p>
                </div>
                {index < phases.length - 1 && (
                  <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSection;
