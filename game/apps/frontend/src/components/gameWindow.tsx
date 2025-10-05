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

  // Retro container styles
  const retroContainer =
    "max-w-3xl mx-auto bg-gray-800 border-4 border-gray-600 rounded-lg p-4 shadow-2xl scale-95";
  const retroText =
    "font-['Press_Start_2P'] text-green-400 text-sm leading-relaxed";
  const retroTitle =
    "font-['Press_Start_2P'] text-yellow-400 text-center mb-6 text-xl";

  if (gameStatus === "won") {
    return (
      <div className={retroContainer}>
        <div className="bg-green-900 border-4 border-green-600 rounded p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className={`${retroTitle} text-green-400`}>VICTORY ACHIEVED!</h1>
          <div
            className={`${retroText} bg-black p-4 rounded border-2 border-green-500 mb-4`}
          >
            {response?.data?.message ||
              "Congratulations! You escaped the dungeon!"}
          </div>
          <div className="bg-black p-3 rounded border-2 border-yellow-500 inline-block mb-6">
            <p className="text-yellow-400 text-xs font-['Press_Start_2P']">
              TIME REMAINING: {Math.floor(timeRemaining / 60)}:
              {(timeRemaining % 60).toString().padStart(2, "0")}
            </p>
          </div>
          <br />
          <button
            onClick={handlePlayAgain}
            className="retro-btn bg-green-600 hover:bg-green-700 text-white"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  if (gameStatus === "lost") {
    const lostByTime = timeRemaining === 0;
    return (
      <div className={retroContainer}>
        <div className="bg-red-900 border-4 border-red-600 rounded p-8 text-center">
          <div className="text-4xl mb-4">💀</div>
          <h1 className={`${retroTitle} text-red-400`}>GAME OVER</h1>
          <div
            className={`${retroText} bg-black p-4 rounded border-2 border-red-500 mb-6`}
          >
            {lostByTime
              ? "TIME EXPIRED! YOU FAILED TO ESCAPE!"
              : response?.data?.message || "YOU HAVE BEEN DEFEATED!"}
          </div>
          <button
            onClick={handlePlayAgain}
            className="retro-btn bg-red-600 hover:bg-red-700 text-white"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (isLoading && !response) {
    return (
      <div className={retroContainer}>
        <div className="h-96 flex flex-col justify-center items-center">
          <div className="animate-pulse text-green-400 text-4xl mb-4">⌛</div>
          <h1 className={`${retroTitle} text-green-400`}>LOADING DUNGEON...</h1>
          <p className="text-green-500 text-xs font-['Press_Start_2P'] animate-pulse">
            INITIALIZING ADVENTURE...
          </p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className={retroContainer}>
        <div className="text-center p-8">
          <p className="text-red-400 text-sm font-['Press_Start_2P'] mb-4">
            NO GAME DATA DETECTED
          </p>
          <button
            onClick={() => navigate("/home")}
            className="retro-btn bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← RETURN TO START
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 scale-95">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar with Timer */}
        <div className="lg:col-span-1 space-y-3">
          <Timer />
          <button
            onClick={handlePlayAgain}
            className="retro-btn w-full bg-gray-700 hover:bg-gray-800 text-white text-xs py-2"
          >
            🔄 RESTART
          </button>
        </div>

        {/* Main Game Area */}
        <div className="lg:col-span-3 space-y-4">
          <SceneDisplay />
          <OptionWindow />
          <InputComp />
        </div>
      </div>
    </div>
  );
};
