import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingIndicator from "../components/LoadingIndicator";

import ChatList from "../components/ChatList";
import Chat from "../components/Chat";

import config from "../api/config";

import * as api from "../api";
import * as utils from "../utils";
import SearchBar from "../components/SearchBar";

const chatsContainerStyle = `flex mx-auto h-[80vh] flex-row w-3/4 p-6 gap-4 rounded-lg flex flex-row  mt-8`;

const chatListContainerStyle = `w-1/4 p-6 bg-zinc-800 rounded-lg`;

const chatContainerStyle = `w-3/4 p-6 bg-zinc-800 rounded-lg`;

const searchInputClassName = `w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lightModeText`;

export default function Chats({ user }) {
  const [chats, setChats] = useState([]);
  const [searchChats, setSearchChats] = useState([chats]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getProfilePicPath = (picpath) =>
    picpath.startsWith("https://ui-avatars.com/")
      ? picpath
      : `${config.apiUrl.replace("/api", "/")}${picpath}`;



  return (
    <div className="w-full">
      <div className={chatsContainerStyle}>
        <div className={chatListContainerStyle}>

          <input className={searchInputClassName}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..." />
          <ChatList />
        </div>
        <div className={chatContainerStyle}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <Chat />
          )}
        </div>
      </div>
    </div>

  );
}