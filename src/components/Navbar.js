import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold">I Am Grateful</Link>
        <div className="flex space-x-4">
          <Link to="/quotes" className="text-white">Quotes</Link>
          <Link to="/signup" className="text-white">Sign Up</Link>
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/share" className="text-white">Share Note</Link>
          <Link to="/upload" className="text-white">Upload Photo</Link>
          <Link to="/tag" className="text-white">Tag Note</Link>
          <Link to="/reminder" className="text-white">Reminder</Link>
          <Link to="/profile" className="text-white">Profile</Link>
          <Link to="/feed" className="text-white">Social Feed</Link>
          <Link to="/analytics" className="text-white">Analytics</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;