import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useGame } from "../context/GameContext";

const InputComp = () => {
  const [input, setInput] = useState("");
  const { setIsLoading, isLoading } = useGame();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userInput = input.trim();
    setInput("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/input`, {
        choice: userInput,
      });
      console.log("Backend acknowledged", res.data);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Or type your own action:
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Type your action or question..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default InputComp;
