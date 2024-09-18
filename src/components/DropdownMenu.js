import React, { useEffect, useRef } from "react";
import { FaRegMoon, FaGear } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { CiBookmarkPlus } from "react-icons/ci";

export default function DropdownMenu({ isDropdownOpen, user, toggleDropdown, toggleTheme }) {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown();
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
      className={`absolute right-12 top-12 mt-2 w-48 rounded-md shadow-lg transition-transform transform ${isDropdownOpen ? "scale-100" : "scale-95 opacity-0"} bg-white dark:bg-[#333] dark:text-white`}
    >
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
          <FaRegMoon className="dark:text-white" />
          <MdOutlineWbSunny className="dark:text-white" />
        </div>
        <div className="flex items-center gap-2">
          <FaGear />
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-2">
          <CiBookmarkPlus />
          <span>Bookmark</span>
        </div>
      </div>
    </div>
  );
}
