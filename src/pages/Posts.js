import React, { useEffect, useState } from "react";
import * as utils from "../utils";

export default function Posts({
  posts,
  setPosts,
  user,
  setUser,
  createPostModal,
  setCreatePostModal,
}) {
  const [commentValues, setCommentValues] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([...posts]);

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    utils.sortPosts(newSortBy, posts, setPosts);
  };

  const handleSearchByChange = (newValue) => {
    setSearchTerm(newValue);
    utils.searchPost(posts, setFilteredPosts, newValue);
  };

  function stopPropagation(event) {
    event.stopPropagation();
  }

  const toggleCreatePostModal = () => {
    setCreatePostModal(!createPostModal);
  };

  useEffect(() => {
    setFilteredPosts([...posts]);
  }, [posts]);

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      {createPostModal && (
        <utils.CreatePostModal
          setCreatePostModal={setCreatePostModal}
          posts={posts}
          setPosts={setPosts}
          user={user}
        />
      )}
      <div className="w-full lg:w-3/4 flex flex-row gap-4 bg-zinc-800 p-6 rounded-lg">
        {user && (
          <svg
            viewBox="0 0 32 32"
            width="40px"
            className=""
            version="1.1"
            fill="#000000"
            onClick={toggleCreatePostModal}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
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
        <div className="flex items-center w-full">
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
        </div>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="bg-zinc-700 px-4 py-2 rounded-md"
        >
          <option value="">Sort by...</option>
          <option value="id">Time added</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div
        id="posts"
        className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg mt-4 flex flex-col justify-between"
      >
        {filteredPosts.map((post) => (
          <div key={post.id} className="mb-4">
            <div
              className="bg-zinc-700 p-6 rounded-lg relative"
              onClick={(event) => stopPropagation(event)}
            >
              <div className="">
                {post.picpath && (
                  <img
                    src={`http://localhost:3000/${post.picpath}`}
                    alt="Post"
                    className="mb-4 hover:transform hover:scale-110 transition duration-500 rounded-2xl"
                    style={{ minWidth: "100%", maxHeight: "50%" }}
                  />
                )}
                <div className="flex flex-row">
                  <div className="flex flex-col w-1/3">
                    <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                    <p className="">{post.description}</p>
                    <utils.StarRating
                      rating={post.rating}
                      postId={post.id}
                      setPosts={setPosts}
                    />
                    <p className="">
                      Posted by:{" "}
                      <span className="cursor-pointer">{post.author}</span>
                    </p>
                  </div>
                  <div className="ml-4 w-full max-h-60 overflow-y-auto">
                    {post.comments &&
                      post.comments.map((comment) => (
                        <div key={comment.id} className="rounded-lg">
                          <p className="">{comment.comment}</p>
                          <p className="">
                            By:{" "}
                            <span className="cursor-pointer">
                              {comment.author}
                            </span>
                          </p>
                        </div>
                      ))}
                    <br />
                    <div
                      className="flex flex-row items-center rounded-lg border border-gray-700"
                      key={post.id}
                    >
                      <input
                        className="px-4 py-2 w-full rounded-md border border-gray-300 text-zinc-700 focus:outline-none"
                        type="text"
                        value={commentValues[post.id] || ""}
                        onChange={(e) =>
                          setCommentValues({
                            ...commentValues,
                            [post.id]: e.target.value,
                          })
                        }
                        placeholder="Add a comment"
                      />
                      <svg
                        className="w-7 cursor-pointer ml-2 rounded-lg transition duration-500"
                        onClick={() =>
                          utils.uploadComment(
                            post.id,
                            commentValues[post.id],
                            setCommentValues,
                            posts,
                            setPosts
                          )
                        }
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 7.74L17.26 4H6.74L3 7.74V17.24L6.74 21H17.26L21 17.24V7.74ZM17.15 9.84L15.15 11.84L12 8.69L8.84 11.84L6.84 9.84L9.99 6.69L12 4.68L13.99 6.69L17.15 9.84ZM18.54 10.95L17.46 12.04L15.96 10.54L17.05 9.46L18.54 10.95ZM5.46 16.55L6.54 15.46L8.04 16.96L6.95 18.05L5.46 16.55ZM6 12L6.84 11.16L15.84 20.16L15 21L6 12Z"
                          fill="#2196F3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
