import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct import

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);

export const chatSession = {
  sendMessage: async (FINAL_PROMPT) => {
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Correct call

      const result = await model.generateContent(FINAL_PROMPT); // ✅ No need to wrap in `contents: [{...}]`
      const response = result.response;
      const text = response.text(); // ✅ Plain string output
      return text;
    } catch (error) {
      console.error("❌ Gemini Error:", error);
      throw error;
    }
  },
};
