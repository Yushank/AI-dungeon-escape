import React from "react";
import { useGame } from "../context/GameContext";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Cards = ({ text }: { text: string }) => {
  const { setIsLoading } = useGame();

  async function handleOptionClick(text: string) {
    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/api/v1/input`, {
        choice: text,
      });
    } catch (error) {
      console.error("Error sending option:", error);
      setIsLoading(false);
    }
  }

  return (
    <button onClick={() => handleOptionClick(text)}>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer flex-1">
        <p className="text-gray-800 font-medium text-center">{text}</p>
      </div>
    </button>
  );
};
