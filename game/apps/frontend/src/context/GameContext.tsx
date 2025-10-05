import type React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { BACKEND_URL } from "../config";

interface GameContextType {
  response: any;
  isLoading: boolean;
  socket: Socket | null;
  setIsLoading: (loading: boolean) => void;
  sessionId: string;
  timeRemaining: number;
  gameStatus: "idle" | "active" | "won" | "lost";
  startNewGame: () => void;
  turnCount: number;
  isConnected: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId] = useState<string>(uuidv4());
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [gameStatus, setGameStatus] = useState<
    "idle" | "active" | "won" | "lost"
  >("idle");
  const [turnCount, setTurnCount] = useState(0);

  useEffect(() => {
    console.log("Connecting to socket.io...", BACKEND_URL);

    const newSocket = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      timeout: 10000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("response-data", (data) => {
      console.log("DATA RECEIVED FROM SOCKET:", data);
      console.log("Expected session:", sessionId);
      console.log("Received session:", data.sessionId);
      console.log("Session match:", data.sessionId === sessionId);

      if (data.sessionId === sessionId) {
        setIsLoading(false);
        setResponse(data);
        setTurnCount((prev) => prev + 1);

        if (data.data.gameStatus === "won") {
          setGameStatus("won");
        } else if (data.data.gameStatus === "lost") {
          setGameStatus("lost");
        } else if (gameStatus === "idle") {
          setGameStatus("active");
        }
      }
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
      setIsConnected(false);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    return () => {
      console.log("Disconnecting socket..");
      newSocket.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    if (gameStatus === "active" && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameStatus("lost");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStatus, timeRemaining]);

  const startNewGame = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setResponse(null);
    setTimeRemaining(300);
    setGameStatus("idle");
    setTurnCount(0);
    console.log("Starting new game with session:", newSessionId);
  };

  return (
    <GameContext.Provider
      value={{
        response,
        isLoading,
        socket,
        setIsLoading,
        sessionId,
        timeRemaining,
        gameStatus,
        startNewGame,
        turnCount,
        isConnected,
      }}
    >
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
