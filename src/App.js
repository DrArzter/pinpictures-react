import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Notification from "./components/Notifications";

import * as utils from "./utils";
import * as api from "./api";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "../src/components/ThemeContext";

function App() {
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
        <div className="bg-slate-100"> 
          <Header 
            user={user} 
          />
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
          />
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;