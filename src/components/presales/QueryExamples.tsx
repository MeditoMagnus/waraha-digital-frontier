
import React from 'react';

interface QueryExamplesProps {
  domain: string;
}

const examplesByDomain = {
  it: [
    "Which cloud provider is best for our e-commerce website?",
    "What security measures should we implement for remote work?",
    "How can we optimize our database performance?",
    "What's the cost estimate for migrating to cloud infrastructure?"
  ],
  taxation: [
    "How do we register for VAT in the UAE?",
    "What are the corporate tax compliance requirements in the UAE?",
    "How can we optimize our tax structure legally?",
    "What documentation is needed for tax filing in the UAE?"
  ],
  auditing: [
    "What financial controls should we implement?",
    "How often should we conduct internal audits?",
    "What are the IFRS compliance requirements for our industry?",
    "How can we prepare for an external audit?"
  ],
  aml: [
    "What KYC procedures should our business implement?",
    "How can we identify suspicious transactions?",
    "What AML regulations apply to our industry in the UAE?",
    "How should we structure our AML compliance program?"
  ],
  realestate: [
    "What are the current investment opportunities in Dubai?",
    "How do property valuations work in the UAE?",
    "What are the laws regarding foreign ownership of property?",
    "How can I maximize ROI on my commercial property?"
  ]
};

const QueryExamples: React.FC<QueryExamplesProps> = ({ domain }) => {
  const examples = examplesByDomain[domain as keyof typeof examplesByDomain] || examplesByDomain.it;
  
  return (
    <div className="text-sm text-muted-foreground">
      <p className="mb-2">Example questions for this domain:</p>
      <ul className="list-disc pl-5 space-y-1">
        {examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueryExamples;
