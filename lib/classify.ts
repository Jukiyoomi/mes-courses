import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key");
}
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
