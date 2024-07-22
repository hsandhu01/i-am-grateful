import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quotes from './components/Quotes';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ShareNote from './components/ShareNote';
import PhotoUpload from './components/PhotoUpload';
import TagNote from './components/TagNote';
import Reminder from './components/Reminder';
import UserProfile from './components/UserProfile';
import SocialFeed from './components/SocialFeed';
import Analytics from './components/Analytics';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem('darkMode');
    setDarkMode(mode === 'true');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <Navbar />
        <button onClick={toggleDarkMode} className="p-2 m-4 bg-gray-800 text-white">
          Toggle Dark Mode
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/share" element={<ShareNote />} />
          <Route path="/upload" element={<PhotoUpload />} />
          <Route path="/tag" element={<TagNote />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/feed" element={<SocialFeed />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
