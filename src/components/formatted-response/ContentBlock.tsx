
import React from 'react';
import CodeBlock from './CodeBlock';
import QuoteSection from './QuoteSection';
import ListSection from './ListSection';
import TableSection from './TableSection';
import InfoSection from './InfoSection';
import ChecklistSection from './ChecklistSection';
import RoadmapSection from '../formatted-response/RoadmapSection';
import ActionPoints from './ActionPoints';

interface ContentBlockProps {
  block: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  // Check if this is a code block
  if (block.startsWith('```') && block.endsWith('```')) {
    return <CodeBlock content={block.slice(3, -3)} />;
  }
  
  // Check if this is a quote block
  if (block.startsWith('>')) {
    return <QuoteSection content={block} />;
  }
  
  // Check if this contains a table (markdown tables)
  if (block.includes('|') && block.includes('\n') && block.split('\n')[0].includes('|') && block.split('\n')[1]?.includes('---')) {
    return <TableSection content={block} />;
  }
  
  // Check if this is a list
  if (/^[-*+] /.test(block) || /^\d+\.\s/.test(block)) {
    return <ListSection content={block} />;
  }
  
  // Check if this is a note/info section
  if (block.toLowerCase().includes('note:') || block.toLowerCase().includes('important:')) {
    return <InfoSection content={block} type="tip" />;
  }
  
  // Check if this is a warning section
  if (block.toLowerCase().includes('warning:') || block.toLowerCase().includes('caution:')) {
    return <InfoSection content={block} type="warning" />;
  }

  // Check if this is a tip section
  if (block.toLowerCase().includes('tip:') || block.toLowerCase().includes('hint:')) {
    return <InfoSection content={block} type="tip" />;
  }
  
  // Check if this is a checklist
  if (block.toLowerCase().includes('- [ ]') || block.toLowerCase().includes('- [x]')) {
    return <ChecklistSection content={block} />;
  }
  
  // Check if this is a roadmap/timeline section
  if (
    (
      /\b(roadmap|timeline|phases|steps|stages|plan|schedule|milestones)\b/i.test(block) && 
      (/phase\s*\d+/i.test(block) || /step\s*\d+/i.test(block) || /\d+\.\s+/m.test(block))
    ) || 
    /^(Phase|Step|Stage|Week|Month|Quarter|Year)\s*\d+:?/im.test(block)
  ) {
    return <RoadmapSection content={block} />;
  }
  
  // Check if this block contains action points
  if (block.toLowerCase().includes('action item') || block.toLowerCase().includes('next steps') || block.toLowerCase().includes('todo') || block.toLowerCase().includes('to do')) {
    return <ActionPoints content={block} />;
  }
  
  // For regular paragraphs, convert markdown-style bold to HTML bold
  const formattedBlock = block
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong>$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // If the block contains HTML, use dangerouslySetInnerHTML
  if (formattedBlock.includes('<')) {
    return <p className="mb-4" dangerouslySetInnerHTML={{ __html: formattedBlock }} />;
  }
  
  // Otherwise, render as plain text
  return <p className="mb-4">{block}</p>;
};

export default ContentBlock;
