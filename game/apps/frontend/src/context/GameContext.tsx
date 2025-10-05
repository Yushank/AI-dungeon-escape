import type React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io, Socket } from "socket.io-client";

interface GameContextType {
  response: any;
  isLoading: boolean;
  socket: Socket | null;
  setIsLoading: (loading: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Connecting to socket.io...");
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("socket connected", newSocket.id);
    });

    newSocket.on("response-data", (data) => {
      console.log("DATA RECEIVED FROM SOCKET:", data);
      setIsLoading(false);
      setResponse(data);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      console.log("Disconnecting socket..");
      newSocket.disconnect();
    };
  }, []);

  return (
    <GameContext.Provider value={{ response, isLoading, socket, setIsLoading }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
};
