import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = ({ isLandingPage, isAuthPage, isSearchPage, isMealPlanPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false; // Replace with actual login state
  const router = useRouter();

  const handleSignOut = () => {
    // Handle sign-out logic
    router.push('/');
  };

  return (
    <nav className="bg-white text-black p-1"> {/* Reduced padding for smaller navbar height */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
          <img 
            src="/DishDash Logo.png" 
            alt="DishDash Logo" 
            className="h-12 w-auto transform scale-90" 
          /> {/* Reduced height and zoom using scale */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center"> {/* Reduced space between items */}
          {isLandingPage ? (
            <>
              <a href="/search" className="hover:text-green-500">Search 4 recipes</a>
              <a href="/meal-plan" className="hover:text-green-500">Generate meal plan</a>
              <a href="/community" className="hover:text-green-500">Community</a>
              <a href="/profile" className="hover:text-green-500">Profile</a>
              <a href="/sign-out" className="hover:text-green-500">Sign-out</a>
            </>
          ) : isAuthPage ? null : isSearchPage ? (
            <>
              <a href="/meal-plan" className="hover:text-green-500">Generate meal plan</a>
              <a href="/community" className="hover:text-green-500">Community</a>
              <a href="/profile" className="hover:text-green-500">Profile</a>
              <a href="/sign-out" className="hover:text-green-500">Sign-out</a>
            </>
          ) : isMealPlanPage ? (
            <>
              <a href="/search" className="hover:text-green-500">Search 4 recipes</a>
              <a href="/community" className="hover:text-green-500">Community</a>
              <a href="/profile" className="hover:text-green-500">Profile</a>
              <a href="/sign-out" className="hover:text-green-500">Sign-out</a>
            </>
          ) : (
            <>
              {isLoggedIn ? (
                <>
                  <a href="/search" className="hover:text-green-500">Search</a>
                  <a href="/profile" className="hover:text-green-500">Profile</a>
                  <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg">Sign out</button>
                </>
              ) : (
                <>
                  <a href="/auth/signin" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-lg">Sign in</a>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-black focus:outline-none" 
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
        {isLandingPage ? (
          <>
            <a href="/about" className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black">About Us</a>
            <a href="/contact" className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black">Contact</a>
          </>
        ) : isAuthPage ? null : isSearchPage || isMealPlanPage ? (
          <>
            <a href="/search" className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black">Search</a>
            <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black">Profile</a>
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <>
                <a href="/search" className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black">Search</a>
                <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black">Profile</a>
                <button onClick={handleSignOut} className="block bg-red-500 text-white px-4 py-2 m-2 rounded-lg">Sign out</button>
              </>
            ) : (
              <>
                <a href="/auth/signin" className="block text-black px-4 py-2 m-2 hover:text-green-500">Sign in</a>
                <a href="/auth/signup" className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-black">Sign Up</a>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
