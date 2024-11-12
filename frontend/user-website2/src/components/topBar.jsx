import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src="/src/assets/LOGO.png" alt="U-Find Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-blue-600">U-FIND</span>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-800">
        <Link to="dashboard" className="hover:text-blue-600" aria-label="Home">HOME</Link>
        <Link to="aboutUs" className="hover:text-blue-600" aria-label="About Us">ABOUT US</Link>
        <Link to="contactUs" className="hover:text-blue-600" aria-label="Contact Us">CONTACT US</Link>
      </div>

      {/* Profile Icon */}
      <div>
        <img src="/src/assets/PROFILE.png" alt="Profile" className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};
