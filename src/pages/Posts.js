import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import CreatePostModal from "../components/modals/CreatePostModal";
import { TbSquarePlus } from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";

import * as api from "../api";
import * as utils from "../utils";

import ThemeContext from "../components/ThemeContext";

export default function Posts({
  user,
  setUser,
  createPostModal,
  setCreatePostModal,
  notifications,
  setNotifications,
  posts,
  setPosts
}) {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await api.getPosts();
        const initializedPosts = fetchedPosts.map((post) => ({
          ...post,
          comments: post.comments || [],
        }));
        console.log(initializedPosts);
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
    <div className={`p-4 ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : ""}`}>
      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <FaSpinner className={`text-4xl animate-spin ${isDarkMode ? "text-yellow-400" : "text-yellow-500"}`} />
        </div>
      ) : (
        <div
          id="posts"
          className={`w-full p-[14px] animate-slide-up 
          ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : ""}`}
        >
          {filteredPosts.length > 0 ? (
            <PostList posts={filteredPosts} setPosts={setPosts} user={user} isDarkMode={isDarkMode} />
          ) : (
            <div className={`text-center ${isDarkMode ? "text-gray-400" : "text-zinc-500"}`}>
              <p>No posts found. Try searching for something else or create a new post!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
