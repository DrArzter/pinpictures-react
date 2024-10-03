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
  const { isDarkMode } = useContext(ThemeContext);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown();
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Error during logout:", error);
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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen, toggleDropdown]);

  const dropdownClassName = `absolute z-[999] right-0 top-16 lg:w-[10vw] w-32 rounded-md shadow-lg transform transition-all duration-300 ease-in-out 
    ${isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"} 
    ${isDarkMode ? "bg-darkModeBackground" : "bg-lightModeBackground"} 
    transition-transform transition-opacity`;

  const menuItemsClassName = `p-4 flex flex-col gap-4 w-[50%]
    ${isDarkMode ? "text-darkModeText" : "text-lightModeText"} 
    transition-colors`;

  const iconClassName = isDarkMode ? "text-darkModeText" : "text-lightModeText";

  return (
    <div ref={dropdownRef} className={dropdownClassName}>
      <Link to={`/profile/${user.name}`}>
        <img
          src={
            user.picpath.startsWith("https://ui-avatars.com/")
              ? user.picpath
              : `${config.apiUrl.replace("/api", "/")}${user.picpath}`
          }
          alt="Profile"
          className="w-full h-24 object-cover rounded-t-md hover-transform cursor-pointer"
        />
      </Link>

      <div className={menuItemsClassName}>
        <div className="flex items-center justify-between gap-4">
          <ChangeTheme />
          <Link to="/Settings" className="cursor-pointer hover-transform">
            <FaGear className={iconClassName} />
          </Link>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover-transform">
          <CiBookmarkPlus className={iconClassName} />
          <span>Bookmark</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer hover-transform"
          onClick={handleLogout}
        >
          <RiLogoutBoxFill className={iconClassName} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
