
import { toast } from "@/hooks/use-toast";

const OPENAI_API_KEY = "sk-vqXYYPRtT2BlbkFJP5K8T3BlbkFJmPuXs7ZHGy5l0123456789"; // Replace with your actual API key

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
