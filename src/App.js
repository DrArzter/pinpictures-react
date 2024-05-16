import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const headerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Support', path: '/support' },
    { name: 'License', path: '/license' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <Router>
      <div id="root" className="bg-zinc-800 text-zinc-300">
        <Header isLoggedIn={isLoggedIn} user={user} setUser={setUser} headerLinks={headerLinks} />
        <Main isLoggedIn={isLoggedIn} user={user} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
