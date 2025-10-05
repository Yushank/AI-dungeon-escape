import React from "react";
import { SceneDisplay } from "./sceneDisplay";
import { Cards } from "./cards";
import InputComp from "./inputComp";

export const GameWindow = () => {
  return (
    <div>
      <div>
        <SceneDisplay />
      </div>
      <div>
        <Cards />
      </div>
      <div>
        <InputComp />
      </div>
    </div>
  );
};
