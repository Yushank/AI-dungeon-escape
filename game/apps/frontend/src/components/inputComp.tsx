import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const InputComp = () => {
  const [input, setInput] = useState("");

  async function handleSubmit() {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/input`, {
        prompt: input,
      });
      console.log("Backend acknowledged", res.data);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex max-w-xl mx-auto p-4 gap-2">
      <div>
        <input
          className="flex-1 p-4 border border-gray-300 rounded-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what game you want"
        ></input>
      </div>
      <button
        className="bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-semibold py-2 px-2 border border-blue-500"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default InputComp;
