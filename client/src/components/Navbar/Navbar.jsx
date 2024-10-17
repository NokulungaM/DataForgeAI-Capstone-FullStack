import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = ({ isLandingPage, isAuthPage, isSearchPage, isMealPlanPage, isLoggedIn, isProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    // Handle sign-out logic
    router.push('/');
  };

  return (
    <nav className="bg-white-to-br text-black p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-start cursor-pointer" onClick={() => router.push('/')}>
          <img src="/DD LOGO.png" alt="Logo" className="h-8" /> {/* Adjusted logo styling */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-xs">
          {isLandingPage ? (
            <>
              <a href="/search" className="hover:text-cyan-500">Search 4 recipes</a>
              <a href="/meal-plan" className="hover:text-cyan-500">Generate meal plan</a>
              <a href="/community" className="hover:text-cyan-500">Community</a>
              <a href="/profile" className="hover:text-cyan-500">Profile</a>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs">Sign out</button>
            </>
          ) : isSearchPage || isMealPlanPage ? (
            <>
              <a href="/search" className="hover:text-cyan-500">Search</a>
              <a href="/community" className="hover:text-cyan-500">Community</a>
              <a href="/profile" className="hover:text-cyan-500">Profile</a>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs">Sign out</button>
            </>
          ) : isLoggedIn ? (
            <>
              <a href="/search" className="hover:text-cyan-500">Search</a>
              <a href="/profile" className="hover:text-cyan-500">Profile</a>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs">Sign out</button>
            </>
          ) : (
            <a href="/auth/signin" className="bg-transparent text-black hover:text-cyan-500 px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg">
              Sign in
            </a>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-black focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {isProfile? (
          <>
            <a href="/search" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Search 4 recipes</a>
            <a href="/meal-plan" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Generate meal plan</a>
            <a href="/community" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Community</a>
            <a href="/profile" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Profile</a>
            <button onClick={handleSignOut} className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Sign out</button>
          </>
        ) :
        isProfile? (
          <>
            <a href="/search" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Search 4 recipes</a>
            <a href="/meal-plan" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Generate meal plan</a>
            <a href="/community" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Community</a>
            <a href="/profile" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Profile</a>
            <button onClick={handleSignOut} className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Sign out</button>
          </>
        ) :
          isLandingPage ? (
            <>
              <a href="/search" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Search 4 recipes</a>
              <a href="/meal-plan" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Generate meal plan</a>
              <a href="/community" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Community</a>
              <a href="/profile" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Profile</a>
              <button onClick={handleSignOut} className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Sign out</button>
            </>
        
        ) : isSearchPage ? (
          <>
           
            <a href="/community" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Community</a>
            <a href="/profile" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Profile</a>
            <a href="/meal-plan" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Meal-plan</a>

            <button onClick={handleSignOut} className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Sign out</button>
          </>
        ):  isMealPlanPage ? (
          <>
            <a href="/search" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Search</a>
            <a href="/community" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Community</a>
            <a href="/profile" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Profile</a>
           

            <button onClick={handleSignOut} className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Sign out</button>
          </>
        ) : isLoggedIn ? (
          <>
            <a href="/search" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Search</a>
            <a href="/profile" className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Profile</a>
            <button onClick={handleSignOut} className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black">Sign out</button>
          </>
        ) : (
          <a href="/auth/signin" className="block px-4 py-2 text-xs bg-transparent text-black hover:text-cyan-500 rounded-full">Sign in</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
