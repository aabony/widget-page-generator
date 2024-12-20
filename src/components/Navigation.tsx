import React from 'react';

export function Navigation() {
  return (
    <nav className="flex justify-between items-center px-6 py-4">
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-white">
          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
          <span className="font-bold">Stan</span>
        </div>
        <div className="space-x-6 text-white/80">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Our Mission</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white hover:text-white/80">Log In</button>
        <button className="bg-white text-[#6C5CE7] px-4 py-2 rounded-full font-medium hover:bg-white/90">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
