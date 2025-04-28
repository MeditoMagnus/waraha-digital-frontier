
import React from 'react';
import ListSection from './ListSection';
import CodeBlock from './CodeBlock';
import TableSection from './TableSection';
import InfoSection from './InfoSection';

interface ContentBlockProps {
  block: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  const trimmedBlock = block.trim();

  // Check for lists
  if (trimmedBlock.match(/^[-*•] .+/m)) {
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

  // Default: regular paragraph
  return <p className="my-4">{trimmedBlock}</p>;
};

export default ContentBlock;
