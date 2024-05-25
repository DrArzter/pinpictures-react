import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as utils from "../utils";

export default function Chats({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatList, setChatList] = useState([]);
  const [filteredChatList, setFilteredChatList] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [isLoading, setIsLoading] = useState(false);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchByChange = (newValue) => {
    setSearchTerm(newValue);
  };

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      setIsLoading(true);
      try {
        const response = await utils.getChats();
        if (response) {
          setChatList(response);
          setFilteredChatList(response);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
      setIsLoading(false);
    };
    fetchChats();
  }, [user]);

  useEffect(() => {
    if (chatList.length > 0) {
      const filtered = utils.searchChats(chatList, searchTerm);
      setFilteredChatList(filtered);
    }
  }, [searchTerm, chatList]);

  useEffect(() => {
    if (filteredChatList.length > 0) {
      utils.sortChats(sortBy, filteredChatList, setFilteredChatList);
    }
  }, [sortBy]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto p-4 min-h-screen">
      <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg shadow-md mb-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search by name or type..."
            className="px-4 py-2 w-full sm:w-2/3 rounded-md border border-gray-300 text-zinc-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchTerm(newValue);
              handleSearchByChange(newValue);
            }}
          />
          <select
            value={sortBy}
            onChange={handleSortByChange}
            className="bg-zinc-700 px-4 py-2 rounded-md text-white focus:outline-none"
          >
            <option value="id">Sort by: Time added</option>
            <option value="name">Sort by: Name</option>
            <option value="rating">Sort by: Rating</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full lg:w-3/4 mt-4 bg-zinc-800 p-6 rounded-lg"></div>
      ) : filteredChatList && filteredChatList.length > 0 ? (
        <div className="w-full lg:w-3/4 mt-4 bg-zinc-800 p-6 rounded-lg">
          <ul className="divide-y divide-gray-700">
            {filteredChatList.map((chat) => {
              const secondUser = chat.users.find((u) => u.name !== user.name);
              return (
                <li key={chat.chatId}>
                  <Link
                    to={`/Chat/${chat.chatId}`}
                    className="flex items-center justify-between p-4 hover:bg-zinc-700 rounded-lg transition"
                  >
                    <div className="flex items-center">
                      <img
                        src={secondUser.picpath.startsWith("https://ui-avatars.com/") ? secondUser.picpath : utils.config.apiUrl.replace('/api', '/') + secondUser.picpath}
                        alt="Profile Picture"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-bold text-white">{secondUser.name}</h2>
                        <p className="text-gray-400">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="w-full lg:w-3/4 mt-4 bg-zinc-800 p-6 rounded-lg items-center">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">No chats yet</h1>
        </div>
      )}
    </div>
  );
}
