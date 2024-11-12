import React, { useState, useRef, useContext, useEffect } from "react";

import ThemeContext from "../ThemeContext";

import * as api from "../../api";
import * as utils from "../../utils";
import * as admin from "../../utils/admin";

export default function AdminUserModal({
  userModal,
  setPostsModal,
  setUserModal,
  postsModal,
  fetchData,
}) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);


  const isDarkMode = useContext(ThemeContext).isDarkMode;

  async function handleSubmit(e) {
    e.preventDefault();
    await userAction(userModal.id, "setBananaLevel", e.target.bananaLevel.value)
    setUserModal(await fetchData(userModal.id));
  }


  async function userAction(id, action, value) {
    const osas = await admin.userAction(id, action, value)
    setUserModal(await fetchData(id));
  }

  function closeModal() {
    setUserModal(false);
  }

  function openPostsModal(posts) {
    setPostsModal(true);
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
        <h1 className="text-2xl font-bold">{userModal.name} <button className="text-sm">edit</button></h1>
        <p className="mt-2">{userModal.email} <button className="text-sm">edit</button></p>
        <p>ID: {userModal.id} <button className="text-sm">edit</button></p>
        <p>Posts: {userModal.posts ? userModal.posts.length : 0} <button className="text-sm">edit</button></p>
        <p>Likes: {userModal.likes ? userModal.likes.length : 0} <button className="text-sm">edit</button></p>
        <p>Comments: {userModal.comments ? userModal.comments.length : 0} <button className="text-sm">edit</button></p>
        <p>Reg. {new Date(userModal.created_at).toLocaleDateString()}</p>
        <p>Last login: {userModal.last_login_at ? new Date(userModal.last_login_at).toLocaleDateString() : "Never"}</p>
        <p>Admin: {userModal.bananaLevel ? userModal.bananaLevel : "No"}</p>
        <p>Banned: {userModal.banned ? "Yes" : "No"}</p>
        <div className="mt-4 flex flex-row gap-4">
            <p>Banana Level</p>
            <form onSubmit={handleSubmit}>
              <input id="bananaLevel" type="number" name="bananaLevel" className="border-2 px-1 w-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
              <button type="submit" className="ml-2 py-1 px-2 rounded text-white bg-green-500 hover:bg-green-600">Set</button>
            </form>
        </div>
        
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-cyan-500 hover:bg-cyan-600" onClick={() => openPostsModal(userModal.posts)}>Show posts</button>
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-cyan-500 hover:bg-cyan-600">Show comments</button>
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-red-500 hover:bg-red-600" onClick={() => userAction(userModal.id, userModal.banned ? "unbanUser" : "banUser", null)}>{userModal.banned ? "Unban" : "Ban"}</button>
        <button className="w-full mt-4 py-2 rounded-3xl text-white bg-red-500 hover:bg-red-600" onClick={() => userAction(userModal.id, "deleteUserData", null)}>Delete userModal data</button>
        </div>
    </div>
  );
}
