import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Posts from "../pages/Posts";
import Support from "../pages/Support";
import License from "../pages/License";
import Authentication from "../pages/Authentication";
import NotFound from "../pages/NotFound";
import AccountSettings from "../pages/AccountSettings";
import Profile from "../pages/Profile";
import Chats from "../pages/Chats";
import Chat from "../pages/Chat";
import * as utils from "../utils";


export default function Main({ user, setUser, posts, setPosts, createPostModal, setCreatePostModal }) {
    const location = useLocation();

    return (
        <div id="main" className="min-h-screen bg-zinc-700 transition-all">
            <utils.ScrollToTop   />
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Routes location={location}>
                        <Route path="/" element={<Posts posts={posts} setPosts={setPosts} user={user} createPostModal={createPostModal} setCreatePostModal={setCreatePostModal} />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/license" element={<License />} />
                        <Route path="/Authentification" element={<Authentication setUser={setUser} user={user} />} />
                        <Route path="/AccountSettings" element={<AccountSettings user={user} />} />
                        <Route path="/Profile/:username" element={<Profile user={user} setUser={setUser} />} />
                        <Route path="/Chats" element={<Chats user={user} />} />
                        <Route path="/Chat/:id" element={<Chat user={user} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}