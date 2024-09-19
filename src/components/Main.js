import React, { useEffect, useState, useContext } from "react";
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

import ThemeContext from "./ThemeContext";

import * as utils from "../utils";

export default function Main({ user, 
  setUser, 
  posts, 
  setPosts, 
  createPostModal, 
  setCreatePostModal, 
  notifications, 
  setNotifications,
  isMobile
}) {
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div id="main" className={`min-h-screen
    ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"}`}>

      <utils.scrollToTop />
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route 
              path="/" 
              element={
                <Posts 
                  user={user} 
                  createPostModal={createPostModal}
                  setCreatePostModal={setCreatePostModal} 
                  notifications={notifications}
                  setNotifications={setNotifications}
                  posts={posts} 
                  setPosts={setPosts} 
                />
              } 
            />
            <Route path="/support" element={<Support  />} /> 
            <Route path="/license" element={<License  />} /> 
            <Route path="/authentification" element={<Authentication setUser={setUser} user={user} isMobile={isMobile}  />} /> 
            <Route path="/settings" element={<AccountSettings user={user}  />} /> 
            <Route path="/profile/:username" element={<Profile user={user} setUser={setUser}  />} /> 
            <Route path="/chats" element={<Chats user={user}  />} /> 
            <Route path="/chat/:id" element={<Chat user={user}  />} /> 
            <Route path="secret" element={<NotFound  />} /> 
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      
      <div className="h-40"></div>
    </div>
  );
}