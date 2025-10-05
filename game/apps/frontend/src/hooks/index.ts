// hooks/index.ts
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useResponse = () => {
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    console.log("🔌 Connecting to Socket.IO...");
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("gameData", (data) => {
      console.log("DATA RECEIVED FROM SOCKET:", data);
      setResponse(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { response };
};
