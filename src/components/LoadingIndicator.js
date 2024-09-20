import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function LoadingIndicator({ isDarkMode }) {
  return (
    <div className="flex justify-center items-center w-full h-64">
      <FaSpinner
        className={`text-4xl animate-spin ${
          isDarkMode ? "text-yellow-400" : "text-yellow-500"
        }`}
      />
    </div>
  );
}