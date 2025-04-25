
import { toast } from "@/hooks/use-toast";

// This is a placeholder - replace with your actual API key once provided
const ENCRYPTED_API_KEY = "YOUR_ENCRYPTED_API_KEY_HERE";

// Implement proper encryption/decryption
const decryptApiKey = (encryptedKey: string): string => {
  try {
    // TODO: Implement actual decryption logic
    // For now, returning the encrypted key as-is
    return encryptedKey;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt API key');
  }
}

export const generateAIResponse = async (query: string): Promise<string> => {
  try {
    // Determine if the query is IT-related using basic keyword detection
    const itRelatedKeywords = [
      "software", "hardware", "network", "server", "cloud", "database", 
      "security", "programming", "code", "development", "IT", "technology", 
      "integration", "api", "system", "architecture", "infrastructure",
      "deployment", "configuration", "service", "application", "solution",
      "platform", "tech", "compute", "storage", "web", "mobile", "device",
      "pricing", "cost", "subscription", "license", "enterprise"
    ];
    
    // Check if query contains any IT-related keywords
    const isITRelated = itRelatedKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );

    // Prepare the system message based on query content
    let systemMessage = 'You are a highly skilled IT solutions consultant. Help users with queries related to software, IT services, architecture, pricing, configurations, or integrations.';
    
    if (!isITRelated) {
      systemMessage += ' If the question is not related to IT, technology, or business solutions, politely decline to answer and explain that you are specifically an IT consultant who can only help with technology-related queries.';
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${decryptApiKey(ENCRYPTED_API_KEY)}`
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
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      throw new Error(`Failed to generate response: ${errorData?.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}

