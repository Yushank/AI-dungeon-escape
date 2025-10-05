import React from "react";
import { useGame } from "../context/GameContext";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Cards = ({ text, index }: { text: string; index: number }) => {
  const { setIsLoading, sessionId, gameStatus, isLoading } = useGame();

  async function handleOptionClick(text: string) {
    if (gameStatus !== "active" || isLoading) return;

    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/api/v1/input`, {
        choice: text,
        sessionId: sessionId,
      });
    } catch (error) {
      console.error("Error sending option:", error);
      setIsLoading(false);
    }
  }

  const isDisabled = gameStatus !== "active" || isLoading;

  return (
    <button
      onClick={() => handleOptionClick(text)}
      disabled={isDisabled}
      className="flex-1 min-w-0" // Ensure equal flex distribution
    >
      <div
        className={`bg-gray-800 rounded-lg border-4 transition-all h-full min-h-[120px] flex items-center justify-center ${
          isDisabled
            ? "border-gray-500 bg-gray-700 cursor-not-allowed opacity-50"
            : "border-yellow-400 hover:border-yellow-300 hover:shadow-lg hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer"
        } p-4`}
      >
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg font-['Press_Start_2P'] ${
              isDisabled
                ? "bg-gray-500 text-gray-300"
                : "bg-yellow-500 text-gray-900"
            }`}
          >
            {index + 1}
          </div>
          <p
            className={`font-['Press_Start_2P'] text-center flex-1 text-xs leading-tight w-full break-words ${
              isDisabled ? "text-gray-400" : "text-white"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </button>
  );
};
