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
  }, []);

  useEffect(() => {
    const filtered = utils.searchChats(chatList, searchTerm);
    setFilteredChatList(filtered);
  }, [searchTerm, chatList]);

  const sortChats = (chats) => {
    switch (sortBy) {
      case "name":
        return chats.sort((a, b) =>
          a.users[0].name.localeCompare(b.users[0].name)
        );
      case "rating":
        // Assuming rating is a field in your chat object
        return chats.sort((a, b) => b.rating - a.rating);
      default:
        return chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg">
        <div className="flex flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search by name or type..."
            className="px-4 py-2 w-full rounded-md border border-gray-300 text-zinc-700 focus:outline-none"
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
            className="bg-zinc-700 px-4 rounded-md"
          >
            <option value="">Sort by...</option>
            <option value="id">Time added</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : filteredChatList && filteredChatList.length > 0 ? (
        <div className="w-full lg:w-3/4 mt-4 bg-zinc-800 p-6 rounded-lg">
          <ul className="divide-y divide-gray-700">
            {sortChats(filteredChatList).map((chat) => {
              const secondUser = chat.users.find((u) => u.name !== user.name);
              return (
                <li key={chat.chatId}>
                  <Link
                    to={`/Chat/${chat.chatId}`}
                    className="flex items-center justify-between p-4 hover:bg-zinc-700"
                  >
                    <div className="flex items-center">
                      <img
                        src={secondUser.picpath.startsWith("https://ui-avatars.com/") ? secondUser.picpath : utils.config.apiUrl.replace('/api', '/') + secondUser.picpath}
                        alt="Profile Picture"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-bold">{secondUser.name}</h2>
                        <p className="text-gray-500">{chat.lastMessage}</p>
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
          <h1 className="text-2xl font-bold mb-4 text-center">No chats yet</h1>
        </div>
      )}
    </div>
  );
}
