import React, { useState, useRef, useContext } from "react";

import ThemeContext from "../ThemeContext";

import * as api from "../../api";
import * as utils from "../../utils";
import * as admin from "../../utils/admin";

export default function AdminUserModal({
  user,
  setUserModal,
}) {;
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  
  user.posts_count = user.posts ? user.posts.length : 0;
  user.likes_count = user.likes ? user.likes.length : 0;
  user.comments_count = user.comments ? user.comments.length : 0;



  console.log("userModal", user);
  
  const isDarkMode = useContext(ThemeContext).isDarkMode;

  async function handleSubmit(e) {
    e.preventDefault();
    await userAction(user.id, "setBananaLevel", e.target.bananaLevel.value)
  }

  async function userAction(id, action, value) {
    const osas = await admin.userAction(id, action, value)
    console.log(osas);
  }

  function closeModal() {
    setUserModal(false);
  }


  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className={`fixed inset-[-2%] inset-0 z-50 overflow-auto flex items-center justify-center 
      ${isDarkMode ? "bg-darkModeBackground bg-opacity-80" : "bg-black bg-opacity-40"}`} onClick={handleClickOutside}>
      <div className="w-10/12 md:w-1/2 bg-white rounded-3xl p-4 items-center flex flex-col">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="mt-2">{user.email}</p>
        <p>ID: {user.id}</p>
        <p>Posts: {user.posts_count}</p>
        <p>Likes: {user.likes_count}</p>
        <p>Comments: {user.comments_count}</p>
        <p>Reg. {new Date(user.created_at).toLocaleDateString()}</p>
        <p>Last login: {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : "Never"}</p>
        <p>Admin: {user.bananaLevel ? user.bananaLevel : "No"}</p>
        <p>Banned: {user.banned ? "Yes" : "No"}</p>
        <div className="mt-4 flex flex-row gap-4">
            <p>Banana Level</p>
            <form onSubmit={handleSubmit}>
              <input id="bananaLevel" type="number" name="bananaLevel" className="border-2 px-1 w-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
              <button type="submit" className="ml-2 py-1 px-2 rounded text-white bg-green-500 hover:bg-green-600">Set</button>
            </form>
        </div>
        
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-cyan-500 hover:bg-cyan-600">Show posts</button>
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-cyan-500 hover:bg-cyan-600">Show comments</button>
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-red-500 hover:bg-red-600" onClick={userAction(user.id, "banUser", null)}>Ban</button>
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-red-500 hover:bg-red-600" onClick={userAction(user.id, "deleteUserData", null)}>Delete user data</button>

        </div>
    </div>
  );
}
