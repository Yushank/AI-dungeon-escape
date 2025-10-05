import React from "react";
import { SceneDisplay } from "./sceneDisplay";
import { OptionWindow } from "./optionWindow";
import InputComp from "./inputComp";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { Timer } from "./timer";

export const GameWindow = () => {
  const { isLoading, response, gameStatus, startNewGame, timeRemaining } =
    useGame();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    startNewGame();
    navigate("/home");
  };

  if (gameStatus === "won") {
    return (
      <div className="w-full max-w-4xl text-center">
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-2xl p-12 text-white">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-5xl font-bold mb-4">YOU ESCAPED!</h1>
          <p className="text-2xl mb-6">
            {response?.data?.message ||
              "Congratulations! You found your way out of the dungeon!"}
          </p>
          <div className="bg-white/20 rounded-lg p-4 mb-6 inline-block">
            <p className="text-lg">
              Time Remaining: {Math.floor(timeRemaining / 60)}:
              {(timeRemaining % 60).toString().padStart(2, "0")}
            </p>
          </div>
          <button
            onClick={handlePlayAgain}
            className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  if (gameStatus === "lost") {
    const lostByTime = timeRemaining === 0;
    return (
      <div className="w-full max-w-4xl text-center">
        <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-2xl p-12 text-white">
          <div className="text-6xl mb-4">💀</div>
          <h1 className="text-5xl font-bold mb-4">GAME OVER</h1>
          <p className="text-2xl mb-6">
            {lostByTime
              ? "Time ran out! You couldn't escape in time..."
              : response?.data?.message || "You failed to escape the dungeon."}
          </p>
          <button
            onClick={handlePlayAgain}
            className="bg-white text-red-700 px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (isLoading && !response) {
    return (
      <div className="w-full max-w-4xl">
        <div className="h-96 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mb-6"></div>
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">
            Crafting Your Dungeon...
          </h1>
          <p className="text-gray-500 animate-pulse">
            The AI is creating your adventure...
          </p>
        </div>
      </div>
    );
  }

  // No Response Yet
  if (!response) {
    return (
      <div className="w-full max-w-4xl text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-4">No game data available.</p>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            ← Back to Start
          </button>
        </div>
      </div>
    );
  }

  // Active Game
  return (
    <div className="w-full max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Sidebar with Timer */}
        <div className="lg:col-span-1 space-y-4">
          <Timer />

          <button
            onClick={handlePlayAgain}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold"
          >
            🔄 Restart Game
          </button>
        </div>

        {/* Main Game Area */}
        <div className="lg:col-span-3 space-y-6">
          <SceneDisplay />
          <OptionWindow />
          <InputComp />
        </div>
      </div>
    </div>
  );
};
