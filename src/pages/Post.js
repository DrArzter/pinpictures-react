import React, { useEffect, useState, useContext } from "react";
import { BsHeart, BsChatDots, BsArrowLeft, BsArrowRight, BsHeartFill } from "react-icons/bs";
import CommentList from "../components/CommentList";
import FullScreenImage from "../components/modals/FullScreenImageModal";
import { Link, useParams } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";

import * as api from "../api";

import LoadingIndicator from "../components/LoadingIndicator";
import ThemeContext from "../components/ThemeContext";

export default function Post() {

  const { id } = useParams();
  const [post, setPost] = useState({});
  const [commentValue, setCommentValue] = useState({});


  const [loading, setLoading] = useState(true);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [liked, setLiked] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
  

  const isDarkMode = useContext(ThemeContext);

  const hasMultipleImages = post.images && post.images.length > 1;

  const openFullScreenImage = (imageUrl) => {
    setFullScreenImageUrl(imageUrl);
    setIsImageFullScreen(true);
  };

  const closeFullScreenImage = () => {
    setIsImageFullScreen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : post.images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < post.images.length - 1 ? prevIndex + 1 : 0
    );
  };


  const handleCommentChange = (postId, value) => {
    setCommentValue((prevValues) => ({
      ...prevValues,
      [postId]: value,
    }));
  };
  
  const handleCommentSubmit = async (postId) => {
    await api.uploadComment(postId, commentValues[postId], setCommentValues, setPosts, user);
  };

  const handleLike = () => {
    api.likePost(post.id)
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

  useEffect(() => {

    

    const fetchPost = async () => {
      const response = await api.getPostById(id);
      if (response) {
        setPost(response);
      }
      setLoading(false);
    };
    fetchPost();
  }, []);

  if (loading) {
    return <LoadingIndicator isDarkMode={isDarkMode} />;
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
                ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"}`}
                type="text"
                value={commentValue}
                onChange={onCommentChange}
                placeholder="Add a comment..."
              />
              <button
                className={`px-4 py-2 rounded-r-md hover:bg-yellow-500 border transition duration-300 
                ${isDarkMode ? "text-darkModeText bg-darkModeBackground" : "text-lightModeText bg-lightModeBackground"}`}
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
