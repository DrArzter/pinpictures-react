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

import * as api from "./api";

function App() {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [loading, setLoading] = useState(true);

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
  setNotifications
}) {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div className={`h-screen md:h-full transition-all duration-300 ease-in-out 
      ${isDarkMode ? "bg-darkModeBackground text-darkModeText fill-darkModeText"
      : "bg-lightModeBackground text-lightModeText fill-lightModeText"} 
      transition-colors`}>
      <Header 
        user={user}
        createPostModal={createPostModal}
        setCreatePostModal={setCreatePostModal}
      />
      <Notification
        notifications={notifications}
        setNotifications={setNotifications} 
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
      />
      <Footer user={user}/>
    </div>
  );
}

export default App;
