import React from "react";

export const Cards = ({ text }: { text: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer flex-1">
      <p className="text-gray-800 font-medium text-center">{text}</p>
    </div>
  );
};
