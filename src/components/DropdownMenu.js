import React, { useEffect, useRef, useContext } from "react";
import { FaGear } from "react-icons/fa6";
import { CiBookmarkPlus } from "react-icons/ci";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import config from "../api/config";
import * as api from "../api/index";

import ChangeTheme from "./ChangeTheme";
import ThemeContext from "./ThemeContext";

export default function DropdownMenu({ isDropdownOpen, user, toggleDropdown }) {

  const dropdownRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext); // You don't need to bring `toggleTheme` here if you're not using it.

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown();
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
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

    // Add event listeners only when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    // Clean up event listeners when the component is unmounted or the dropdown is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen, toggleDropdown]);  // Make sure to add `toggleDropdown` to the dependency array

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-[999] right-12 top-12 mt-6 w-56 rounded-md shadow-lg transform transition-all duration-300 ease-in-out ${
        isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      } ${isDarkMode ? "bg-darkModeBackground" : "bg-lightModeBackground"} `}
    >
      <Link to={`/profile/${user.name}`}>
        <img
          src={user.picpath.startsWith("https://ui-avatars.com/") ? user.picpath : `${config.apiUrl.replace("/api", "/")}${user.picpath}`}
          alt="Profile"
          className="w-full h-24 object-cover rounded-t-md"
        />
      </Link>
      <div className={`p-4 flex flex-col gap-4 ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>
        <div className="flex items-center justify-between gap-4">
          <ChangeTheme />
          <Link to="/Settings" className="cursor-pointer hover:text-yellow-500">
            <FaGear className={isDarkMode ? "text-darkModeText" : "text-lightModeText"} />
          </Link>
        </div>

        {/* Bookmark Section */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500">
          <CiBookmarkPlus className={isDarkMode ? "text-darkModeText" : "text-lightModeText"} />
          <span>Bookmark</span>
        </div>

        {/* Logout Section */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500" onClick={handleLogout}>
          <RiLogoutBoxFill className={isDarkMode ? "text-darkModeText" : "text-lightModeText"} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
