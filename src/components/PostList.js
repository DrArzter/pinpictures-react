import React, { useState, useContext } from "react";
import Post from "./Post";

import * as api from "../api";

import ThemeContext from "./ThemeContext";

export default function PostList({ posts, setPosts, user }) {

  const [commentValues, setCommentValues] = useState({});

  const { isDarkMode } = useContext(ThemeContext);

  const handleCommentChange = (postId, value) => {
    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    await api.uploadComment(postId, commentValues[postId], setCommentValues, posts, setPosts, user);
  };

  return (
    <div
      className={`3xl:columns-8 md:columns-4 columns-2 gap-x-[16px] space-y-[15px] 
      ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : ""}`}
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          user={user}
          commentValue={commentValues[post.id] || ""}
          onCommentChange={(e) => handleCommentChange(post.id, e.target.value)}
          onCommentSubmit={() => handleCommentSubmit(post.id)}
        />
      ))}
    </div>
  );
}