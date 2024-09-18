import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChatDots, BsHeart, BsHeartFill, BsArrowsFullscreen, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import FullScreenImage from "./modals/FullScreenImageModal";
import PostFullScreen from "./modals/PostFullScreenModal";
import CommentList from "./CommentList";
import likePost from "../api/likePost";

import config from "../api/config";
import * as api from "../api";
import * as utils from "../utils";

export default function Post({ post, commentValue, user, onCommentChange, onCommentSubmit }) {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isPostFullScreen, setIsPostFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const hasMultipleImages = post.images && post.images.length > 1;

  post.likes = post.likes || 0;

  useEffect(() => {
    if (user.id) {
      if (post.liked_user_ids && post.liked_user_ids.includes(user.id)) {
        setLiked(true);
      }
    }
    
  }, [user])

  const openFullScreenImage = (imageUrl, index) => {
    setFullScreenImageUrl(imageUrl);
    setCurrentImageIndex(index);
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
    likePost(post.id)
    .then(res => {
      if (res.data.message === 'liked') {
        setLiked(true);
        post.likes = post.likes + 1;
      } else if (res.data.message === 'unliked') {
        setLiked(false);
        post.likes = post.likes - 1;
      } else {
        console.error('Error liking post:', res.data.message);
      }
    })
    .catch(error => {
      console.error('Error liking post:', error);
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : post.images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < post.images.length - 1 ? prevIndex + 1 : 0));
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
          <div className="relative w-full group">
            {post.images && (
              <>
                <div className="relative w-full pb-[100%] overflow-hidden rounded-lg">
                  <img
                    src={`${post.images[currentImageIndex].picpath}`}
                    alt={post.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
                    onClick={() => openFullScreenImage(`${post.images[currentImageIndex].picpath}`, currentImageIndex)}
                  />
                </div>
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
              </>
            )}
          </div>
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
                  {liked ? <BsHeartFill size={24} /> : <BsHeart size={24} />}
                  <span>{post.likes}</span>
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
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-70 flex items-center justify-center z-50">
          <FullScreenImage imageUrl={fullScreenImageUrl} onClose={closeFullScreenImage} />
        </div>
      )}
    </>
  );
}
