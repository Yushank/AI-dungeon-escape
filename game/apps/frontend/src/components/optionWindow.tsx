import React from "react";
import { Cards } from "./cards";
// import { useResponse } from "../hooks";
import { useGame } from "../context/GameContext";

export const OptionWindow = () => {
  const { response } = useGame();

  if (!response || !response.data || !response.data.options) {
    return null;
  }

  const options = response.data.options;
  console.log("Options available:", options);

  if (options.length < 2) {
    console.warn("Not enough options provided by AI");
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Choose Your Action:</h3>
      <div className="flex gap-4">
        {options.map((option: string, index: number) => (
          <Cards key={index} text={option} index={index} />
        ))}
      </div>
    </div>
  );
};
