import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false; // Replace with actual login state
  const router = useRouter();

  const handleSignOut = () => {
    // Handle sign-out logic
    router.push('/');
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-5xl">🍽️</span> {/* Bigger plate and cutlery */}
          <span className="text-xl font-bold">DishDash</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="/" className="hover:text-green-500 hover:border-green-500">Home</a>
          {isLoggedIn ? (
            <>
              <a href="/search" className="hover:text-green-500 hover:border-green-500">Search</a>
              <a href="/profile" className="hover:text-green-500 hover:border-green-500">Profile</a>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg">Sign out</button>
            </>
          ) : (
            <>
              <a href="/auth/signin" className="hover:text-green-500">Sign in</a>
              <a href="/auth/signup" className="hover:text-green-500">Sign Up</a>
            </>
          )}
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
        <a href="/" className="block px-4 py-2 text-sm hover:bg-gray-700">Home</a>
        {isLoggedIn ? (
          <>
            <a href="/search" className="block px-4 py-2 text-sm hover:bg-gray-700">Search</a>
            <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-700">Profile</a>
            <button onClick={handleSignOut} className="block bg-red-500 text-white px-4 py-2 m-2 rounded-lg">Sign out</button>
          </>
        ) : (
          <>
            <a href="/auth/signin" className="block text-white px-4 py-2 m-2 hover:text-green-500">Sign in</a>
            <a href="/auth/signup" className="block px-4 py-2 text-sm hover:bg-gray-700">Sign Up</a>
          </>
        )}
      </div>

      {/* Inline Styles for Hover Effect */}
      <style jsx>{`
        .sign-in-btn {
          transition: color 0.3s ease; /* No border by default */
        }

        /* Show green border on hover for all menu items including Sign In */
        nav a:hover, nav .sign-in-btn:hover {
          border: 2px solid green; /* Green border appears on hover */
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
