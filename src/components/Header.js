import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaBell } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { RiLoginBoxFill } from "react-icons/ri";

import DropdownMenu from "./DropdownMenu";
import ThemeContext from "./ThemeContext";
import ChangeTheme from "./ChangeTheme";
import SearchBar from "./SearchBar";

import config from "../api/config";
import { Logo } from "../resources/Logo";

export default function Header({ user, setUser, createPostModal, setCreatePostModal, socket, socketEvent, socketState, notifications, setNotifications }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleCreatePostModal = () => setCreatePostModal(!createPostModal);

  useEffect(() => {
    if (!socketEvent || !socketEvent.message) return;
    if (socketEvent.type === "newMessage" && window.location.pathname !== "/chats" && socketEvent.message.userid != user.id) {
      const notificationSound = new Audio('https://storage.yandexcloud.net/pinpictures/sounds/notification.wav');
      notificationSound.play().catch(err => console.error("Error playing sound:", err));

      setNotifications((prevNotifications) => [...prevNotifications, { status: "info", message: `New message from ${socketEvent.message.senderName}`, clickable: true, link_to: `/chats/${socketEvent.message.chatid}`, time: 5000 }]);
    }
  }, [socketEvent]);

  const headerClassName = "header py-3 px-8 shadow-lg justify-between items-center flex flex-row gap-4 transition-colors duration-300";
  const logoTextClassName = "text-2xl py-2 hidden lg:block font-bold hover-transform";
  const iconClassName = "cursor-pointer lg:h-8 lg:w-8 md:h-6 md:w-6 hover-transform";
  const loginButtonClassName = `rounded-full p-3 flex justify-center items-center cursor-pointer hover-transform ${
    isDarkMode ? "bg-[#777]" : "bg-[#ACACAC]"
  }`;

  return (
    <header className={headerClassName}>
      <Link className="flex items-center gap-3" to="/">
        <Logo isDarkMode={isDarkMode} />
        <p className={logoTextClassName}>PinPictures</p>
      </Link>

      <SearchBar />

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-4 hidden lg:flex">
              <CiSquarePlus className={iconClassName} onClick={toggleCreatePostModal} />
              <FaBell className={iconClassName} />
              <Link to={`/chats`}>
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
                className="w-10 h-10 rounded-full cursor-pointer hover-transform"
              />
              {isDropdownOpen && (
                <DropdownMenu isDropdownOpen={isDropdownOpen} user={user} setUser={setUser} toggleDropdown={toggleDropdown} />
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
