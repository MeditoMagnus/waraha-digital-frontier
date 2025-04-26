
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackQuery } from "./queries";

export const generateAIResponse = async (query: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat-with-ai', {
      body: { query },
    });

    if (error) {
      console.error('Supabase Edge Function error:', error);
      throw new Error(error.message || 'Failed to call AI function');
    }

    if (!data || !data.response) {
      throw new Error('No response received from AI');
    }

    // Track this query for analytics
    await trackQuery(query, data.response);

    return data.response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}
