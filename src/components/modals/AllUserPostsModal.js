import React, { useState, useRef, useContext } from "react";

import ThemeContext from "../ThemeContext";

import * as api from "../../api";
import * as utils from "../../utils";
import * as admin from "../../utils/admin";

export default function AdminUserModal({
  user,
  postsModal,
  setPostsModal,
}) {
  ;
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);


  const isDarkMode = useContext(ThemeContext).isDarkMode;

  function closeModal() {
    setPostsModal(false);
  }
  console.log("userModal", user);

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className={`absolute top-0 left-0 w-full z-[51] overflow-auto flex items-center justify-center p-32
      ${isDarkMode ? "bg-darkModeBackground bg-opacity-80" : "bg-black bg-opacity-40"}`} onClick={handleClickOutside}>
      <div className="w-10/12 md:w-1/2 bg-white rounded-3xl p-4 items-center flex flex-col">
        {user.posts.map((post) => (
         <div key={post.id} className="w-full flex md:flex-row flex-col items-center justify-between gap-4 hover:bg-ACDC p-1 px-2 rounded-lg">
          <p>{post.name}</p>
          <p className="break-words line-clamp-3">{post.description}</p>
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
          <button onClick={() => window.open("/post/" + post.id, "_blank")} className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white py-1 px-2 rounded">Open</button>
          </div>
         

        ))}
      </div>
    </div>
  );
}
