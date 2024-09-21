import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import ThemeContext from "../components/ThemeContext";
import AdminMain from "../components/AdminMain";
import AdminUsers from "../components/AdminUsers";
import AdminPosts from "../components/AdminPosts";
import AdminChats from "../components/AdminChats";
import AdminSettings from "../components/AdminGlobal";

import { AiOutlineUserAdd, AiOutlineSetting, AiOutlineMessage } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

import config from "../api/config";
import * as api from "../api";
import * as utils from "../utils";
import * as admin from "../utils/admin";


function Admin({ user, setUser, isMobile }) {
    const [MainPage, setMainPage] = useState(true);
    const [UsersPage, setUsersPage] = useState(false);
    const [PostsPage, setPostsPage] = useState(false);
    const [ChatsPage, setChatsPage] = useState(false);
    const [SettingsPage, setSettingsPage] = useState(false);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);

    async function fetchData(id = null) {
        if (id) {
            const users = await admin.getAllUsers() || [];
            const posts = await admin.getAllPosts() || [];
            setPosts(posts.posts);
            setLikes(posts.likes);
            setComments(posts.comments);
            setUsers(users);
            console.log("fetchData", posts);
            const userr = users.find((u) => u.id === id);
            userr.posts = posts.posts.filter((post) => post.userid === user.id);
            userr.likes = posts.likes.filter((like) => like.userid === user.id);
            userr.comments = posts.comments.filter((comment) => comment.userid === user.id);
            return users.find((userr) => userr.id === id);
        }
        const users = await admin.getAllUsers() || [];
        const posts = await admin.getAllPosts() || [];

        setPosts(posts.posts);
        setLikes(posts.likes);
        setComments(posts.comments);
        setUsers(users);
    }

    useEffect(() => {
        console.log(MainPage, UsersPage, PostsPage, ChatsPage, SettingsPage);
    }, [MainPage, UsersPage, PostsPage, ChatsPage, SettingsPage]);


    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (user) {
            if (user.bananaLevel <= 1) {
                window.location.href = "/";
                return;
            }
        }
        fetchData();
    }, [user]);

    return (
        <div className={`min-h-screen items-center  w-full p-4 ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"}`}>
            <div className="flex flex-col sm:flex-row justify-around items-center py-4 px-16 bg-bananaStyle bg-repeat-x bg-contain rounded-2xl gap-4 backdrop-blur">
                <button
                    onClick={() => { setMainPage(true); setUsersPage(false); setPostsPage(false); setChatsPage(false); setSettingsPage(false) }}
                    className={`p-2 rounded-2xl w-full transition ease-in-out duration-800 ${isDarkMode ? "bg-darkModeBackground text-darkModeText hover:bg-lightModeBackground hover:text-lightModeText" : "bg-lightModeBackground text-lightModeText hover:bg-darkModeBackground hover:text-darkModeText"}`}>
                    <p>Main</p>
                </button>
                <button
                    onClick={() => { setMainPage(false); setUsersPage(true); setPostsPage(false); setChatsPage(false); setSettingsPage(false) }}
                    className={`p-2 rounded-2xl w-full transition ease-in-out duration-800 ${isDarkMode ? "bg-darkModeBackground text-darkModeText hover:bg-lightModeBackground hover:text-lightModeText" : "bg-lightModeBackground text-lightModeText hover:bg-darkModeBackground hover:text-darkModeText"}`}>
                    <p>Users</p>
                </button>
                <button
                    onClick={() => { setMainPage(false); setUsersPage(false); setPostsPage(true); setChatsPage(false); setSettingsPage(false) }}
                    className={`p-2 rounded-2xl w-full transition ease-in-out duration-800 ${isDarkMode ? "bg-darkModeBackground text-darkModeText hover:bg-lightModeBackground hover:text-lightModeText" : "bg-lightModeBackground text-lightModeText hover:bg-darkModeBackground hover:text-darkModeText"}`}>
                    <p>Posts</p>
                </button>
                <button
                    onClick={() => { setMainPage(false); setUsersPage(false); setPostsPage(false); setChatsPage(true); setSettingsPage(false) }}
                    className={`p-2 rounded-2xl w-full transition ease-in-out duration-800 ${isDarkMode ? "bg-darkModeBackground text-darkModeText hover:bg-lightModeBackground hover:text-lightModeText" : "bg-lightModeBackground text-lightModeText hover:bg-darkModeBackground hover:text-darkModeText"}`}>
                    <p>Родина слышит</p>
                </button>
                <button
                    onClick={() => { setMainPage(false); setUsersPage(false); setPostsPage(false); setChatsPage(false); setSettingsPage(true) }}
                    className={`p-2 rounded-2xl w-full transition ease-in-out duration-800 ${isDarkMode ? "bg-darkModeBackground text-darkModeText hover:bg-lightModeBackground hover:text-lightModeText" : "bg-lightModeBackground text-lightModeText hover:bg-darkModeBackground hover:text-darkModeText"}`}>
                    <p>Global settings</p>
                </button>
            </div>
            <div className="mt-16 w-full">
                {MainPage && <AdminMain users={users} posts={posts} likes={likes} comments={comments} />}
                {UsersPage && <AdminUsers users={users} posts={posts} likes={likes} comments={comments} fetchData={fetchData} />}
                {PostsPage && <AdminPosts posts={posts} likes={likes} comments={comments} users={users} />}
                {ChatsPage && <AdminChats />}
                {SettingsPage && <AdminSettings />}
            </div>
        </div>
    );
}

export default Admin;
