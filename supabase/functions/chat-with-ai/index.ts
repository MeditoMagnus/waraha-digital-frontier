
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get the API key from the environment variable
const OPENAI_API_KEY = Deno.env.get('OPEN_AI_KEY');

if (!OPENAI_API_KEY) {
  console.error('OPEN_AI_KEY environment variable is not set');
}

// Define the specialized consultancy domains
const consultancyDomains = {
  'it': {
    name: 'IT Consultancy',
    keywords: [
      "software", "hardware", "network", "server", "cloud", "database", 
      "security", "programming", "code", "development", "IT", "technology", 
      "integration", "api", "system", "architecture", "infrastructure",
      "deployment", "configuration", "service", "application", "solution",
      "platform", "tech", "compute", "storage", "web", "mobile", "device",
      "pricing", "cost", "subscription", "license", "enterprise", "digital",
      "transformation", "backup", "disaster", "recovery", "cyber", "security"
    ],
    systemPrompt: `You are a highly skilled IT solutions consultant at Waraha Group. 
    Help users with queries related to software, IT services, architecture, pricing, 
    configurations, or integrations. Provide specific, actionable advice for IT problems 
    and refer to industry best practices. When appropriate, mention that Waraha Group 
    offers comprehensive IT consultancy services that can provide more detailed assistance.`
  },
  'taxation': {
    name: 'Taxation Consultancy',
    keywords: [
      "tax", "vat", "excise", "duty", "corporate tax", "income tax", "taxation", 
      "tax compliance", "tax planning", "tax audit", "tax advisory", "tax return", 
      "double taxation", "tax treaty", "tax residence", "fiscal", "revenue", 
      "tax authority", "tax regulation", "tax law", "tax exemption", "tax incentive",
      "tax clearance", "tax consultant", "tax expert", "UAE tax", "FTA"
    ],
    systemPrompt: `You are a professional taxation consultant at Waraha Group specializing in UAE tax regulations.
    Help users understand UAE's taxation framework including VAT, Excise Tax, and Corporate Tax.
    Provide accurate guidance on tax compliance, registration, filing procedures, and deadlines.
    Always clarify that your advice is general in nature and that Waraha Group can provide 
    personalized tax consultancy services for their specific situations.`
  },
  'auditing': {
    name: 'Auditing Consultancy',
    keywords: [
      "audit", "financial statement", "internal audit", "external audit", 
      "compliance audit", "statutory audit", "operational audit", "auditor", 
      "accounting", "financial reporting", "IFRS", "assurance", "attestation", 
      "controls", "risk assessment", "fraud", "financial", "accounts", "review", 
      "examination", "verification", "inspection", "evaluation"
    ],
    systemPrompt: `You are an experienced auditing professional at Waraha Group.
    Help users understand auditing requirements, processes, and best practices in the UAE.
    Provide guidance on financial statement preparation, internal controls, 
    compliance with accounting standards, and regulatory requirements.
    Explain auditing concepts clearly and emphasize that Waraha Group offers 
    comprehensive auditing services to ensure compliance and transparency.`
  },
  'aml': {
    name: 'Anti-Money Laundering Consultancy',
    keywords: [
      "AML", "anti-money", "laundering", "counter-terrorism financing", "CTF", 
      "compliance", "KYC", "know your customer", "CDD", "customer due diligence", 
      "EDD", "enhanced due diligence", "PEP", "politically exposed person", 
      "sanctions", "screening", "transaction monitoring", "suspicious activity", 
      "STR", "suspicious transaction", "risk assessment", "regulatory", "FATF", 
      "financial crime", "fraud prevention", "CBUAE", "central bank"
    ],
    systemPrompt: `You are a specialized Anti-Money Laundering (AML) consultant at Waraha Group.
    Help users understand AML compliance requirements in the UAE, including KYC procedures,
    transaction monitoring, risk assessment methodologies, and reporting obligations.
    Explain the importance of robust AML frameworks and how they protect businesses.
    Emphasize that Waraha Group provides comprehensive AML consultancy to help
    organizations develop and implement effective compliance programs.`
  },
  'realestate': {
    name: 'Real Estate Consultancy',
    keywords: [
      "real estate", "property", "investment", "residential", "commercial", "office", 
      "retail", "industrial", "land", "development", "ROI", "return", "capital", 
      "appreciation", "rental", "yield", "leasing", "tenant", "landlord", "valuation",
      "appraisal", "facility", "management", "RERA", "title deed", "escrow", "mortgage", 
      "financing", "property management", "buying", "selling", "market analysis"
    ],
    systemPrompt: `You are a real estate consultancy expert at Waraha Group specializing in UAE property markets.
    Help users understand the UAE real estate landscape, investment opportunities, regulatory framework,
    and market trends. Provide guidance on property acquisition, management, valuation,
    and investment strategies. Emphasize that Waraha Group offers comprehensive
    real estate consultancy services for both investors and property owners.`
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, domain = 'it' } = await req.json();
    
    if (!query) {
      throw new Error("Query is required");
    }
    
    // Get the selected domain or default to IT consultancy
    const selectedDomain = consultancyDomains[domain as keyof typeof consultancyDomains] || consultancyDomains.it;
    
    // Determine if the query matches the selected domain using keyword detection
    const isDomainRelated = selectedDomain.keywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );

    // Create a system message based on the domain and query relevance
    const systemMessage = isDomainRelated 
      ? selectedDomain.systemPrompt
      : `${selectedDomain.systemPrompt} If the question is not related to ${selectedDomain.name.toLowerCase()}, politely explain that you are specifically a ${selectedDomain.name.toLowerCase()} consultant but you'll try to provide general guidance.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    
    return new Response(JSON.stringify({ 
      response: data.choices[0].message.content,
      domain: selectedDomain.name
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
