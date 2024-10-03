import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { BsHeart, BsChatDots, BsHeartFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import CommentList from "../components/CommentList";
import FullScreenImage from "../components/modals/FullScreenImageModal";
import LoadingIndicator from "../components/LoadingIndicator";

import * as api from "../api";

export default function Post({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);

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
        setLiked(user ? response.liked_user_ids?.includes(user.id) : false);
        setPost(response);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, user]);

  if (loading) {
    return <LoadingIndicator />;
  }

  const postContainerClassName = `flex flex-col lg:flex-row max-h-[80vh] mt-8 mx-8 gap-8`;

  const imageSliderContainerClassName = `w-full lg:w-2/3 h-[80vh] flex flex-col items-center relative overflow-hidden rounded-lg shadow-md`;

  const imageContainerClassName = `w-full h-full flex items-center justify-center transition-opacity duration-300 ${
    imageTransition ? "opacity-0" : "opacity-100"
  }`;

  const navigationButtonClassName = `p-2 bg-opacity-0 transition-colors hover:bg-opacity-100 duration-300 rounded-full`;

  const postInfoContainerClassName = `w-full lg:w-1/3 flex flex-col p-4 overflow-y-auto rounded-lg shadow-md`;

  const postTitleClassName = `text-3xl font-bold mb-4`;

  const postDescriptionClassName = `mb-4 break-words`;

  const postAuthorClassName = `text-sm mb-4`;

  const postActionsClassName = `flex items-center space-x-4 mb-4`;

  const likeButtonClassName = `flex items-center space-x-2 hover:text-yellow-500`;

  const commentButtonClassName = `flex items-center space-x-2 hover:text-yellow-500`;

  const commentInputClassName = `flex-grow px-4 py-2 rounded-l-md border focus:border-yellow-500 focus:outline-none`;

  const ArrowButtonClassName = `hover-transform`

  const commentSendButtonClassName = `px-4 py-2 rounded-r-md border hover:bg-yellow-500`;

  return (
    <div className={postContainerClassName}>
      <div className={imageSliderContainerClassName}>
        {post.images && post.images.length > 0 ? (
          <>
            <div className={imageContainerClassName} style={{ maxHeight: "100vh" }}>
              <img
                src={post.images[currentImageIndex].picpath}
                alt={post.name}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                className="cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => handleImageClick(currentImageIndex)}
              />
            </div>

            {post.images.length > 1 && (
              <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2 px-4">
                <button onClick={handlePrevImage} className={navigationButtonClassName}>
                  <IoIosArrowBack className={ArrowButtonClassName} size={24} />
                </button>
                <button onClick={handleNextImage} className={navigationButtonClassName}>
                  <IoIosArrowForward className={ArrowButtonClassName} size={24} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg"></div>
        )}
      </div>

      <div className={postInfoContainerClassName}>
        <h2 className={postTitleClassName}>{post.name}</h2>
        <p className={postDescriptionClassName}>{post.description}</p>
        <p className={postAuthorClassName}>
          Posted by:{" "}
          <Link to={`/profile/${post.author}`} className="hover:underline">
            {post.author}
          </Link>
        </p>

        <div className={postActionsClassName}>
          <button onClick={handleLike} className={likeButtonClassName}>
            {liked ? <BsHeartFill size={20} /> : <BsHeart size={20} />}
            <span>{post.likes || 0}</span>
          </button>
          <div className={commentButtonClassName}>
            <BsChatDots size={20} />
            <span>{post.comments ? post.comments.length : 0}</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input
            className={commentInputClassName}
            type="text"
            value={commentValue}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
          />
          <button className={commentSendButtonClassName} onClick={handleCommentSubmit}>
            Send
          </button>
        </div>

        <div className="flex-grow">
          <CommentList comments={post.comments || []} />
        </div>
      </div>

      {isImageFullScreen && (
        <FullScreenImage
          imageUrl={post.images[currentImageIndex].picpath}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </div>
  );
}
