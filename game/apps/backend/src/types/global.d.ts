import { Server } from "socket.io";

declare global {
  namespace NodeJS {
    interface Global {
      io: Server | undefined;
    }
  }

  // For newer Node.js versions (v16+)
  var io: Server | undefined;
}
