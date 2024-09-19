import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Notification from "./components/Notifications";
import CreatePostModal from "./components/modals/CreatePostModal";

import * as utils from "./utils";
import * as api from "./api";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "../src/components/ThemeContext";

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
    }
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-100"></div>;
  }

  return (
    <Router>
      <ThemeProvider>
        <> 
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
        </>
      </ThemeProvider>
    </Router>
  );
}

export default App;