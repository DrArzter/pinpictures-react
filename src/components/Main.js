import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Posts from "../pages/Posts";
import Post from "../pages/Post";
import Support from "../pages/Support";
import License from "../pages/License";
import Authentication from "../pages/Authentication";
import NotFound from "../pages/NotFound";
import AccountSettings from "../pages/AccountSettings";
import Profile from "../pages/Profile";
import Chats from "../pages/Chats";
import Admin from "../pages/Admin";
import Chat from "../pages/Chat";
import Search from "../pages/Search";
import Test from "../pages/Test";

import * as utils from "../utils";

export default function Main({
  user,
  setUser,
  posts,
  setPosts,
  createPostModal,
  setCreatePostModal,
  notifications,
  setNotifications,
  isMobile,
  socket,
  socketEvent,
  socketState
}) {
  const location = useLocation();

  const mainClassName = "min-h-screen";

  return (
    <div id="main" className={mainClassName}>
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
              <Route path="/support" element={<Support />} />
              <Route path="/license" element={<License />} />
              <Route
                path="/authentification"
                element={<Authentication setUser={setUser} user={user} isMobile={isMobile} />}
              />
              <Route path="/settings" element={<AccountSettings user={user} />} />
              <Route path="/profile/:username" element={<Profile user={user} setUser={setUser} socket={socket} socketEvent={socketEvent} socketState={socketState} />} />
              <Route path="/post/:id" element={<Post user={user} />} />
              <Route path="/chats" element={<Chats user={user} socket={socket} socketEvent={socketEvent} socketState={socketState} />} />
              <Route path="/chats/:id" element={<Chats user={user} socket={socket} socketEvent={socketEvent} socketState={socketState} />} />
              <Route path="/admin" element={<Admin user={user} />} />
              <Route path="secret" element={<NotFound />} />
              <Route path="search/:searchTerm" element={<Search />} />
              <Route path="test" element={<Test />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
    </div>
  );
}