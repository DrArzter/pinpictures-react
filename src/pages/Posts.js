import React, { useEffect, useState } from "react";
import * as utils from "../utils";
import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";

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
          <svg
            viewBox="0 0 32 32"
            width="50"
            className="cursor-pointer hover:text-zinc-400 transition-colors duration-300"
            fill="#d4d4d8"
            onClick={toggleCreatePostModal}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <title>plus-square</title>
              <desc>Created with Sketch Beta.</desc>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Icon-Set"
                  transform="translate(-100.000000, -1035.000000)"
                  fill="#d4d4d8"
                >
                  <path
                    d="M130,1063 C130,1064.1 129.104,1065 128,1065 L104,1065 C102.896,1065 102,1064.1 102,1063 L102,1039 C102,1037.9 102.896,1037 104,1037 L128,1037 C129.104,1037 130,1037.9 130,1039 L130,1063 L130,1063 Z M128,1035 L104,1035 C101.791,1035 100,1036.79 100,1039 L100,1063 C100,1065.21 101.791,1067 104,1067 L128,1067 C130.209,1067 132,1065.21 132,1063 L132,1039 C132,1036.79 130.209,1035 128,1035 L128,1035 Z M122,1050 L117,1050 L117,1045 C117,1044.45 116.552,1044 116,1044 C115.448,1044 115,1044.45 115,1045 L115,1050 L110,1050 C109.448,1050 109,1050.45 109,1051 C109,1051.55 109.448,1052 110,1052 L115,1052 L115,1057 C115,1057.55 115.448,1058 116,1058 C116.552,1058 117,1057.55 117,1057 L117,1052 L122,1052 C122.552,1052 123,1051.55 123,1051 C123,1050.45 122.552,1050 122,1050 L122,1050 Z"
                    id="plus-square"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        )}
        <div className="flex items-center focus:outline-none w-full">
          <input
            type="text"
            placeholder="Search by name or type..."
            className="px-4 py-2 w-full rounded-l-md border border-gray-300 text-zinc-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchTerm(newValue);
            }}
          />
          <button
            className="bg-zinc-700 px-4 py-2 h-full rounded-r-md border border-gray-300 focus:outline-none "
            onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="bg-zinc-700 px-4 py-2 rounded-md focus:outline-none"
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
