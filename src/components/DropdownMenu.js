import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignInAlt, FaSignOutAlt, FaCog } from "react-icons/fa";

export default function DropdownMenu({
  isDropdownOpen,
  headerLinks,
  user,
  toggleDropdown,
}) {
  const dropdownRef = useRef(null);

  function getFilteredLinks(links) {
    return links.filter((link) => {
      if (user) {
        return link.name !== "Authentication";
      } else {
        return link.name !== "Profile";
      }
    });
  }

  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown();
    }
  }

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

  const iconMapping = {
    Profile: <FaUser className="mr-2" />,
    Authentication: user ? <FaSignOutAlt className="mr-2" /> : <FaSignInAlt className="mr-2" />,
    Settings: <FaCog className="mr-2" />,
  };



  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 mt-12 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999] transform transition-all duration-300 ease-in-out ${
        isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="py-2"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {getFilteredLinks(headerLinks).map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center px-4 py-2 text-sm text-zinc-700 hover:bg-gradient-to-r from-zinc-100 to-zinc-200 hover:text-zinc-900 transition-colors duration-150"
            role="menuitem"
            onClick={toggleDropdown}
          >
            {iconMapping[link.name] || <span className="mr-2">•</span>}
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
