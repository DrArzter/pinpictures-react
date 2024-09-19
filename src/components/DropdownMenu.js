import React, { useEffect, useRef, useContext } from "react";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { CiBookmarkPlus } from "react-icons/ci";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import config from "../api/config";
import * as api from "../api/index";
import ThemeContext from "./ThemeContext";

export default function DropdownMenu({ isDropdownOpen, user, toggleDropdown }) {

  const dropdownRef = useRef(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown();
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout(); // Подождать завершения logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        toggleDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-[999] right-12 top-12 mt-6 w-56 rounded-md shadow-lg transition-transform transform ${
        isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      } ${isDarkMode ? "bg-darkModeBackground" : "bg-lightModeBackground"} transition-opacity duration-300 ease-in-out`}
    >
      <Link to = {`/profile/${user.name}`}>
        <img
          src={user.picpath.startsWith("https://ui-avatars.com/") ? user.picpath : config.apiUrl.replace("/api", "/") + user.picpath}
          alt="Profile"
          className="w-full h-24 object-cover rounded-t-md"
        />
      </Link>
      <div className={`p-4 flex flex-col gap-4 ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>
        <div className="flex flex-row items-center justify-between gap-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
            <div
              className={`relative w-16 h-8 rounded-full p-1 flex items-center transition-colors duration-300 ${
                isDarkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute w-7 h-7 rounded-full ${isDarkMode ? "bg-darkModeText" : "bg-lightModeText"} shadow-md transition-all duration-300 ease-in-out ${
                  isDarkMode ? "translate-x-8" : "translate-x-0"
                }`}
              >
                {isDarkMode ? (
                  <FaRegMoon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                ) : (
                  <FaSun className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Link to="/Settings">
              <FaGear className={`${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`} />
            </Link>
          </div>
        </div>

        {/* Bookmark Section */}
        <div className="flex items-center gap-2 cursor-pointer">
          <CiBookmarkPlus className={`${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`} />
          <span>Bookmark</span>
        </div>

        {/* Logout Section */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
          <RiLogoutBoxFill className={`${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
