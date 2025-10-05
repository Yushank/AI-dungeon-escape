import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export const Start = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useGame();

  async function sendInitialPrompt() {
    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/api/v1/input`, {
        prompt: "lets go",
      });
      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="text-center">
      <button
        className="rounded-lg px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={sendInitialPrompt}
        disabled={isLoading}
      >
        {isLoading ? "Starting Adventure..." : "🎮 Start Game"}
      </button>

      {isLoading && (
        <p className="mt-4 text-gray-600 animate-pulse">
          Generating your dungeon...
        </p>
      )}
    </div>
  );
};
