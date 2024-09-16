"use client";
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/next.svg" alt="Logo" className="h-8" />
          <span className="text-xl font-bold">DishDash</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-green-500">Search</a>
          <a href="#" className="hover:text-green-500">View results</a>
          <a href="#" className="hover:text-green-500">Explore</a>
          <a href="#" className="hover:text-green-500">Manage</a>
          <a href="#" className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600">Sign in</a>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">Search</a>
        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">View results</a>
        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">Explore</a>
        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">Manage</a>
        <a href="#" className="block bg-green-500 text-black px-4 py-2 m-2 rounded-lg hover:bg-green-600">Sign in</a>
      </div>
    </nav>
  );
};

export default Navbar;
