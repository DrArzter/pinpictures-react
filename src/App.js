import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Notification from "./components/Notifications";
import CreatePostModal from "./components/modals/CreatePostModal";

import { ThemeProvider } from "../src/components/ThemeContext";
import ThemeContext from "../src/components/ThemeContext";

import config from "./api/config";
import * as api from "./api";

function App() {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const [socket, setSocket] = useState(null);
  const [socketEvent, setSocketEvent] = useState(null);
  const [socketState, setSocketState] = useState(null);

  const socketInit = () => {
      const ws = new WebSocket(`${config.wsUrl}/`);
      setSocket(ws);
  };

  useEffect(() => {
      if (!socket) socketInit();
  }, [socket, user]);

  useEffect(() => {
      if (!socket) return;

      socket.onopen = () => setSocketState("open");
      socket.onerror = () => setSocketState("error");
      socket.onclose = () => setSocketState("closed");
      socket.onmessage = (event) => setSocketEvent(JSON.parse(event.data));
  }, [socket]);

  useEffect(() => {
      if (socketState === "error" || socketState === "closed") {
          setTimeout(socketInit, 3000);
      }
  }, [socketState]);

  useEffect(() => {
    async function fetchData() {
      const user = await api.getUser();
      if (user) {
        setUser(user);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-100"></div>;
  }

  return (
    <Router>
      <ThemeProvider>
        <AppContent 
          user={user} 
          setUser={setUser}
          createPostModal={createPostModal} 
          setCreatePostModal={setCreatePostModal} 
          posts={posts} 
          setPosts={setPosts}
          notifications={notifications}
          setNotifications={setNotifications}
          socket={socket}
          socketEvent={socketEvent}
          socketState={socketState}
        />
      </ThemeProvider>
    </Router>
  );
}

function AppContent({ 
  user, 
  setUser, 
  createPostModal, 
  setCreatePostModal,
  posts,
  setPosts,
  notifications,
  setNotifications,
  socket,
  socketEvent,
  socketState
}) {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div className={`transition-all duration-300 ease-in-out 
      ${isDarkMode ? "bg-darkModeBackground text-darkModeText fill-darkModeText"
      : "bg-lightModeBackground text-lightModeText fill-lightModeText"} 
      transition-colors`}>
      <Header 
        user={user}
        setUser={setUser}
        createPostModal={createPostModal}
        setCreatePostModal={setCreatePostModal}
        socket={socket}
        socketEvent={socketEvent}
        socketState={socketState}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <Notification
        notifications={notifications}
        setNotifications={setNotifications} 
        socket={socket}
        socketEvent={socketEvent}
        socketState={socketState}
      />
      {createPostModal && (
        <CreatePostModal
          setCreatePostModal={setCreatePostModal}
          createPostModal={createPostModal}
          posts={posts}
          setPosts={setPosts}
          user={user}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
      <Main
        user={user}
        setUser={setUser}
        posts={posts} 
        setPosts={setPosts} 
        createPostModal={createPostModal}
        setCreatePostModal={setCreatePostModal}
        notifications={notifications}
        setNotifications={setNotifications}
        socket={socket}
        socketEvent={socketEvent}
        socketState={socketState}
      />
      <Footer user={user}/>
    </div>
  );
}

export default App;
