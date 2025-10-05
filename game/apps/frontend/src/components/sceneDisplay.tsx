import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";

export const SceneDisplay = () => {
  const { response } = useGame();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (response?.data?.scene) {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [response?.data?.scene]);

  useEffect(() => {
    if (response?.data?.scene && currentIndex < response.data.scene.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + response.data.scene[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, response?.data?.scene]);

  if (!response || !response.data || !response.data.scene) {
    return (
      <div className="bg-black border-4 border-gray-600 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500 font-['Press_Start_2P'] text-xs">
          AWAITING TRANSMISSION...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black border-4 border-gray-600 rounded-lg p-4 min-h-[250px] relative">
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-600">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 font-['Press_Start_2P'] text-xs ml-2">
          DUNGEON TERMINAL
        </span>
      </div>

      <div className="text-red-400 font-['Press_Start_2P'] text-sm leading-relaxed whitespace-pre-line">
        {displayText}
        {currentIndex < response.data.scene.length && (
          <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
        )}
      </div>
    </div>
  );
};
