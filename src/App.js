import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Notification from "./components/Notifications";

import * as utils from "./utils";
import * as api from "./api";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(false);

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
      <div className="bg-slate-100">
        <Header 
        user={user} 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}/>
        <Notification
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Main
          user={user}
          setUser={setUser}
          createPostModal={createPostModal}
          setCreatePostModal={setCreatePostModal}
          notifications={notifications}
          setNotifications={setNotifications}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;