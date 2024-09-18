import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import CreatePostModal from "../components/modals/CreatePostModal";
import { TbSquarePlus } from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";

import * as api from "../api";
import * as utils from "../utils";

export default function Posts({
  user,
  setUser,
  createPostModal,
  setCreatePostModal,
  notifications,
  setNotifications
}) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await api.getPosts();
        const initializedPosts = fetchedPosts.map((post) => ({
          ...post,
          comments: post.comments || [],
        }));
        setPosts(initializedPosts);
        setFilteredPosts(initializedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts();
  }, []);

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    if (newSortBy === sortBy) {
      return;
    }
    setSortBy(newSortBy);
    utils.sortPosts(newSortBy, posts, setPosts);
    utils.sortPosts(newSortBy, filteredPosts, setFilteredPosts);
  };

  const handleSearchClick = () => {
    api.searchPost(posts, setFilteredPosts, searchTerm);
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    // Generate suggestions based on input
    if (newValue.length > 2) {
      const newSuggestions = posts
        .filter((post) =>
          post.name.toLowerCase().includes(newValue.toLowerCase())
        )
        .map((post) => post.name);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const toggleCreatePostModal = () => {
    setCreatePostModal(!createPostModal);
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      {createPostModal && (
        <CreatePostModal
          setCreatePostModal={setCreatePostModal}
          posts={posts}
          setPosts={setPosts}
          filteredPosts={filteredPosts}
          setFilteredPosts={setFilteredPosts}
          user={user}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}

      <div className="w-full lg:w-3/4 flex flex-row gap-4 bg-zinc-800 p-6 rounded-lg shadow-lg mb-4 animate-fade-in">
        {user && (
          <button
            className="focus:outline-none hover:text-yellow-500 transition duration-300"
            onClick={toggleCreatePostModal}>
            <TbSquarePlus size={46} className="hover:scale-110 transform transition-all duration-300" />
          </button>
        )}

        <div className="relative flex items-center w-full">
          <input
            type="text"
            placeholder="Search by name or type..."
            className="px-4 py-2 w-full rounded-l-md text-zinc-700 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="bg-zinc-700 h-10 px-4 rounded-r-md focus:outline-none hover:text-yellow-500 transition duration-300"
            onClick={handleSearchClick}>
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 bg-white text-black w-full rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-zinc-300 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setSuggestions([]);
                    handleSearchClick();
                  }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="bg-zinc-700 px-4 self-center h-10 rounded-md focus:outline-none hover:text-yellow-500 transition duration-300 focus:text-yellow-500">
          <option value="">Sort by...</option>
          <option value="id">Time added</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <FaSpinner className="text-yellow-500 text-4xl animate-spin" />
        </div>
      ) : (
        <div
          id="posts"
          className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg flex flex-col justify-between shadow-lg animate-slide-up">
          {filteredPosts.length > 0 ? (
            <PostList posts={filteredPosts} setPosts={setPosts} user={user} />
          ) : (
            <div className="text-center text-zinc-500">
              <p>No posts found. Try searching for something else or create a new post!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
