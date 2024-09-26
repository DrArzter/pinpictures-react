import React, { useState, useContext } from "react";
import Post from "./Post";

import * as api from "../api";

import ThemeContext from "./ThemeContext";

export default function PostList({ posts, setPosts, user }) {

  const { isDarkMode } = useContext(ThemeContext);  

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
        />
      ))}
    </div>
  );
}