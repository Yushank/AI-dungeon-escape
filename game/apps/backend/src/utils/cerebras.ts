import Cerebras from "@cerebras/cerebras_cloud_sdk";
import dotenv from "dotenv";

dotenv.config();

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

interface GameResponse {
  scene: string;
  options: string[];
  gameStatus: "continue" | "won" | "lost";
  message?: string;
}

const apiKey = process.env.CEREBRAS_API_KEY;

if (!apiKey) {
  throw new Error("CEREBRAS_API_KEY is not defined in environment variables");
}

const client = new Cerebras({
  apiKey: apiKey,
});

const SYSTEM_PROMPT = `You are a dungeon master for an ESCAPE ROOM adventure. Your goal is to create a winnable dungeon escape game.

CRITICAL RULES:
1. The game should take 10-15 turns to complete
2. Player must find clues, solve puzzles, and make progress toward escape
3. After 8-12 turns, if player is doing well, provide the final escape opportunity
4. Create dangerous situations, but allow smart players to survive
5. Each scene should be 2-3 sentences, atmospheric and engaging
6. Provide exactly 2 meaningful options that advance the story

GAME ENDING CONDITIONS:
- Set "gameStatus": "won" when player successfully escapes the dungeon
- Set "gameStatus": "lost" when player dies or becomes permanently trapped
- Set "gameStatus": "continue" for all other turns
- Add a "message" field with victory/defeat details when game ends

RESPONSE FORMAT (strict JSON only):
{
  "scene": "Atmospheric description of current situation (2-3 sentences)",
  "options": ["Clear action option 1", "Clear action option 2"],
  "gameStatus": "continue" | "won" | "lost",
  "message": "Optional: Victory or defeat message"
}

IMPORTANT: The dungeon should have a clear path to escape. Create puzzles and obstacles, but make victory possible through smart choices.`;

const INITIAL_PROMPT = `Start a NEW dungeon escape adventure. The player wakes up trapped in a dangerous dungeon and must find a way to escape. Create the opening scene with atmospheric details. Provide 2 clear starting options.`;

export async function getAIResponse(
  history: Array<{ role: string; content: string }>,
  turnCount: number
): Promise<GameResponse> {
  console.log(" Getting AI response, turn:", turnCount);
  const messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }> = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ];

  if (turnCount === 1 || history.length === 0) {
    messages.push({
      role: "user",
      content: INITIAL_PROMPT,
    });
  } else {
    messages.push(
      ...(history as Array<{
        role: "system" | "user" | "assistant";
        content: string;
      }>)
    );

    if (turnCount >= 10 && turnCount <= 12) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        lastMessage.content +=
          " [Note: The player has been exploring for a while. Consider providing a path to escape soon if they're making good progress.]";
      }
    }
  }
  console.log("Sending to AI, message count:", messages.length);

  try {
    const response = (await client.chat.completions.create({
      messages: messages,
      model: "llama3.1-8b",
      temperature: 0.7,
    })) as ChatCompletion;

    const responseText = response.choices[0]?.message?.content;
    console.log("📥 Raw AI response:", responseText);

    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(responseText);

    if (!parsed.scene || !parsed.options || !Array.isArray(parsed.options)) {
      throw new Error("Invalid response structure from AI");
    }

    if (parsed.options.length !== 2) {
      parsed.options = parsed.options.slice(0, 2);
      if (parsed.options.length < 2) {
        parsed.options.push("Wait and observe carefully");
      }
    }

    if (!parsed.gameStatus) {
      parsed.gameStatus = "continue";
    }

    //to force end if game goes for too long
    if (turnCount >= 15 && parsed.gameStatus === "continue") {
      parsed.gameStatus = "lost";
      parsed.message =
        "Time has run out... the dungeon walls close in around you. You couldn't find the exit in time.";
      parsed.options = ["Start New Game", "Try Again"];
    }

    console.log("Parsed response:", parsed);
    return parsed as GameResponse;
  } catch (error) {
    console.error("Failed to parse AI response:", error);

    return {
      scene:
        "You find yourself in a dimly lit stone chamber. Ancient torches flicker on the walls, and you can hear water dripping in the distance.",
      options: ["Search the chamber thoroughly", "Follow the sound of water"],
      gameStatus: "continue",
    };
  }
}
