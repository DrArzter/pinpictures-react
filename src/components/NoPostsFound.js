import React from "react";

export default function NoPostsFound({ isDarkMode }) {
  return (
    <div className={`text-center ${isDarkMode ? "text-gray-400" : "text-zinc-500"}`}>
      <p>
        No posts found. Try searching for something else or create a new post!
      </p>
    </div>
  );
}