import Perplexity from "@perplexity-ai/perplexity_ai";
import dotenv from "dotenv";

dotenv.config();

const client = new Perplexity();

export const extractTaskDetailsPerplexity = async (transcript) => {
  try {
    const prompt = `
You will extract structured task details from this transcript:

"${transcript}"


if date is not mentioned or it says tomorrow or day after tomorrow then calculate date from today's date ie Date.now()
Return only in this format in json nothing extra:

date should be strictly in the format of 'Thu Dec 04 2025 21:51:32 GMT+0530 (India Standard Time)'
{
  "title": "",
  "dueDate": "" (extract from transcript, if not given return for tomorrow's date, compute relative dates like tomorrow, after 10 days etc. from today's date),
  "priority": "medium | low | high" (try to understand the tone of transcript and translate to one of these values),
  "status": "todo", "inprogress", "done" (extract from transcript and translate strictly to one of these values),
  "description": "" (extract from transcript, if not possible return empty string)
}`;

    const response = await client.chat.completions.create({
      model: "sonar-pro",
      search_mode: "web",
      messages: [
        {
          content: prompt,
          role: "user",
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              dueDate: { type: "string" },
              priority: { type: "string" },
              status: { type: "string" },
              description: { type: "string" },
            },
          },
        },
      },
    });

    console.log(JSON.parse(response.choices[0].message.content));
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Perplexity Parsing Error:", error);
    throw new Error("Failed to extract task details");
  }
};
