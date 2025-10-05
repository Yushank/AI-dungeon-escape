import React from "react";
import { SceneDisplay } from "./sceneDisplay";
import { OptionWindow } from "./optionWindow";
import InputComp from "./inputComp";
// import { useResponse } from "../hooks";
import { useGame } from "../context/GameContext";

export const GameWindow = () => {
  const { isLoading, response } = useGame();

  return (
    <div className="w-full max-w-4xl">
      {isLoading ? (
        <div className="h-96 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">
            Loading your adventure...
          </h1>
          <p className="text-gray-500 mt-2">The AI is crafting your story...</p>
        </div>
      ) : response ? (
        <div className="space-y-6">
          <SceneDisplay />
          <OptionWindow />
          <InputComp />
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>No game data available. Please start a new game.</p>
          <button
            onClick={() => (window.location.href = "/home")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};
