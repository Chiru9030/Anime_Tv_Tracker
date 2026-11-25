import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home.jsx'; 
import Login from './pages/Login.jsx'; 
import Show from './pages/Show.jsx';
import Clubs from './pages/Clubs.jsx';
import Analytics from './pages/Analytics.jsx';
import Sidebar from './components/Sidebar'; 

import './styles.css'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  return (
    <BrowserRouter>
      {/* 1. TOP HEADER (Navigation and Dark Mode Toggle) */}
      <header className="topbar">
        <h1><Link to="/">AnimeTracker</Link></h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/analytics">Analytics</Link>
          <button onClick={toggleDarkMode} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: '15px' }}>
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </nav>
      </header>

      <div className="main-content-layout"> 
        
        <div className="content-area"> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/show/:id" element={<Show />} />
              <Route path="/login" element={<Login />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </div>

        <div className="sidebar-area">
            <Sidebar /> 
        </div>
        
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);