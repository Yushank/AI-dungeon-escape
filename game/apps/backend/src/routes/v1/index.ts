import { getAIResponse } from "../../utils/cerebras.js";
import { Router } from "express";
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

router.get("/hello", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/input", async (req, res) => {
  const { choice, sessionId } = req.body;
  console.log("Received choice from user", choice);

  if (!sessionId) {
    return res.status(400).json({ msg: "sessionId is required" });
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

    if (choice && session.turnCount > 0) {
      session.history.push({
        role: "user",
        content: choice,
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
    io.emit("response-data", {
      sessionId,
      data: response,
    });

    res.json({ message: "Processing...", turnCount: session.turnCount });
  } catch (error) {
    return res.status(500).json({ msg: `Internal server error: ${error}` });
  }
});

router.post("/reset", (req, res) => {
  const { sessionId } = req.body;

  if (sessionId && gameSessions.has(sessionId)) {
    gameSessions.delete(sessionId);
    console.log("Reset session:", sessionId);
  }

  res.json({ message: "session reset" });
});

router.get("/session/:sessionId", (req, res) => {
  const { sessionId } = req.body;
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
