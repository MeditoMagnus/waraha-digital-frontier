
import React from 'react';
import { Code } from 'lucide-react';

interface CodeBlockProps {
  content: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content }) => {
  return (
    <div className="flex items-start gap-2 my-4">
      <Code className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto w-full">
        <code>{content.trim()}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
