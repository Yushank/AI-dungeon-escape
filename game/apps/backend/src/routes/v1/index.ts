import { getAIResponse } from "../../utils/cerebras.js";
import { Router } from "express";
import { io } from "../../index.js";

export const router = Router();

router.get("/hello", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/input", async (req, res) => {
  const { choice } = req.body;
  console.log("Received choice from user", choice);

  try {
    console.log("console reached before calling ai function");
    const response = await getAIResponse(choice);
    console.log("console reached after calling ai function");

    console.log("response data from ai:", response);
    io.emit("response-data", {
      data: response,
    });

    res.json({ message: "Processing..." });
  } catch (error) {
    return res.status(500).json({ msg: `Internal server error: ${error}` });
  }
});
