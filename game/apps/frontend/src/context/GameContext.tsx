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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionId, setSessionId] = useState<string>(uuidv4());
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 mins
  const [gameStatus, setGameStatus] = useState<
    "idle" | "active" | "won" | "lost"
  >("idle");
  const [turnCount, setTurnCount] = useState(0);

  useEffect(() => {
    console.log("Connecting to socket.io...");
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("socket connected", newSocket.id);
    });

    newSocket.on("response-data", (data) => {
      console.log("DATA RECEIVED FROM SOCKET:", data);

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
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
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
