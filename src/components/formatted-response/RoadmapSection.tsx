
import React from 'react';
import { CalendarCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface RoadmapSectionProps {
  content: string;
}

const RoadmapSection: React.FC<RoadmapSectionProps> = ({ content }) => {
  // More robust pattern matching for roadmap phases
  const parsePhases = () => {
    // Split the content by lines
    const lines = content.split('\n');
    
    // Match lines that look like phases (multiple patterns)
    const phaseLines = lines.filter(line => {
      const trimmed = line.trim();
      return (
        // Match "Phase X:" or "Step X:" or similar patterns
        /^(Phase|Step|Stage|Week|Month|Quarter|Year)\s*\d+:?/i.test(trimmed) ||
        // Match numbered items like "1. First step"
        /^\d+\.\s+.+/.test(trimmed)
      );
    });
    
    return phaseLines.map(line => {
      // Handle numbered items (e.g., "1. First step")
      if (/^\d+\.\s+/.test(line)) {
        const number = line.match(/^\d+/)?.[0] || '';
        const description = line.replace(/^\d+\.\s+/, '').trim();
        return {
          title: `Step ${number}`,
          description
        };
      }
      
      // Handle named phases (e.g., "Phase 1: Description")
      const match = line.match(/^([\w\s]+\d+):?(.*)/i);
      if (match) {
        return {
          title: match[1].trim(),
          description: match[2].trim()
        };
      }
      
      return {
        title: 'Step',
        description: line.trim()
      };
    });
  };
  
  const phases = parsePhases();

  // Don't render if no phases were found
  if (phases.length === 0) return null;

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
