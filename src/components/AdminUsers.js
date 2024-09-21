import React from "react";
import { useContext, useState } from "react";
import ThemeContext from "./ThemeContext";
import AdminUserModal from "./modals/AdminUserModal";

import AllUserPostsModal from "./modals/AllUserPostsModal";


import * as api from "../api";
import * as admin from "../utils/admin";

export default function AdminMain({ users, posts, likes, comments, fetchData }) {
    const [userModal, setUserModal] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const [postsModal, setPostsModal] = useState(false);
    const postsCount = posts.length || 0;
    const usersCount = users.length || 0;
    const likesCount = likes.length || 0;
    const commentsCount = comments.length || 0;

    function handleSelectUser(user) {
        user.posts = posts.filter((post) => post.userid === user.id);
        user.likes = likes.filter((like) => like.userid === user.id);
        user.comments = comments.filter((comment) => comment.userid === user.id);
        setUserModal(user);
    }

    function handleChange(e) {
        console.log(e.target.value);
    }


    return (
        <div className={`w-full px-8 py-4 sm:px-16 sm:py-8 rounded-3xl md:shadow-2xl text-center items-center bg-bananaStyle bg-repeat bg-contain`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-2 rounded-2xl mx-auto md:w-2/4 sm:w-2/3 w-full`}>Пользователи</h1>
            <input type="text" placeholder="Search..." onChange={handleChange} className="w-full p-2 border rounded mt-4" />
            <div className={`${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-4 rounded-2xl mt-4 flex flex-col items-center gap-2`}>
                {users.map((user) => (
                    <button
                    onClick={() => handleSelectUser(user)}
                    key={user.id}
                    className="w-full flex md:flex-row flex-col items-center justify-between gap-4 hover:bg-ACDC p-1 px-2 rounded-lg">
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p>{user.email}</p>
                        <p>Reg. {new Date(user.created_at).toLocaleDateString()}</p>
                    </button>
                ))}
            </div>
            {userModal && <AdminUserModal userModal={userModal} setUserModal={setUserModal} postsModal={postsModal} setPostsModal={setPostsModal} fetchData={fetchData}/>}
            {postsModal && <AllUserPostsModal user={userModal} postsModal={postsModal} setPostsModal={setPostsModal} />}
        </div>
    );
}
