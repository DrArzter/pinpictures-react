import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChatDots, BsHeart, BsHeartFill, BsArrowsFullscreen, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiLayers } from "react-icons/fi";
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
    if (user) {
      if (user.id) {
        if (post.liked_user_ids && post.liked_user_ids.includes(user.id)) {
          setLiked(true);
        }
      }
    }
  }, [user]);

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
        className={` hover:scale-105 focus:scale-105 transition-all duration-300`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full group relative"> {/* Добавляем relative для позиционирования кнопок */}
            {post.images && (
              <>
                <div className="w-full overflow-hidden rounded-lg">
                  {hasMultipleImages && (
                    <FiLayers
                      className="absolute top-4 right-4 text-black hover:text-yellow-500 transition duration-300 text-3xl"
                    />
                  )
                  }

                    < img
                    src={`${post.images[currentImageIndex].picpath}`}
                  alt={post.name}
                  className="w-full object-cover max-h-[512px]" // Задаем ширину изображения на 100%
                  onClick={togglePostFullScreen}
                  />

                  <div className="mt-[5px]">
                    <p className="text-black text-[16px]">{post.name}</p>

                    <p className="text-[#ACACAC] text-[16px] line-clamp-3 break-words">{post.description}</p>

                    <p className="text-[#ACACAC] text-[16px] mt-[11px]">{post.author}</p>

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