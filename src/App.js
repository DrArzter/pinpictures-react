import React, { useEffect, useState } from 'react';
import * as utils from './utils';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import { BrowserRouter as Router } from 'react-router-dom';
 
function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const [user, posts] = await Promise.all([
        utils.getUser(),
        utils.getPosts(),
      ]);
      if (user) {
        setUser(user);
      }
      setPosts(posts);
    }
    fetchData();
  }, [setUser, setPosts]);
  const headerLinks = [
    { name: 'Authentication', path: '/Authentification' },
    { name: 'Account Settings', path: '/AccountSettings' },
    { name: 'Support', path: '/support' },
    { name: 'License', path: '/license' },
  ];

  return (
    <Router>
      <div id="root" className="bg-zinc-800 text-zinc-300">
        <Header user={user} headerLinks={headerLinks} createPostModal={createPostModal} setCreatePostModal={setCreatePostModal} />
        <Main user={user} setUser={setUser} posts={posts} setPosts={setPosts} createPostModal={createPostModal} setCreatePostModal={setCreatePostModal} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
