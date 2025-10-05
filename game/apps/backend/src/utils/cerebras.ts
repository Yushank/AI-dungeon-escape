import Cerebras from "@cerebras/cerebras_cloud_sdk";

interface ChatCompletion {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    index: number;
    finish_reason: string;
  }>;
  id: string;
  model: string;
}

const client = new Cerebras({
  apiKey: "csk-fnm462r485hjvy5dmvpe44prjvpy25ewfnv988m4p9ttn9yt",
});

export async function getAIResponse(
  userChoice: string
): Promise<ChatCompletion> {
  console.log("reached geAIResponse function");
  const response = (await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          'You are a dungeon master. Create a short scene (2 sentences) and provide exactly 2 options. Respond in JSON: {"scene": "...", "options": ["...", "..."]}',
      },
      {
        role: "user",
        content: userChoice || "Start a dungeon escape game",
      },
    ],
    model: "qwen-3-coder-480b",
  })) as ChatCompletion;

  const text = response.choices[0].message.content;
  return JSON.parse(text);
}
