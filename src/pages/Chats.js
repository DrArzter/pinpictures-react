import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as utils from "../utils";


export default function Chats({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChatList, setFilteredChatList] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [isLoading, setIsLoading] = useState(false);

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  };

  const handleSearchByChange = (newValue) => {
    setSearchTerm(newValue);
  };

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      const response = await utils.getChats();
      if (response) {
        setFilteredChatList(response);
      }
      setIsLoading(false);
    }
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg">
        <div className="flex flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search by name or type..."
            className="px-4 py-2 w-full rounded-md border border-gray-300 text-zinc-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => handleSearchByChange(e.target.value)}
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
            {filteredChatList
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((chat) => (
                <li key={chat.id}>
                  <Link
                    to={`/Chat/${chat.id}`}
                    className="flex items-center justify-between p-4 hover:bg-zinc-700"
                  >
                    <div className="flex items-center">
                      <img
                        src={chat.picpath}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h2 className="text-lg font-bold">{chat.name}</h2>
                        <p className="text-gray-500">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="w-full lg:w-3/4 mt-4 bg-zinc-800 p-6 rounded-lg items-center">
          <h1 className="text-2xl font-bold mb-4 text-center">
            No chats yet
          </h1>
        </div>
      )}
    </div>
  );
}
