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
        sessionId: sessionId, // Add sessionId
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
      className={`flex-1 transition-all duration-200 ${
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all ${
          isDisabled
            ? "border-gray-300 bg-gray-100"
            : "border-blue-400 hover:border-blue-600 hover:shadow-lg hover:scale-105"
        }`}
      >
        <div className="flex items-center justify-center gap-3">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
              isDisabled
                ? "bg-gray-400 text-gray-600"
                : "bg-blue-500 text-white"
            }`}
          >
            {index + 1}
          </div>
          <p
            className={`font-medium text-center flex-1 ${
              isDisabled ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </button>
  );
};
