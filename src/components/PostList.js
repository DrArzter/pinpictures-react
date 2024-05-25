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

const Post = ({ post, commentValue, onCommentChange, onCommentSubmit }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  const openFullScreenImage = () => {
    setIsImageFullScreen(true);
  };

  const closeFullScreenImage = () => {
    setIsImageFullScreen(false);
  };

  return (
    <div key={post.id} className="mb-8 overflow-hidden">
      <div className="bg-zinc-700 p-6 rounded-lg shadow-lg relative">
        <div className="flex flex-col md:flex-row">
          {post.picpath && (
            <div className="md:w-11/12 mb-4 md:mb-0 cursor-pointer" onClick={openFullScreenImage}>
              <img
                src={`${utils.config.apiUrl.replace("/api", "")}/${post.picpath}`}
                alt="Post"
                style={{ minWidth: "100%", objectFit: "contain" }}
                className="hover:transform hover:scale-110 transition-transform duration-500 rounded-2xl"
              />
            </div>
          )}
          <div className="md:w-2/3 md:ml-4">
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
      {isImageFullScreen && ( // Добавлено условие для показа полноэкранного изображения
        <FullScreenImage imageUrl={`${utils.config.apiUrl.replace("/api", "")}/${post.picpath}`} onClose={closeFullScreenImage} />
      )}
    </div>
  );
};



export default function PostList({ posts, setPosts, user }) {
  const [commentValues, setCommentValues] = useState({});

  const handleCommentChange = (postId, value) => {
    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    await utils.uploadComment(postId, commentValues[postId], setCommentValues, posts, setPosts, user);
  };

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          commentValue={commentValues[post.id] || ""}
          onCommentChange={(e) => handleCommentChange(post.id, e.target.value)}
          onCommentSubmit={() => handleCommentSubmit(post.id)}
        />
      ))}
    </div>
  );
}
