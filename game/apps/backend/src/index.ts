import express from "express";
import { router } from "./routes/v1/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import type { Socket } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/api/v1", router);

io.on("connection", (socket: Socket) => {
  console.log("Game connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Game disconnected:", socket.id);
  });
});

server.listen(4000);

// app.listen(process.env.PORT || 5050);
