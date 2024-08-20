import React, { useState } from "react";
import { Link } from "react-router-dom";

import CommentList from "./CommentList";
import { BsChatDots, BsHeart, BsArrowsFullscreen } from "react-icons/bs";
import * as utils from "../utils";
import FullScreenImage from "./FullScreenImage";
import PostFullScreen from "./PostFullScreen";

export default function Post({ post, commentValue, onCommentChange, onCommentSubmit }) {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isPostFullScreen, setIsPostFullScreen] = useState(false);

  const openFullScreenImage = (imageUrl) => {
    setFullScreenImageUrl(imageUrl);
    setIsImageFullScreen(true);
  };

  const closeFullScreenImage = () => {
    setIsImageFullScreen(false);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const togglePostFullScreen = () => {
    setIsPostFullScreen(!isPostFullScreen);
  };

  const handleLike = () => {
    // Логику для обновления лайков на сервере можно добавить здесь
  };

  return (
    <>
      <div
        key={post.id}
        className={`relative p-6 rounded-lg shadow-lg bg-zinc-700 transition-all duration-300 flex-shrink-0 ${isPostFullScreen ? "hidden" : ""}`}
      >
        <button
          onClick={togglePostFullScreen}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition duration-300"
        >
          <BsArrowsFullscreen size={24} />
        </button>
        <div className="flex flex-col md:flex-row">
          {post.images && (
            <div className="flex flex-wrap w-full mb-4 md:mb-0 cursor-pointer">
              {post.images.map((image) => (
                <div className="flex-grow flex-shrink-0 min-w-[150px] p-1" key={image.id}>
                  <div className="relative w-full pb-[100%] overflow-hidden rounded-lg">
                    <img
                      src={`${utils.config.apiUrl.replace("/api", "")}/${image.picpath}`}
                      alt={post.name}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
                      onClick={() => openFullScreenImage(`${utils.config.apiUrl.replace("/api", "")}/${image.picpath}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="w-full md:w-2/3 md:ml-4">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold mb-2 text-yellow-400">{post.name}</h2>
              <p className="mb-2 text-gray-300">{post.description}</p>
              <p className="text-sm text-gray-500">
                Posted by: <Link to={`/profile/${post.author}`} className="hover:underline text-yellow-400">{post.author}</Link>
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  onClick={handleLike}
                  className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2"
                >
                  <BsHeart size={24} />
                  <span>{post.likes || 0}</span>
                </button>
                <button
                  onClick={toggleComments}
                  className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2"
                >
                  <BsChatDots size={24} />
                  <span>{post.comments ? post.comments.length : 0}</span>
                </button>
              </div>
            </div>
            {showComments && (
              <>
                <div className="mt-4 max-h-60 overflow-y-auto">
                  <CommentList comments={post.comments || []} />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    className="flex-grow px-4 py-2 rounded-l-md border border-gray-600 bg-zinc-800 text-gray-200 focus:outline-none"
                    type="text"
                    value={commentValue}
                    onChange={onCommentChange}
                    placeholder="Add a comment"
                  />
                  <button
                    className="px-4 py-2 bg-yellow-500 text-zinc-900 hover:bg-yellow-600 rounded-r-md transition duration-300"
                    onClick={onCommentSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isPostFullScreen && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
    <PostFullScreen
      post={post}
      onClose={togglePostFullScreen}
      commentValue={commentValue}
      onCommentChange={onCommentChange}
      onCommentSubmit={onCommentSubmit}
      handleLike={handleLike}
    />
  </div>
)}
     {isImageFullScreen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <FullScreenImage imageUrl={fullScreenImageUrl} onClose={closeFullScreenImage} />
        </div>
      )}
    </>
  );
}