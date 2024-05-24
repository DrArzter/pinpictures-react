import React, { useEffect, useState } from "react";
import * as utils from "./utils";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const headerLinks = [
    { name: "Authentication", path: "/authentification" },
    { name: "Profile", path: user ? `/profile/${user.name}` : "/profile" },
    { name: "Support", path: "/support" },
    { name: "License", path: "/license" },
  ];

  useEffect(() => {
    async function fetchData() {
      const user = await utils.getUser();
      if (user) {
        setUser(user);
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-zinc-800"></div>;
  }

  return (
    <Router>
      <div className="bg-zinc-800 text-zinc-300">
        <Header user={user} headerLinks={headerLinks} />
        <Main
          user={user}
          setUser={setUser}
          createPostModal={createPostModal}
          setCreatePostModal={setCreatePostModal}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;