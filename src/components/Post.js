import React, { useState } from "react";
import { Link } from "react-router-dom";
import FullScreenImage from "./FullScreenImage";
import * as utils from "../utils";

const Comment = ({ comment }) => (
  <div key={comment.id} className="p-2 bg-zinc-600 rounded-lg mb-2">
    <p className="text-sm">{comment.comment}</p>
    <p className="text-xs text-gray-400">
      By: <Link to={`/profile/${comment.author}`} className="hover:underline">{comment.author}</Link>
    </p>
  </div>
);

export default function Post({ post, commentValue, onCommentChange, onCommentSubmit }) {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");

  const openFullScreenImage = (imageUrl) => {
    setFullScreenImageUrl(imageUrl);
    setIsImageFullScreen(true);
  };

  const closeFullScreenImage = () => {
    setIsImageFullScreen(false);
  };

  return (
    <div key={post.id} className="mb-8 overflow-hidden">
      <div className="bg-zinc-700 p-6 rounded-lg shadow-lg relative min-h-80">
        <div className="flex flex-col md:flex-row">
          {post.images && (
            <div className="flex flex-wrap w-full mb-4 md:mb-0 cursor-pointer">
              {post.images.map((image) => (
                <div className="flex-grow flex-shrink-0 min-w-[150px] p-1" key={image.id}>
                  <div className="relative w-full pb-[100%] overflow-hidden rounded-lg">
                    <img
                      src={`${utils.config.apiUrl.replace("/api", "")}/${image.picpath}`}
                      alt={post.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onClick={() => openFullScreenImage(`${utils.config.apiUrl.replace("/api", "")}/${image.picpath}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="w-full md:w-2/3 md:ml-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-2">{post.name}</h2>
              <p className="mb-2">{post.description}</p>
              <p className="text-sm text-gray-400">
                Posted by: <Link to={`/profile/${post.author}`} className="hover:underline">{post.author}</Link>
              </p>
            </div>
            <div className="max-h-40 mt-4 overflow-y-auto mb-4">
              {post.comments && post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
            <div className="flex items-center">
              <input
                className="flex-grow px-4 py-2 rounded-l-md border-t border-l border-b border-gray-300 text-zinc-700 focus:outline-none"
                type="text"
                value={commentValue}
                onChange={onCommentChange}
                placeholder="Add a comment"
              />
              <button
                className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-600 rounded-r-md transition-colors duration-300"
                onClick={onCommentSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {isImageFullScreen && (
        <FullScreenImage imageUrl={fullScreenImageUrl} onClose={closeFullScreenImage} />
      )}
    </div>
  );
}
