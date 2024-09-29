import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { FaBell } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { RiLoginBoxFill } from "react-icons/ri";
import { SlMagnifier } from "react-icons/sl";

import DropdownMenu from "./DropdownMenu";
import ThemeContext from "./ThemeContext";
import ChangeTheme from "./ChangeTheme";

import config from "../api/config";
import { Logo } from "../resources/Logo";

export default function Header({ user, createPostModal, setCreatePostModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleCreatePostModal = () => setCreatePostModal(!createPostModal);

  const headerClassName = "header py-3 px-8 shadow-lg justify-between items-center flex flex-row gap-4 transition-colors duration-300";

  const logoTextClassName = "text-2xl py-2 hidden lg:block font-bold";

  const searchBarClassName = `flex items-center flex-grow max-w-xl mx-4 rounded-full hidden lg:flex transition-colors ${
    isDarkMode ? "bg-[#555] text-white" : "bg-[#D9D9D9]"
  } shadow-sm`;

  const searchInputClassName = `w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
    isDarkMode ? "bg-[#555]" : "bg-[#D9D9D9]"
  }`;

  const searchIconContainerClassName = `p-2 rounded-full cursor-pointer hover:bg-[#D9D9D9] transition-colors ${
    isDarkMode ? "bg-[#777]" : "bg-[#ACACAC]"
  }`;

  const iconClassName = "cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6 hover:scale-110 transition-transform duration-300";

  const loginButtonClassName = `rounded-full p-3 flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-300 ${
    isDarkMode ? "bg-[#777]" : "bg-[#ACACAC]"
  }`;

  return (
    <header className={headerClassName}>
      <Link className="flex items-center gap-3" to="/">
        <Logo isDarkMode={isDarkMode} />
        <p className={logoTextClassName}>PinPictures</p>
      </Link>

      <div className={searchBarClassName}>
        <input className={searchInputClassName} placeholder="Search..." />
        <div className={searchIconContainerClassName}>
          <SlMagnifier size={24} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-4 hidden lg:flex">
              <CiSquarePlus className={iconClassName} onClick={toggleCreatePostModal} />
              <FaBell className={iconClassName} />
              <Link to={`/Chats`}>
                <AiOutlineMessage className={iconClassName} />
              </Link>
            </div>
            <div className="relative">
              <img
                src={
                  user.picpath.startsWith("https://ui-avatars.com/")
                    ? user.picpath
                    : config.apiUrl.replace("/api", "/") + user.picpath
                }
                alt="Profile"
                loading="lazy"
                onClick={toggleDropdown}
                style={{ objectFit: "cover" }}
                className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              {isDropdownOpen && (
                <DropdownMenu isDropdownOpen={isDropdownOpen} user={user} toggleDropdown={toggleDropdown} />
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <ChangeTheme />
            <Link to="/Authentification">
              <div className={loginButtonClassName}>
                <RiLoginBoxFill size={32} color="#fff" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
