import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export const Start = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, sessionId } = useGame();

  async function sendInitialPrompt() {
    setIsLoading(true);

    try {
      console.log("Starting game with session:", sessionId);
      await axios.post(`${BACKEND_URL}/api/v1/input`, {
        choice: "start game",
        sessionId: sessionId,
      });
      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="text-center">
      <button
        className="rounded-lg px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        onClick={sendInitialPrompt}
        disabled={isLoading}
      >
        {isLoading ? "⏳ Starting Adventure..." : "🎮 Start Game"}
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
        <p>⏱️ You have 10 minutes to escape!</p>
        <p>🎯 Make smart choices to find your way out</p>
      </div>
    </div>
  );
};
