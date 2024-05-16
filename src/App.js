import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  return (
    <body className="bg-zinc-800 text-zinc-300">
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} user={user} setUser={setUser} />
        <Main isLoggedIn={isLoggedIn} user={user} />
        <Footer />
      </div>
    </Router>
    </body>
  );
}

export default App;
