import React, { useEffect, useState } from "react";
import { BsHeart, BsChatDots, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import CommentList from "./CommentList";
import FullScreenImage from "./FullScreenImage";
import { Link } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import * as utils from "../utils";

export default function PostFullScreen({
  post,
  onClose,
  commentValue,
  onCommentChange,
  onCommentSubmit,
  handleLike
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
  const [showComments, setShowComments] = useState(false);
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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 overflow-auto">
      <div className="relative w-full h-full p-6 flex flex-col bg-zinc-800 rounded-lg">
        <FaRegWindowClose className="absolute top-4 right-4 text-white hover:text-red-500 transition duration-300 text-3xl cursor-pointer" onClick={onClose} />
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 flex flex-col items-center relative overflow-hidden">
            {post.images && post.images.length > 0 && (
              <div className="relative w-full h-full group">
                <img
                  src={`${utils.config.apiUrl.replace("/api", "")}/${post.images[currentImageIndex].picpath}`}
                  alt={post.name}
                  onClick={() => openFullScreenImage(`${utils.config.apiUrl.replace("/api", "")}/${post.images[currentImageIndex].picpath}`)}
                  className="w-full h-full object-cover rounded-lg"
                />
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-zinc-800 text-yellow-400 hover:text-yellow-300 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <BsArrowLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-zinc-800 text-yellow-400 hover:text-yellow-300 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <BsArrowRight size={24} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 flex flex-col p-4 overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">{post.name}</h2>
            <p className="mb-4 text-gray-300">{post.description}</p>
            <p className="text-sm text-gray-500">
              Posted by: <Link to={`/profile/${post.author}`} className="hover:underline text-yellow-400">{post.author}</Link>
            </p>
            <div className="flex items-center space-x-4 mb-4 mt-4">
              <button
                onClick={handleLike}
                className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2"
              >
                <BsHeart size={24} />
                <span>{post.likes || 0}</span>
              </button>
              <button
                onClick={() => {}}
                className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2"
              >
                <BsChatDots size={24} />
                <span>{post.comments ? post.comments.length : 0}</span>
              </button>
            </div>
            <div className="flex-grow mb-4">
              <CommentList comments={post.comments || []} />
            </div>
            <div className="flex items-center">
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
          </div>
        </div>
      </div>
      {isImageFullScreen && (
        <FullScreenImage
          imageUrl={fullScreenImageUrl}
          onClose={closeFullScreenImage}
        />
      )}
    </div>
  );
}
