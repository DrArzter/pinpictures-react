import React, { useEffect, useState, useContext } from "react";
import { FiLayers } from "react-icons/fi";

import PostFullScreen from "./modals/PostFullScreenModal";

import likePost from "../api/likePost";

import ThemeContext from "./ThemeContext";

export default function Post({ post, commentValue, user, onCommentChange, onCommentSubmit }) {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isPostFullScreen, setIsPostFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);

  const hasMultipleImages = post.images && post.images.length > 1;

  post.likes = post.likes || 0;

  useEffect(() => {
    if (user && user.id) {
      setLiked(post.liked_user_ids && post.liked_user_ids.includes(user.id));
    }
  }, [user, post.liked_user_ids]);

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
          post.likes += 1;
        } else if (res.data.message === 'unliked') {
          setLiked(false);
          post.likes -= 1;
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
      {isPostFullScreen && (
        <PostFullScreen
          post={post}
          onClose={togglePostFullScreen}
          commentValue={commentValue}
          onCommentChange={onCommentChange}
          onCommentSubmit={onCommentSubmit}
          handleLike={handleLike}
          liked={liked}
        />
      )}
      <div
        key={post.id}
        className={`hover:scale-105 focus:scale-105 transition-transform duration-300 
        ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-white text-black"}`} 
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full group relative">
            {post.images && (
              <>
                <div className={`w-full overflow-hidden rounded-lg 
                ${isDarkMode ? "bg-darkModeBackground" : "bg-lightModeBackground"}`}> 
                  {hasMultipleImages && (
                    <FiLayers
                      className={`absolute top-4 right-4 text-3xl transition-colors duration-300 
                      ${isDarkMode ? "text-darkModeText hover:text-yellow-400" : "text-lightModeText hover:text-yellow-500"}`}
                    />
                  )}
                  <img
                    src={`${post.images[currentImageIndex].picpath}`}
                    alt={post.name}
                    className="w-full object-cover max-h-[512px]"
                    onClick={togglePostFullScreen}
                  />
                  <div className={`mt-[5px] 
                  ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>
                    <p className="text-[16px]">{post.name}</p>
                    <p className={`text-[16px] line-clamp-3 break-words 
                    ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>{post.description}</p>
                    <p className={`text-[16px] mt-[11px] 
                    ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>{post.author}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
