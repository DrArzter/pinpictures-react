import React, { useContext } from "react";

import { FaRegMoon, FaSun } from "react-icons/fa";

import ThemeContext from "./ThemeContext";

export default function ChangeTheme() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const containerClassName = `relative w-16 h-8 rounded-full p-1 flex items-center transition-colors duration-300 ${
    isDarkMode ? "bg-darkModeSecondaryBackground" : "bg-lightModeSecondaryBackground"
  }`;

  const toggleClassName = `absolute w-7 h-7 rounded-full shadow-md transition-all duration-300 ease-in-out ${
    isDarkMode ? "translate-x-8 bg-darkModeText" : "translate-x-0 bg-lightModeText"
  }`;

  const iconClassName = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500";


  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
      <div className={containerClassName}>
        <div className={toggleClassName}>
          {isDarkMode ? (
            <FaRegMoon className={iconClassName} />
          ) : (
            <FaSun className={iconClassName} />
          )}
        </div>
      </div>
    </div>
  );
}