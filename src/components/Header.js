import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import config from '../utils/config';

import { TbMessages } from "react-icons/tb";

export default function Header({ user, headerLinks }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Переключение состояния выпадающего меню
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header p-4 rounded-2xl relative">
      <div className="header__logo text-3xl font-bold flex flex-row justify-between lg:mx-auto items-center lg:w-3/4">
        <Link to="/" className="header__logo ml-4 text-3xl font-bold flex flex-row gap-2">
          <svg
            width="40px"
            height="40"
            className="fill-zinc-300 hover:fill-yellow-500 transition duration-300"
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
          <h1 className="text-3xl font-bold hidden md:block hover:text-yellow-500 transition duration-300">PinPictures</h1>
        </Link>
        {user && (
          <div className="flex flex-row gap-4 ml-auto">
            <Link to="./Chats" className="header__link">
              <TbMessages size={36} className="hover:text-yellow-500 transition duration-300" />
            </Link>
          </div>
        )}
        <div className="header__login ml-4 flex flex-row relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="btn btn--primary inline-flex items-center"
          >
            {user ? (
              <>
                <span className="mr-2 hidden md:block hover:text-yellow-500 transition duration-300">{user.name}</span>
                <img
                  src={user.picpath.startsWith("https://ui-avatars.com/") ? user.picpath : config.apiUrl.replace('/api', '/') + user.picpath}
                  alt="Profile Picture"
                  style={{ objectFit: "cover" }}
                  className="w-8 h-8 rounded-full"
                />
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
              >
                <path
                  d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z"
                  stroke="#d4d4d8"
                />
                <path
                  d="M8 13.15C8.63513 13.15 9.15 12.6351 9.15 12C9.15 11.3649 8.63513 10.85 8 10.85C7.36487 10.85 6.85 11.3649 6.85 12C6.85 12.6351 7.36487 13.15 8 13.15Z"
                  fill="#d4d4d8"
                  stroke="#d4d4d8"
                />
                <path
                  d="M16 13.15C16.6351 13.15 17.15 12.6351 17.15 12C17.15 11.3649 16.6351 10.85 16 10.85C15.3649 10.85 14.85 11.3649 14.85 12C14.85 12.6351 15.3649 13.15 16 13.15Z"
                  fill="#d4d4d8"
                  stroke="#d4d4d8"
                />
                <path
                  d="M12 13.15C12.6351 13.15 13.15 12.6351 13.15 12C13.15 11.3649 12.6351 10.85 12 10.85C11.3649 10.85 10.85 11.3649 10.85 12C10.85 12.6351 11.3649 13.15 12 13.15Z"
                  fill="#d4d4d8"
                  stroke="#d4d4d8"
                />
              </svg>
            )}
          </button>
          {isDropdownOpen && (
            <DropdownMenu
              headerLinks={headerLinks}
              user={user}
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
            />
          )}
        </div>
      </div>
    </header>
  );
}
