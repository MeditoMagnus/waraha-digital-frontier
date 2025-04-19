
import { toast } from "@/hooks/use-toast";

const OPENAI_API_KEY = "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"; // Replace with your actual API key

export const generateAIResponse = async (query: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a highly skilled IT solutions consultant. Help users with queries related to software, IT services, architecture, pricing, configurations, or integrations.'
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
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}
