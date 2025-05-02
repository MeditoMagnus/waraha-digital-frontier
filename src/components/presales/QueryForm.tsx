
import React from 'react';
import QueryInputArea from './QueryInputArea';
import QueryExamples from './QueryExamples';
import { useQuerySubmission } from '@/hooks/useQuerySubmission';

interface QueryFormProps {
  onQuerySubmit: (response: string) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onQuerySubmit }) => {
  const { query, setQuery, isLoading, handleSubmit } = useQuerySubmission(onQuerySubmit);

  return (
    <div className="space-y-4">
      <QueryInputArea 
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      <QueryExamples />
    </div>
  );
};

export default QueryForm;
