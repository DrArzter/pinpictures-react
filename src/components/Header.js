import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { RiLoginBoxFill } from "react-icons/ri";
import { SlMagnifier } from "react-icons/sl";
import DropdownMenu from "./DropdownMenu";
import config from "../api/config";

export default function Header({ user, isDarkMode, setIsDarkMode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`header px-[32px] relative shadow-2xl flex flex-row justify-between gap-[30px] ${isDarkMode ? "bg-[#333] text-white" : "bg-white text-[#4E4949]"}`}>
      <Link to="/">
        <p className="text-[32px] py-[9px]">PinPictures</p>
      </Link>
      <div className={`flex flex-row justify-between items-center pr-[8px] rounded-[66px] my-[6px] w-full ${isDarkMode ? "bg-[#555]" : "bg-[#D9D9D9]"}`}>
        <input className={`w-full rounded-[66px] px-4 h-full focus:outline-none ${isDarkMode ? "bg-[#555] text-white" : "bg-[#D9D9D9]"}`}></input>
        <div id="search" className="bg-[#ACACAC] rounded-full hover:bg-[#D9D9D9] hover:cursor-pointer overflow-hidden">
          <SlMagnifier size={24} className="transition duration-500 ml-[6px] mt-[6px] fill-[#D9D9D9] hover:fill-black" />
        </div>
      </div>
      {user ? (
        <div className="flex flex-row items-center gap-[20px]">
          
          <CiSquarePlus size={42} color="#767676" />
          <FaBell size={32} color="#767676" />
          <AiOutlineMessage size={42} color="#767676" />
          <img
            src={user.picpath.startsWith("https://ui-avatars.com/") ? user.picpath : config.apiUrl.replace("/api", "/") + user.picpath}
            alt="Profile Picture"
            loading="lazy"
            onClick={toggleDropdown}
            style={{ objectFit: "cover" }}
            className="w-12 h-12 rounded-full cursor-pointer"
          />
          {isDropdownOpen && <DropdownMenu isDropdownOpen={isDropdownOpen} user={user} toggleDropdown={toggleDropdown} toggleTheme={toggleTheme} />}
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <Link to="/Authentification">
            <div className="rounded-full bg-[#ACACAC] flex justify-center items-center p-[6px]">
              <RiLoginBoxFill size={32} color="#ffff" />
            </div>
          </Link>
        </div>
      )}
    </header>
  );
}
