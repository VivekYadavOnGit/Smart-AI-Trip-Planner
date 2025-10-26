import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

// ✅ Validate API key
if (!API_KEY) {
  throw new Error(
    "Missing Gemini API key. Please set VITE_GOOGLE_GEMINI_AI_API_KEY in your .env file"
  );
}

// ✅ Initialize Gemini client
const ai = new GoogleGenerativeAI(API_KEY);

export const chatSession = {
  sendMessage: async (FINAL_PROMPT) => {
    try {
      if (!FINAL_PROMPT) {
        throw new Error("Prompt is required");
      }

      // ✅ Use Gemini 2.0 Flash (latest working model)
      const model = ai.getGenerativeModel({
        model: "models/gemini-2.0-flash",
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });

      // ✅ Proper content structure
      const prompt = {
        contents: [
          {
            parts: [
              {
                text: `
You are a travel planning assistant.
Return ONLY valid JSON (no explanation, no markdown, no extra text).
Format example:
{
  "destination": "Paris",
  "days": [
    {"day": 1, "activities": ["Eiffel Tower", "Louvre Museum"]}
  ],
  "estimated_cost": 1200,
  "best_time_to_visit": "April to June"
}

Now generate the itinerary for: ${FINAL_PROMPT}
`,
              },
            ],
          },
        ],
      };

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;

      return response.text();
    } catch (error) {
      console.error("❌ Gemini Error:", error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  },
};
