import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DocumentType } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-3-flash-preview";

export const generateLegalDocumentStream = async (
  docType: DocumentType,
  formData: Record<string, string>,
  region: string
): Promise<AsyncIterable<GenerateContentResponse>> => {
  const prompt = `
    You are an expert legal document drafter. 
    Create a comprehensive and legally sound ${docType} for the region/jurisdiction of ${region}.
    
    Here are the specific details provided by the user:
    ${JSON.stringify(formData, null, 2)}

    Requirements:
    1. Use professional legal terminology suitable for ${region}.
    2. Format the output using Markdown. Use bolding for titles and important clauses.
    3. Include placeholders [LIKE THIS] for any information that might be missing but is legally required.
    4. Ensure all standard clauses for a ${docType} (e.g., Indemnity, Termination, Jurisdiction) are included.
    5. Do not include any conversational preamble. Start directly with the document title.
  `;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: modelId,
      contents: prompt,
    });
    return responseStream;
  } catch (error) {
    console.error("Error generating document:", error);
    throw error;
  }
};

export const chatWithLegalAssistant = async (history: {role: string, parts: {text: string}[]}[] , message: string) => {
    try {
        const chat = ai.chats.create({
            model: modelId,
            history: history,
            config: {
                systemInstruction: "You are a helpful legal assistant for 'CHAVHAN STAMP VENDOR', a legal service provider in Bhusawal, Maharashtra. You help users understand legal documents (Sale Deed, Gift Deed, etc.), stamp duty requirements in Maharashtra, and general legal processes. You can reply in English or Marathi based on the user's language. Important: You DO NOT provide binding legal advice or generate full legal documents in the chat. If a user asks to draft a document or for specific legal prices, strictly advise them to contact the office via the WhatsApp button or call 9422280256. Be polite, professional, and concise."
            }
        });

        const result = await chat.sendMessageStream({ message });
        return result;
    } catch (error) {
        console.error("Error in chat:", error);
        throw error;
    }
}