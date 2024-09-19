import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({ isDarkMode: false, toggleTheme: () => {}, isMobile: false });

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isMobile, setIsMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 