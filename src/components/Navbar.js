import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">I Am Grateful</Link>
        <div className="flex space-x-4">
          <Link to="/quotes" className="text-white hover:text-gray-200 transition">Quotes</Link>
          <Link to="/signup" className="text-white hover:text-gray-200 transition">Sign Up</Link>
          <Link to="/login" className="text-white hover:text-gray-200 transition">Login</Link>
          <Link to="/share" className="text-white hover:text-gray-200 transition">Share Note</Link>
          <Link to="/upload" className="text-white hover:text-gray-200 transition">Upload Photo</Link>
          <Link to="/tag" className="text-white hover:text-gray-200 transition">Tag Note</Link>
          <Link to="/reminder" className="text-white hover:text-gray-200 transition">Reminder</Link>
          <Link to="/profile" className="text-white hover:text-gray-200 transition">Profile</Link>
          <Link to="/feed" className="text-white hover:text-gray-200 transition">Social Feed</Link>
          <Link to="/analytics" className="text-white hover:text-gray-200 transition">Analytics</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;