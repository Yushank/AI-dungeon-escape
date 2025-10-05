import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Start = () => {
  const navigate = useNavigate();

  async function sendInitialPrompt() {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/input`, {
        prompt: "lets go",
      });
      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        className="rounded-lg px-6 py-4 bg-gray-800 hover:bg-gray-900 text-white"
        onClick={sendInitialPrompt}
      >
        Start
      </button>
    </div>
  );
};
