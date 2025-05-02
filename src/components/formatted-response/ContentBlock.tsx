
import React from 'react';
import ListSection from './ListSection';
import CodeBlock from './CodeBlock';
import TableSection from './TableSection';
import InfoSection from './InfoSection';
import RoadmapSection from './RoadmapSection';
import ChecklistSection from './ChecklistSection';
import ActionPoints from './ActionPoints';
import QuoteSection from './QuoteSection';

interface ContentBlockProps {
  block: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  const trimmedBlock = block.trim();

  // Check for roadmap/timeline content - enhanced detection
  if (/\b(roadmap|timeline|phases|steps|stages|plan|schedule|milestones)\b/i.test(trimmedBlock.toLowerCase())) {
    // Look for phase patterns or numbered lists that indicate a roadmap
    if (
      /\b(phase|step|stage|week|month|quarter|year)\s*\d+:?/i.test(trimmedBlock) ||
      /^\d+\.\s+.+/m.test(trimmedBlock)
    ) {
      return <RoadmapSection content={trimmedBlock} />;
    }
  }

  // Check for checklist content
  if (/\b(checklist|task list|to-?do list)\b/i.test(trimmedBlock.toLowerCase()) && 
      trimmedBlock.match(/^[-*•]|\d+\.\s/m)) {
    return <ChecklistSection content={trimmedBlock} />;
  }

  // Check for action points or next steps
  if (/\b(action points|next steps|recommendations|action items)\b/i.test(trimmedBlock.toLowerCase())) {
    return <ActionPoints content={trimmedBlock} />;
  }

  // Check for quotes or important statements
  if (trimmedBlock.startsWith('>') || /\b(key takeaway|quote|important note)\b/i.test(trimmedBlock.toLowerCase())) {
    const content = trimmedBlock.replace(/^>\s?/gm, ''); // Remove quote marks
    return <QuoteSection content={content} />;
  }

  // Check for lists (both bullet and numbered)
  if (trimmedBlock.match(/^[-*•]|\d+\.\s+/m)) {
    return <ListSection content={trimmedBlock} />;
  }

  // Check for code blocks
  if (trimmedBlock.includes('```')) {
    const parts = trimmedBlock.split(/```(?:\w+)?\n?|\n?```/);
    if (parts.length >= 3) {
      return (
        <div>
          {parts[0] && <p>{parts[0].trim()}</p>}
          <CodeBlock content={parts[1]} />
          {parts[2] && <p>{parts[2].trim()}</p>}
        </div>
      );
    }
  }

  // Check for tables
  if (trimmedBlock.includes('|') && 
      trimmedBlock.includes('\n') &&
      trimmedBlock.split('\n').length >= 3 &&
      trimmedBlock.split('\n')[1].includes('-')) {
    return <TableSection content={trimmedBlock} />;
  }

  // Check for tips/important notes
  if (trimmedBlock.toLowerCase().startsWith('tip:') || 
      trimmedBlock.toLowerCase().startsWith('important:')) {
    return <InfoSection type="tip" content={trimmedBlock} />;
  }

  // Check for warnings
  if (trimmedBlock.toLowerCase().startsWith('warning:') || 
      trimmedBlock.toLowerCase().startsWith('caution:')) {
    return <InfoSection type="warning" content={trimmedBlock} />;
  }

  // Default: regular paragraph - check for bold formatting
  if (trimmedBlock.includes('**')) {
    return <QuoteSection content={trimmedBlock} />;
  }

  return <p className="my-4">{trimmedBlock}</p>;
};

export default ContentBlock;
