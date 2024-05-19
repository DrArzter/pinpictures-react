import React, { useEffect, useState } from "react";
import * as utils from "./utils";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [createPostModal, setCreatePostModal] = useState(false);

  const headerLinks = [
    { name: "Authentication", path: "/Authentification" },
    { name: "Profile", path: user ? `/profile/${user.name}` : "/profile" },
    { name: "Support", path: "/support" },
    { name: "License", path: "/license" },
  ];

  useEffect(() => {
    async function fetchData() {
      const [user, posts] = await Promise.all([
        utils.getUser(),
        utils.getPosts(),
      ]);
      if (user) {
        setUser(user);
      }
      const initializedPosts = posts.map(post => ({
        ...post,
        comments: post.comments || []
      }));
      setPosts(initializedPosts);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <div id="root" className="bg-zinc-800 text-zinc-300">
        <Header user={user} headerLinks={headerLinks} />
        <Main
          user={user}
          setUser={setUser}
          posts={posts}
          setPosts={setPosts}
          createPostModal={createPostModal}
          setCreatePostModal={setCreatePostModal}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
