import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useGame } from "../context/GameContext";

const InputComp = () => {
  const [input, setInput] = useState("");
  const { setIsLoading, isLoading, sessionId } = useGame();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userInput = input.trim();
    setInput("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/input`, {
        choice: userInput,
        sessionId: sessionId,
      });
      console.log("Backend acknowledged", res.data);
      setInput("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-['Press_Start_2P'] text-yellow-400 mb-3">
        OR TYPE YOUR COMMAND:
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="ENTER YOUR ACTION..."
          className="flex-1 px-4 py-3 rounded-lg border-4 border-gray-600 bg-black text-white font-['Press_Start_2P'] text-sm focus:outline-none focus:border-yellow-400 disabled:bg-gray-800 disabled:cursor-not-allowed placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="retro-btn bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3"
        >
          {isLoading ? "SENDING..." : "EXECUTE"}
        </button>
      </form>
    </div>
  );
};

export default InputComp;
