import React from "react";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";


import * as api from "../api";
import * as admin from "../utils/admin";

export default function AdminMain({ users, posts, likes, comments }) {
    const { isDarkMode } = useContext(ThemeContext);
    const postsCount = posts.length || 0;
    const usersCount = users.length || 0;
    const likesCount = likes.length || 0;
    const commentsCount = comments.length || 0;


    return (
        <div className={`w-full px-8 py-4 sm:px-16 sm:py-8 rounded-3xl md:shadow-2xl text-center items-center bg-bananaStyle bg-repeat bg-contain`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-2 rounded-2xl mx-auto md:w-1/4 sm:w-1/2 w-full`}>Основная статистика</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
            <div className={`${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-4 rounded-2xl`}>
                    <h2 className="text-xl font-bold">Пользователи</h2>
                    <p>Всего: {usersCount}</p>
                    <p>Активные: WIP</p>
                    <p>Заблокированные: WIP</p>
                </div>
                <div className={`${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-4 rounded-2xl`}>
                    <h2 className="text-xl font-bold">Посты</h2>
                    <p>Всего: {postsCount}</p>
                    <p>Просмотров всего: WIP</p>
                    <p>Лайков всего: {likesCount}</p>
                </div>
                <div className={`${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-4 rounded-2xl`}>
                    <h2 className="text-xl font-bold">Чаты</h2>
                    <p>Всего: 0</p>
                    <p>Активные: WIP</p>
                    <p>Групповые: WIP</p>
                </div>
                <div className={`${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"} p-4 rounded-2xl`}>
                    <h2 className="text-xl font-bold">Комментарии</h2>
                    <p>Всего: {commentsCount}</p>
                    <p>Активные: WIP</p>
                    <p>Групповые: WIP</p>
                </div>
            </div>
        </div>
    );
}
