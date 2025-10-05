import { getAIResponse } from "../../utils/cerebras.js";
import { Router, Request, Response } from "express";
import { io } from "../../index.js";

export const router = Router();

interface GameSession {
  history: Array<{ role: string; content: string }>;
  startTime: number;
  turnCount: number;
}

const gameSessions = new Map<string, GameSession>();

setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of gameSessions.entries()) {
    if (now - session.startTime > 3600000) {
      gameSessions.delete(sessionId);
      console.log(`cleaned up session: ${sessionId}`);
    }
  }
}, 300000);

router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "hello" });
});

router.post("/input", async (req, res) => {
  const { choice, prompt, sessionId } = req.body;
  console.log(
    "Received from user - choice:",
    choice,
    "prompt:",
    prompt,
    "session:",
    sessionId
  );

  const userInput = choice || prompt;

  if (!sessionId) {
    return res.status(400).json({ msg: "sessionId is required" });
  }

  if (!userInput) {
    return res.status(400).json({ msg: "choice or prompt is required" });
  }

  try {
    let session = gameSessions.get(sessionId);

    if (!session) {
      session = {
        history: [],
        startTime: Date.now(),
        turnCount: 0,
      };
      gameSessions.set(sessionId, session);
      console.log("Created new session:", sessionId);
    }

    if (userInput && session.turnCount > 0) {
      session.history.push({
        role: "user",
        content: userInput,
      });
    }

    session.turnCount++;

    console.log("calling ai with history length", session.history.length);
    console.log("turn count", session.turnCount);

    const response = await getAIResponse(session.history, session.turnCount);
    console.log("console reached after calling ai function");

    session.history.push({
      role: "assistant",
      content: JSON.stringify(response),
    });

    console.log("response data from ai:", response);
    console.log("Emitting socket data to session:", sessionId);
    console.log("Total connected clients:", io.engine.clientsCount);

    io.emit("response-data", {
      sessionId,
      data: response,
    });

    res.json({ message: "Processing...", turnCount: session.turnCount });
  } catch (error) {
    console.error("Error in /input route:", error);
    return res.status(500).json({ msg: `Internal server error: ${error}` });
  }
});

router.post("/reset", (req: Request, res: Response) => {
  const { sessionId } = req.body;

  if (sessionId && gameSessions.has(sessionId)) {
    gameSessions.delete(sessionId);
    console.log("Reset session:", sessionId);
  }

  res.json({ message: "session reset" });
});

router.get("/session/:sessionId", (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const session = gameSessions.get(sessionId);

  if (session) {
    res.json({
      turnCount: session.turnCount,
      historyLength: session.history.length,
      startTime: session.startTime,
      elapsed: Date.now() - session.startTime,
    });
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});
