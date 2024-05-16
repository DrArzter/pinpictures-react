import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  
  const headerLinks = [
    { name: 'Authentication', path: '/Authentification' },
    { name: 'Account Settings', path: '/AccountSettings' },
    { name: 'Support', path: '/support' },
    { name: 'License', path: '/license' },
  ];

  return (
    <Router>
      <div id="root" className="bg-zinc-800 text-zinc-300">
        <Header user={user} headerLinks={headerLinks} />
        <Main user={user} setUser={setUser} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
