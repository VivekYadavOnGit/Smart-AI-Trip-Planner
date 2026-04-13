import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = (import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY ?? "").trim();

if (!API_KEY) {
  throw new Error("Missing Gemini API key.");
}

const ai = new GoogleGenerativeAI(API_KEY);


export const chatSession = {
  sendMessage: async (FINAL_PROMPT) => {
    try {
      const model = ai.getGenerativeModel({
        model: "gemini-3-flash-preview", // ✅ FINAL FIX
      });

      const prompt = `
You are a travel planning assistant.

STRICT RULES:
- Return ONLY valid JSON
- No markdown
- No explanation
- No trailing commas
- Use double quotes

Format:
{
  "destination": "City Name",
  "itinerary": [
    {"day": 1, "activities": ["Place 1", "Place 2"]}
  ],
  "estimated_cost": 1000,
  "best_time_to_visit": "Month range"
}

User request: ${FINAL_PROMPT}
`;

      const result = await model.generateContent(prompt);
      let text = result.response.text();

      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      return JSON.parse(text);

    } catch (error) {
      console.error("❌ Gemini Error:", error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  },
};