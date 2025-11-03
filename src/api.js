const apikey = import.meta.env.VITE_GEMINI_API_KEY;

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: apikey });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

export default main;
