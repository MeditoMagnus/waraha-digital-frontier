
import React from 'react';
import QueryInputArea from './QueryInputArea';
import QueryExamples from './QueryExamples';
import DomainSelector from './DomainSelector';
import { useQuerySubmission } from '@/hooks/useQuerySubmission';

interface QueryFormProps {
  onQuerySubmit: (response: string) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onQuerySubmit }) => {
  const { query, setQuery, domain, setDomain, isLoading, handleSubmit } = useQuerySubmission(onQuerySubmit);

  return (
    <div className="space-y-4">
      <DomainSelector 
        selectedDomain={domain}
        onDomainChange={setDomain}
      />
      
      <QueryInputArea 
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      <QueryExamples domain={domain} />
    </div>
  );
};

export default QueryForm;
