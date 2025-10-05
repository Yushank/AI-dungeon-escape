import React from "react";
// import { useResponse } from "../hooks";
import { useGame } from "../context/GameContext";

export const SceneDisplay = () => {
  const { response } = useGame();
  console.log("response from context:", response);

  if (!response || !response.data || !response.data.scene) {
    return (
      <div className="bg-gray-900 min-h-[300px] rounded-lg border-2 border-gray-700 p-6 flex items-center justify-center">
        <p className="text-gray-500">Waiting for scene data...</p>
      </div>
    );
  }
  return (
    <div className="bg-gray-900 min-h-[300px] rounded-lg border-2 border-gray-700 p-6">
      <div className="text-white text-lg leading-relaxed">
        {response.data.scene}
      </div>
    </div>
  );
};
