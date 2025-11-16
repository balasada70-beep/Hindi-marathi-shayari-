
import { GoogleGenAI } from "@google/genai";
import { Language, ShayriResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateShayri = async (topic: string, language: Language, useSearch: boolean): Promise<ShayriResult> => {
  try {
    const languageName = language === Language.Hindi ? 'Hindi' : 'Marathi';
    
    let prompt: string;
    const basePrompt = `Generate a 4-line, soulful and poetic shayri in ${languageName}`;
    const topicPrompt = topic.trim() ? ` about "${topic.trim()}"` : ` on a random interesting topic`;
    const groundingPrompt = useSearch ? `, using real-time web search results for inspiration if the topic is contemporary or specific.` : `.`;
    const formatPrompt = ` Only return the shayri text itself, without any titles, explanations, or quotes.`;

    prompt = basePrompt + topicPrompt + groundingPrompt + formatPrompt;

    const modelConfig: any = {
      temperature: 0.9,
      topP: 1,
      topK: 1,
    };

    if (useSearch) {
      modelConfig.tools = [{googleSearch: {}}];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: modelConfig,
    });

    const text = response.text.trim();
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as ShayriResult['sources'] | undefined;

    return { text, sources };
  } catch (error) {
    console.error("Error generating shayri:", error);
    return {
      text: "माफ़ कीजिए, मैं अभी शायरी नहीं बना सकता। कृपया कुछ देर बाद प्रयास करें।",
    };
  }
};
