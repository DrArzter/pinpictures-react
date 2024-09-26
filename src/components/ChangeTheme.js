import React, { useContext } from "react";
import { FaRegMoon, FaSun } from "react-icons/fa";
import ThemeContext from "./ThemeContext";

export default function ChangeTheme() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
      <div
        className={`relative w-16 h-8 rounded-full p-1 flex items-center transition-colors duration-300 ${
          isDarkMode ? "bg-darkModeSecondaryBackground" : "bg-lightModeSecondaryBackground"
        }`}
      >
        <div
          className={`absolute w-7 h-7 rounded-full shadow-md transition-all duration-300 ease-in-out ${
            isDarkMode ? "translate-x-8 bg-darkModeText" : "translate-x-0 bg-lightModeText"
          }`}
        >
          {isDarkMode ? (
            <FaRegMoon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500" />
          ) : (
            <FaSun className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500" />
          )}
        </div>
      </div>
    </div>
  );
}
