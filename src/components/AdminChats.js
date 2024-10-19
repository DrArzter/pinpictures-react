import React from "react";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";


import * as api from "../api";
import * as admin from "../utils/admin";

export default function AdminMain({ users, posts, likes, comments, chats }) {
    const { isDarkMode } = useContext(ThemeContext);
    const postsCount = posts.length || 0;
    const usersCount = users.length || 0;
    const likesCount = likes.length || 0;
    const commentsCount = comments.length || 0;
    const chatsCount = chats.length || 0;

    
    function handleChange(e) {
        console.log(e.target.value);
    }



    return (
        <div className={`w-full px-8 py-4 sm:px-16 sm:py-8 rounded-3xl md:shadow-2xl text-center items-center bg-bananaStyle bg-repeat bg-contain`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-2 rounded-2xl mx-auto md:w-1/4 sm:w-1/2 w-full`}>Статистика КГБ СССР для ЦК КПСС</h1>
            <input type="text" placeholder="Search..." onChange={handleChange} className="w-full p-2 border rounded mt-4" />
            <div className={`${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-4 rounded-2xl mt-4 flex flex-col items-center gap-2`}>
                {chats.map((chat) => (
                    <button
                    key={chat.id}
                    className="w-full flex md:flex-row flex-col items-center justify-between gap-4 hover:bg-ACDC p-1 px-2 rounded-lg">
                        <h2 className="text-xl font-bold">{chat.name}</h2>
                        <p>Chat Type: {chat.chat_type}</p>
                        <p>Created at {new Date(chat.created_at).toLocaleDateString()}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
