import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { RiLoginBoxFill } from "react-icons/ri";
import { SlMagnifier } from "react-icons/sl";
import DropdownMenu from "./DropdownMenu";
import config from "../api/config";
import ThemeContext from "./ThemeContext";

export default function Header({ user, createPostModal, setCreatePostModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isDarkMode } = useContext(ThemeContext)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCreatePostModal = () => {
    console.log("createPostModal", createPostModal);
    setCreatePostModal(!createPostModal);
  };

  return (
    <header
      className={`header px-[32px] py-2 shadow-2xl flex justify-between items-center
      ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link className="flex items-center gap-2" to="/">
          <svg
            width="40px"
            height="40"
            className={`fill-lightModeText hover:fill-yellow-500 transition duration-300 
            ${isDarkMode ? "fill-darkModeText" : "fill-lightModeText"}`} 
            version="1.1"
            viewBox="0 0 1200 1200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="m1089.6 248.4-420-230.4c-43.199-24-94.801-24-138 0l-420 230.4c-46.801 25.203-75.602 73.203-75.602 126v451.2c0 52.801 28.801 100.8 74.398 126l420 230.4c21.602 12 45.602 18 69.602 18s48-6 69.602-18l420-230.4c45.602-25.199 74.398-73.199 74.398-126v-451.2c0-52.797-28.801-100.8-74.398-126zm26.398 577.2c0 34.801-19.199 67.199-50.398 84l-420 230.4c-28.801 15.602-63.602 15.602-92.398 0l-420-230.4c-31.199-16.801-49.199-49.199-49.199-84l-0.003906-451.2c0-34.801 19.199-67.199 49.199-84l420-230.4c14.398-8.3984 30-12 46.801-12s31.199 3.6016 45.602 12l420 230.4c31.199 16.801 50.398 49.199 50.398 84z" />
              <path d="m495.6 484.8h-60c-25.199 0-37.199 12-37.199 39.602v136.8c0 21.602 12 34.801 32.398 34.801 20.398 0 32.398-12 32.398-34.801v-33.602h33.602c50.398 0 90-15.602 90-72-1.1992-55.203-40.801-70.801-91.199-70.801zm3.5977 93.598h-36v-43.199h33.602c15.602 0 25.199 8.3984 25.199 21.602 0 14.398-12 21.598-22.801 21.598z" />
              <path d="m720 484.8h-60c-25.199 0-37.199 12-37.199 39.602v136.8c0 21.602 12 34.801 32.398 34.801 20.398 0 32.398-12 32.398-34.801v-33.602h32.402c50.398 0 90-15.602 90-72 0-55.203-39.602-70.801-90-70.801zm3.6016 93.598h-36v-43.199h32.398c15.602 0 25.199 8.3984 25.199 21.602 0 14.398-10.801 21.598-21.598 21.598z" />
            </g>
          </svg>
          <p className={`text-2xl py-2 hidden lg:block 
          ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>PinPictures</p>
        </Link>

        <div
          className={`flex items-center flex-grow max-w-xl mx-4 rounded-full hidden lg:flex 
          ${isDarkMode ? "bg-[#555]" : "bg-[#D9D9D9]"}`}
        >
          <input
            className={`w-full rounded-full px-4 py-2 focus:outline-none 
            ${isDarkMode ? "bg-[#555] text-white" : "bg-[#D9D9D9] text-lightModeText"}`}
            placeholder="Search..."
          />
          <div
            id="search"
            className={`bg-[#ACACAC] rounded-full hover:bg-[#D9D9D9] cursor-pointer overflow-hidden p-2 
            ${isDarkMode ? "bg-[#777] hover:bg-[#555]" : "bg-[#ACACAC] hover:bg-[#D9D9D9]"}`}
          >
            <SlMagnifier
              size={24}
              className={`transition duration-500 
              ${isDarkMode ? "fill-[#D9D9D9] hover:fill-white" : "fill-[#D9D9D9] hover:fill-black"}`}
            />
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 hidden lg:flex">
              <CiSquarePlus
                className="cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6"
                color={isDarkMode ? "#f2f2f2" : "#333333"}
                onClick={toggleCreatePostModal} 
              />
              <FaBell
                className="cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6"
                color={isDarkMode ? "#f2f2f2" : "#333333"} 
              />
              <Link to={`/Chats`}>
                <AiOutlineMessage
                  className="cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6"
                  color={isDarkMode ? "#f2f2f2" : "#333333"} 
                />
              </Link>
            </div>
            <img
              src={user.picpath.startsWith("https://ui-avatars.com/") ? user.picpath : config.apiUrl.replace("/api", "/") + user.picpath}
              alt="Profile"
              loading="lazy"
              onClick={toggleDropdown}
              style={{ objectFit: "cover" }}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            {isDropdownOpen && (
              <DropdownMenu
                isDropdownOpen={isDropdownOpen}
                user={user}
                toggleDropdown={toggleDropdown}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <Link to="/Authentification">
              <div className={`rounded-full bg-[#ACACAC] flex justify-center items-center p-2 
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