import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { useState } from "react";
// import { useEffect } from "react";

export const Start = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, sessionId, isConnected } = useGame();
  const [error, setError] = useState("");

  async function sendInitialPrompt() {
    if (!isConnected) {
      setError(
        "Not connected to server. Please check your connection and try again."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Starting game with session:", sessionId);

      try {
        const healthCheck = await axios.get(`${BACKEND_URL}/api/v1/health`);
        console.log("Health check:", healthCheck.data);
      } catch (healthError) {
        console.error("Health check failed:", healthError);
        setError("Server is not responding. Please try again later.");
        setIsLoading(false);
        return;
      }

      await axios.post(`${BACKEND_URL}/api/v1/input`, {
        choice: "start game",
        sessionId: sessionId,
      });

      setTimeout(() => {
        navigate("/game");
      }, 500);
    } catch (error: any) {
      console.error("Error starting game:", error);
      setError(
        error.response?.data?.msg || "Failed to start game. Please try again."
      );
      setIsLoading(false);
    }
  }

  const isButtonDisabled = isLoading || !isConnected;

  return (
    <div className="text-center">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded text-red-700">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-2 underline"
          >
            Reload Page
          </button>
        </div>
      )}

      {!isConnected && !error && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-700">Connecting to server...</p>
        </div>
      )}

      <button
        className="rounded-lg px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        onClick={sendInitialPrompt}
        disabled={isButtonDisabled}
      >
        {isLoading ? "Starting Adventure..." : "Start Game"}
      </button>

      {isLoading && (
        <div className="mt-6 space-y-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto"></div>
          <p className="text-gray-600 animate-pulse">
            The AI is crafting your dungeon...
          </p>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>You have 5 minutes to escape!</p>
        <p>Make smart choices to find your way out</p>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>Backend: {BACKEND_URL}</p>
        <p>Connected: {isConnected ? "Yes" : "No"}</p>
        <p>Session: {sessionId}</p>
      </div>
    </div>
  );
};
