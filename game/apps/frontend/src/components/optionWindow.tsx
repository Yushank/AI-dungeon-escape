import React from "react";
import { Cards } from "./cards";
// import { useResponse } from "../hooks";
import { useGame } from "../context/GameContext";

export const OptionWindow = () => {
  const { response, setIsLoading } = useGame();

  if (!response || !response.data || !response.data.options) {
    return null;
  }

  const optionA = response.data.options[0];
  const optionB = response.data.options[1];
  console.log("optionA:", optionA);
  console.log("optionB:", optionB);
  return (
    <div className="p-6 flex">
      <Cards text={optionA} />
      <Cards text={optionB} />
    </div>
  );
};
