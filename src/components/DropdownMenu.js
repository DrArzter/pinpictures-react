import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999] focus:outline-none ${
        isDropdownOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {getFilteredLinks(headerLinks).map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={toggleDropdown}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
