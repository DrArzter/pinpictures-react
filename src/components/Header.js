import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { RiLoginBoxFill } from "react-icons/ri";
import { SlMagnifier } from "react-icons/sl";
import DropdownMenu from "./DropdownMenu";
import config from "../api/config";
import {Logo} from "../resources/Logo";
import ThemeContext from "./ThemeContext";
import ChangeTheme from "./ChangeTheme";

export default function Header({ user, createPostModal, setCreatePostModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCreatePostModal = () => {
    console.log("createPostModal", createPostModal);
    setCreatePostModal(!createPostModal);
  };

  return (
    <header
      className={`header py-3 px-8 shadow-lg justify-between items-center flex flex-row gap-4
      ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"}`}
    >
      <Link className="flex items-center gap-3" to="/">
        <Logo isDarkMode={isDarkMode} />
        <p className={`text-2xl py-2 hidden lg:block font-bold 
        ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>PinPictures</p>
      </Link>

      <div
        className={`flex items-center flex-grow max-w-xl mx-4 rounded-full hidden lg:flex 
        ${isDarkMode ? "bg-[#555] text-white" : "bg-[#D9D9D9] text-lightModeText"} shadow-sm`}
      >
        <input
          className={`w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 
          ${isDarkMode ? "bg-[#555] text-white" : "bg-[#D9D9D9] text-lightModeText"}`}
          placeholder="Search..."
        />
        <div
          id="search"
          className={`p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-[#D9D9D9] 
          ${isDarkMode ? "bg-[#777] hover:bg-[#555]" : "bg-[#ACACAC]"}`}
        >
          <SlMagnifier
            size={24}
            className={`transition-all duration-300 
            ${isDarkMode ? "fill-[#D9D9D9] hover:fill-white" : "fill-[#D9D9D9] hover:fill-black"}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <> 
            <div className="flex items-center gap-4 hidden lg:flex">
              <CiSquarePlus
                className="cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6 hover:scale-110 transition-transform duration-300"
                color={isDarkMode ? "#f2f2f2" : "#333333"}
                onClick={toggleCreatePostModal} 
              />
              <FaBell
                className="cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6 hover:scale-110 transition-transform duration-300"
                color={isDarkMode ? "#f2f2f2" : "#333333"} 
              />
              <Link to={`/Chats`}>
                <AiOutlineMessage
                  className="cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6 hover:scale-110 transition-transform duration-300"
                  color={isDarkMode ? "#f2f2f2" : "#333333"} 
                />
              </Link>
            </div>
            <div className="relative">
              <img
                src={user.picpath.startsWith("https://ui-avatars.com/") ? user.picpath : config.apiUrl.replace("/api", "/") + user.picpath}
                alt="Profile"
                loading="lazy"
                onClick={toggleDropdown}
                style={{ objectFit: "cover" }}
                className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              {isDropdownOpen && (
                <DropdownMenu
                  isDropdownOpen={isDropdownOpen}
                  user={user}
                  toggleDropdown={toggleDropdown}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <ChangeTheme />
            <Link to="/Authentification">
              <div className={`rounded-full p-3 flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-300 
              ${isDarkMode ? "bg-[#777]" : "bg-[#ACACAC]"}`}>
                <RiLoginBoxFill size={32} color="#fff" /> 
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}