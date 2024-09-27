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
        <div className="flex items-center space-x-2">
          <img src="/next.svg" alt="Logo" className="h-8" />
          <span className="text-xl font-bold">DishDash</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-green-500">Home</a>
          {isLoggedIn ? (
            <>
              <a href="/search" className="hover:text-green-500">Search</a>
              <a href="/profile" className="hover:text-green-500">Profile</a>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg">Sign out</button>
            </>
          ) : (
            <>
              <a href="/auth/signin" className="bg-green-500 text-black px-4 py-2 rounded-lg">Sign in</a>
              <a href="/auth/signup" className="hover:text-green-500">Sign Up</a> {/* New Sign Up Link */}
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
            <a href="/auth/signin" className="block bg-green-500 text-black px-4 py-2 m-2 rounded-lg">Sign in</a>
            <a href="/auth/signup" className="block px-4 py-2 text-sm hover:bg-gray-700">Sign Up</a> {/* New Sign Up Link */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
