import express from "express";
import { router } from "./routes/v1/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import type { Socket } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: [
      "https://ai-dungeon-escape-egnf.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

export const io = new Server(server, {
  cors: {
    origin: [
      "https://ai-dungeon-escape-egnf.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.use("/api/v1", router);

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    socketConnections: io.engine.clientsCount,
  });
});

io.on("connection", (socket: Socket) => {
  console.log("Game connected:", socket.id);
  console.log("Total clients connected:", io.engine.clientsCount);

  socket.on("disconnect", (reason) => {
    console.log("Game disconnected:", socket.id, "Reason:", reason);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
