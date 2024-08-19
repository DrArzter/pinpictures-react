import React, { useEffect, useState } from "react";
import * as utils from "../utils";
import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";

import { TbSquarePlus } from "react-icons/tb";

export default function Posts({
  user,
  setUser,
  createPostModal,
  setCreatePostModal,
}) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await utils.getPosts();
        const initializedPosts = fetchedPosts.map((post) => ({
          ...post,
          comments: post.comments || [],
        }));
        setPosts(initializedPosts);
        setFilteredPosts(initializedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
    utils.searchPost(posts, setFilteredPosts, searchTerm);
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
        />
      )}
      <div className="w-full lg:w-3/4 flex flex-row gap-4 bg-zinc-800 p-6 rounded-lg shadow-lg">
        {user && (
          <button
            className="focus:outline-none hover:text-yellow-500 transition duration-300"
            onClick={toggleCreatePostModal}>
            <TbSquarePlus size={46} />
          </button>          
        )}
        <div className="flex items-center focus:outline-none w-full">
          <input
            type="text"
            placeholder="Search by name or type..."
            className="px-4 py-2 w-full rounded-l-md text-zinc-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchTerm(newValue);
            }}
          />
          <button
            className="bg-zinc-700 h-10 px-4 rounded-r-md focus:outline-none "
            onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="bg-zinc-700 px-4 self-center h-10 rounded-md focus:outline-none"
        >
          <option value="">Sort by...</option>
          <option value="id">Time added</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div
        id="posts"
        className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg mt-4 flex flex-col justify-between shadow-lg"
      >
        <PostList posts={filteredPosts} setPosts={setPosts} user={user} />
      </div>
    </div>
  );
}
