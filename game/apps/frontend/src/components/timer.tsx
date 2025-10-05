import React from "react";
import { useGame } from "../context/GameContext";

export const Timer = () => {
  const { timeRemaining, gameStatus, turnCount } = useGame();

  if (gameStatus === "idle") {
    return null;
  }

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const getTimerColor = () => {
    if (timeRemaining > 200) return "text-green-600 border-green-500"; // > 5 min
    if (timeRemaining > 60) return "text-yellow-600 border-yellow-500"; // > 1 min
    return "text-red-600 border-red-500 animate-pulse"; // < 1 min
  };

  const getProgressColor = () => {
    if (timeRemaining > 200) return "bg-green-500";
    if (timeRemaining > 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const progressPercentage = (timeRemaining / 300) * 100;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-3 border-2 ${getTimerColor()}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Time Remaining
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">Turn {turnCount}</span>
          </div>
        </div>
        <span className={`text-3xl font-bold tabular-nums ${getTimerColor()}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${getProgressColor()}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {timeRemaining <= 60 && timeRemaining > 0 && (
        <p className="text-red-600 text-sm mt-2 text-center font-bold animate-pulse">
          ⚠️ ONE MINUTE LEFT! HURRY!
        </p>
      )}

      {timeRemaining === 0 && (
        <p className="text-red-600 text-sm mt-2 text-center font-bold">
          ⏰ TIME'S UP!
        </p>
      )}
    </div>
  );
};
