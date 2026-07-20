import { GoogleGenAI } from "@google/genai";

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  return new GoogleGenAI({
    apiKey,
  });
}

async function generateWithRetry(
  ai: GoogleGenAI,
  prompt: string,
  retries = 3
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: prompt,
      });
    } catch (error: any) {
      if (
        (error?.status === 503 || error?.status === 429) &&
        attempt < retries
      ) {
        console.log(`Retry ${attempt}/${retries}`);

        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 3000)
        );

        continue;
      }

      throw error;
    }
  }

  throw new Error("Failed to generate AI response.");
}

export async function analyzeProcess(processData: unknown) {
  const ai = getAI();

  const prompt = `
You are a Senior Integration Architect specializing in TIBCO BusinessWorks 5.x and SAP Cloud Integration (SAP CPI).

Your task is to analyze the parsed TIBCO BW process and recommend an equivalent SAP CPI integration design.

Return ONLY valid JSON in exactly this format:

{
  "summary": "...",
  "complexity": "Simple | Medium | Complex",
  "reasoning": "...",
  "sapCpiDesign": {
    "flow": "...",
    "steps": [
      "...",
      "...",
      "..."
    ],
    "adapters": [
      "...",
      "..."
    ]
  }
}

Instructions:

1. Summary
- Summarize the process in 2-3 concise sentences.

2. Complexity
Determine the complexity using:
- Number of activities
- Number of transitions
- Conditional routing
- Loops
- Error handlers
- Variables
- External integrations

Classify as:
- Simple
- Medium
- Complex

3. Reasoning
Explain why the chosen complexity level is appropriate.

4. SAP CPI Design
Recommend an equivalent SAP CPI implementation.

The recommendation may include only relevant components such as:
- HTTPS Sender
- HTTPS Receiver
- SOAP
- OData
- IDoc
- SFTP
- JMS
- Mail
- Router
- Splitter
- Content Modifier
- Message Mapping
- Groovy Script
- Request Reply
- Local Integration Process
- Process Call
- Exception Subprocess
- Multicast
- Gather
- Data Store

Rules:
- Base your analysis ONLY on the supplied process.
- Do NOT invent TIBCO activities that are not present.
- If information is missing, make reasonable migration recommendations and clearly treat them as recommendations rather than facts.
- Mention only SAP CPI components that are actually useful for this process.
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include code fences.
- Do NOT include explanations outside the JSON.

Parsed Process:
${JSON.stringify(processData, null, 2)}
`;

  const response = await generateWithRetry(ai, prompt);

  const text = (response.text ?? "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Gemini Response:");
    console.error(text);

    throw new Error("Gemini returned invalid JSON.");
  }
}