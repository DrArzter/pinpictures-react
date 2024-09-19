import React, { useEffect, useState, useContext } from "react";
import { BsHeart, BsChatDots, BsArrowLeft, BsArrowRight, BsHeartFill } from "react-icons/bs";
import CommentList from "../CommentList";
import FullScreenImage from "./FullScreenImageModal";
import { Link } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";

import ThemeContext from "../ThemeContext";

import config from "../../api/config";
import * as utils from "../../utils";

export default function PostFullScreen({
  post,
  onClose,
  commentValue,
  onCommentChange,
  onCommentSubmit,
  handleLike,
  liked,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
  const [showComments, setShowComments] = useState(false);

  const isDarkMode = useContext(ThemeContext).isDarkMode;

  const hasMultipleImages = post.images && post.images.length > 1;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : post.images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < post.images.length - 1 ? prevIndex + 1 : 0));
  };

  const openFullScreenImage = (imageUrl) => {
    setFullScreenImageUrl(imageUrl);
    setIsImageFullScreen(true);
  };

  const closeFullScreenImage = () => {
    setIsImageFullScreen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [onClose]);

  

  function handleClickOutside(event) {
    if (event.target.id === 'FullScreenModal') {
      onClose();
    }
  }

  return (
    <div
      id="FullScreenModal"
      className={`fixed md:inset-[-2%] inset-0 z-50 overflow-auto flex items-center justify-center 
      ${isDarkMode ? "bg-darkModeBackground bg-opacity-80" : "md:bg-black md:bg-opacity-40"}`}
    >
      <div
        className={`relative 5xl:w-6/12 4xl:w-8/12 3xl:w-10/12 w-full md:h-5/6 h-full md:p-6 flex flex-col shadow-2xl md:rounded-lg
        ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"}`}
      >
        <FaRegWindowClose
          className={`absolute z-50 top-4 right-4 text-3xl cursor-pointer transition duration-300 
          ${isDarkMode ? "text-darkModeText hover:text-red-500" : "text-black hover:text-red-500"}`}
          onClick={onClose}
        />
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 flex flex-col items-center relative overflow-hidden">
            {post.images && post.images.length > 0 && (
              <div className="relative w-full h-full group">
                <img
                  src={`${post.images[currentImageIndex].picpath}`}
                  alt={post.name}
                  onClick={() => openFullScreenImage(`${post.images[currentImageIndex].picpath}`)}
                  className="w-full h-full object-cover rounded-lg md:max-h-[100vh] max-h-[70vh]"
                />
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className={`absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      ${isDarkMode ? "bg-darkModeBackground text-yellow-400 hover:text-yellow-300" : "bg-lightModeBackground text-yellow-400 hover:text-yellow-300"}`}
                    >
                      <BsArrowLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className={`absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      ${isDarkMode ? "bg-darkModeBackground text-yellow-400 hover:text-yellow-300" : "bg-lightModeBackground text-yellow-400 hover:text-yellow-300"}`}
                    >
                      <BsArrowRight size={24} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className={`w-full md:w-1/2 flex flex-col p-4 overflow-y-auto 
          ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : ""}`}>
            <h2 className={`text-4xl font-bold mb-4 
            ${isDarkMode ? "text-yellow-400" : "text-yellow-500"}`}>{post.name}</h2>
            <p className={`mb-4 break-words 
            ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{post.description}</p>
            <p className={`text-sm 
            ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
              Posted by:{" "}
              <Link
                to={`/profile/${post.author}`}
                className={`hover:underline 
                ${isDarkMode ? "text-yellow-400" : "text-yellow-500"}`}
              >
                {post.author}
              </Link>
            </p>
            <div className="flex items-center space-x-4 mb-4 mt-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 
                ${isDarkMode ? "text-yellow-400 hover:text-yellow-300" : "text-yellow-500 hover:text-yellow-400"}`}
              >
                {liked ? <BsHeartFill size={24} /> : <BsHeart size={24} />}
                <span>{post.likes || 0}</span>
              </button>
              <button
                onClick={() => {}}
                className={`flex items-center space-x-2 
                ${isDarkMode ? "text-yellow-400 hover:text-yellow-300" : "text-yellow-500 hover:text-yellow-400"}`} 
              >
                <BsChatDots size={24} />
                <span>{post.comments ? post.comments.length : 0}</span>
              </button>
            </div>
            <div className="flex-grow mb-4">
              <CommentList comments={post.comments || []} isDarkMode={isDarkMode} /> {/* Передайте isDarkMode в CommentList */}
            </div>
            <div className="flex items-center">
              <input
                className={`flex-grow px-4 py-2 rounded-l-md border focus:outline-none 
                ${isDarkMode ? "border-gray-600 bg-darkModeBackground text-darkModeText" : "border-gray-300 bg-lightModeBackground text-lightModeText"}`}
                type="text"
                value={commentValue}
                onChange={onCommentChange}
                placeholder="Add a comment"
              />
              <button
                className={`px-4 py-2 rounded-r-md transition duration-300 
                ${isDarkMode ? "bg-yellow-500 text-zinc-900 hover:bg-yellow-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                onClick={onCommentSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {isImageFullScreen && (
        <FullScreenImage imageUrl={fullScreenImageUrl} onClose={closeFullScreenImage} isDarkMode={isDarkMode} />
      )}
    </div>
  );
}