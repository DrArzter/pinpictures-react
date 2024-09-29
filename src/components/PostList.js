import React, { useContext } from "react";
import Post from "./Post";

export default function PostList({ posts, user }) {

  const postListClassName = "3xl:columns-8 md:columns-4 columns-2 gap-x-[16px] space-y-[15px]";

  return (
    <div className={postListClassName}>
      {posts.map((post) => (
        <Post key={post.id} post={post} user={user} />
      ))}
    </div>
  );
}