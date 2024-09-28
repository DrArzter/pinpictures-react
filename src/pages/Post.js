import React, { useEffect, useState, useContext } from "react";
import { BsHeart, BsChatDots, BsHeartFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CommentList from "../components/CommentList";
import FullScreenImage from "../components/modals/FullScreenImageModal";
import { Link, useParams } from "react-router-dom";
import * as api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";
import ThemeContext from "../components/ThemeContext";

export default function Post({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);

  const isDarkMode = useContext(ThemeContext);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsImageFullScreen(true);
  };

  const handlePrevImage = () => {
    setImageTransition(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : post.images.length - 1
      );
      setImageTransition(false);
    }, 300);
  };

  const handleNextImage = () => {
    setImageTransition(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < post.images.length - 1 ? prevIndex + 1 : 0
      );
      setImageTransition(false);
    }, 300);
  };

  const handleCommentChange = (e) => setCommentValue(e.target.value);

  const handleCommentSubmit = async () => {
    try {
      const newComment = await api.uploadComment(post.id, commentValue, setCommentValue, user);
      if (newComment) {
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...(prevPost.comments || []), newComment],
        }));
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = () => {
    api.likePost(post.id)
      .then((res) => {
        if (res.data.message === "liked") {
          setLiked(true);
          setPost((prevPost) => ({ ...prevPost, likes: (prevPost.likes || 0) + 1 }));
        } else if (res.data.message === "unliked") {
          setLiked(false);
          setPost((prevPost) => ({ ...prevPost, likes: (prevPost.likes || 0) - 1 }));
        } else {
          console.error("Error liking post:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.getPostById(id);
      if (response) {
        response.likes = response.liked_user_ids?.length || 0;
        setLiked(user ? response.liked_user_ids?.includes(user.id) || false : false);
        setPost(response);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, user]);

  if (loading) {
    return <LoadingIndicator isDarkMode={isDarkMode} />;
  }

  console.log(isDarkMode.isDarkMode);

  return (
    <div className={`flex flex-col lg:flex-row max-h-[80vh] mt-8 mx-8 gap-8`}>

      <div className="w-full lg:w-2/3 h-[80vh] flex flex-col items-center relative overflow-hidden rounded-lg shadow-md">
        {post.images && post.images.length > 0 ? (
          <>
            <div
              className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${
                imageTransition ? "opacity-0" : "opacity-100"
              }`}
              style={{ maxHeight: "100vh" }}
            >
              <img
                src={post.images[currentImageIndex].picpath}
                alt={post.name}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                className="cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => handleImageClick(currentImageIndex)}
              />
            </div>

            {post.images.length > 1 && (
              <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2 px-4 ">
                <button
                  onClick={handlePrevImage}
                  className={`p-2 bg-opacity-0 transition-colors hover:bg-opacity-100 duration-300 rounded-full`}
                >
                  <IoIosArrowBack className="hover:fill-yellow-500" size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className={`p-2 bg-opacity-0 transition-colors hover:bg-opacity-100 duration-300 rounded-full`}
                >
                  <IoIosArrowForward className="hover:fill-yellow-500" size={24} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg"></div>
        )}
      </div>

      <div className={`w-full lg:w-1/3 flex flex-col p-4 overflow-y-auto rounded-lg shadow-md`}>
        <h2 className={`text-3xl font-bold mb-4`}>
          {post.name}
        </h2>
        <p className={`mb-4 break-words`}>{post.description}</p>
        <p className={`text-sm mb-4`}>
          Posted by:{" "}
          <Link to={`/profile/${post.author}`} className={`hover:underline`}>
            {post.author}
          </Link>
        </p>

        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 hover:text-yellow-500`}
          >
            {liked ? <BsHeartFill size={20} /> : <BsHeart size={20} />}
            <span>{post.likes || 0}</span>
          </button>
          <div className={`flex items-center space-x-2 hover:text-yellow-500`}>
            <BsChatDots size={20} />
            <span>{post.comments ? post.comments.length : 0}</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input
            className={`flex-grow px-4 py-2 rounded-l-md border focus:outline-none}`}
            type="text"
            value={commentValue}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
          />
          <button
            className={`px-4 py-2 rounded-r-md hover:bg-yellow-500 border transition duration-300`}
            onClick={handleCommentSubmit}
          >
            Send
          </button>
        </div>

        <div className="flex-grow">
          <CommentList comments={post.comments || []} isDarkMode={isDarkMode} />
        </div>
      </div>

      {isImageFullScreen && (
        <FullScreenImage
          imageUrl={post.images[currentImageIndex].picpath}
          onClose={() => setIsImageFullScreen(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
