import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize Gemini client
const ai = new GoogleGenAI({});

/**
 * Extract task details from transcript
 * Using Gemini 3.0 model
 */
export const extractTaskDetails = async (transcript) => {
  try {
    const prompt = `
You will extract structured task details from this transcript:

"${transcript}"

if no status is there then by default send 'To Do' otherwise send appropriate status
if date is not mentioned or it says tomorrow or day after tomorrow then calculate date from today's date ie Date.now()
Return only in this format in json nothing extra:

date should be strictly in the format of 'Thu Dec 04 2025 21:51:32 GMT+0530 (India Standard Time)'
{
  "title": "",
  "dueDate": "" (extract from transcript, if not given return for tomorrow's date, strictly use live date of today to calculate tomorrow's date),
  "priority": "medium | low | high" (extract from transcript and translate to these values),
  "status": "todo", "inprogress", "done" (extract from transcript and translate to these values),
  "description": "" (extract from transcript, if not possible return empty string)
}
    `;
   
    // this LLM api takes time to respond which makes api slower
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",}
    });


    console.log(response.text);
    
    const text = response.text; // Extract model text output

    // Parse the JSON returned by model
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    throw new Error("Failed to extract task details");
  }
};
