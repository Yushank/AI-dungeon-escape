import React from "react";
import { Cards } from "./cards";
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
      <h3 className="text-xl font-['Press_Start_2P'] text-yellow-400 text-sm">
        CHOOSE YOUR ACTION:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        {/* Changed to grid for better control */}
        {options.map((option: string, index: number) => (
          <Cards key={index} text={option} index={index} />
        ))}
      </div>
    </div>
  );
};
