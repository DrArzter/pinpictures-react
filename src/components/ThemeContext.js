import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({ isDarkMode: false, toggleTheme: () => {}, isMobile: false });

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isDarkModeStorage = localStorage.getItem("DarkTheme");
    console.log("isDarkMode", isDarkModeStorage);
    if (isDarkModeStorage == 1) {
      setIsDarkMode(!isDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("DarkTheme", isDarkMode ? 0 : 1);
    const isDarkModeStorage = localStorage.getItem("DarkTheme");
    console.log("isDarkMode", isDarkModeStorage);

  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isMobile, setIsMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 