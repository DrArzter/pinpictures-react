import React, { useState } from "react";
import Post from "./Post";

import * as api from "../api";
import * as utils from "../utils";

export default function PostList({ posts, setPosts, user }) {
  const [commentValues, setCommentValues] = useState({});

  const handleCommentChange = (postId, value) => {
    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    await api.uploadComment(postId, commentValues[postId], setCommentValues, posts, setPosts, user);
  };
// h-[96vh] w -[100vw]
  return (
    <div className="3xl:columns-8 md:columns-4 columns-2 gap-x-[16px] space-y-[15px] ">
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
