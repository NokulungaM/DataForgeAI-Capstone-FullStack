import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaUsers,
  FaDoorOpen,
  FaHome,
} from "react-icons/fa";

const Navbar = ({ isSearchPage, isMealPlanPage, isProfilePage, isCommunityPage, isLoggedIn, isAuthPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    // Handle sign-out logic
    router.push('/');
  };

  const renderNavLinks = (className) => {
    if (isAuthPage) return null; // No buttons on sign-in or sign-up pages

    if (isSearchPage) {
      return (
        <>
          <a href="/meal-plan" className={className}>
            Generate meal plan{" "}
            <FaCalendarAlt size={10} className="inline-block ml-1" />
          </a>
          <a href="/communityPage" className={className}>
            Community
            <FaUsers size={10} className="inline-block ml-1" />
          </a>
          <a href="/profile" className={className}>
            Profile
            <FaUser size={10} className="inline-block ml-1" />
          </a>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs"
          >
            Sign out
            <FaDoorOpen size={10} className="inline-block ml-1" />
          </button>
        </>
      );
    }

    if (isMealPlanPage) {
      return (
        <>
          <a href="/search" className={className}>
            Search
            <FaSearch size={10} className="inline-block ml-1" />
          </a>
          <a href="/communityPage" className={className}>
            Community <FaUsers size={10} className="inline-block ml-1" />
          </a>
          <a href="/profile" className={className}>
            Profile
            <FaUser size={10} className="inline-block ml-1" />
          </a>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs"
          >
            Sign out <FaDoorOpen size={10} className="inline-block ml-1" />
          </button>
        </>
      );
    }

    if (isProfilePage) {
      return (
        <>
          <a href="/search" className={className}>
            Search
            <FaSearch size={10} className="inline-block ml-1" />
          </a>
          <a href="/meal-plan" className={className}>
            Generate meal plan{" "}
            <FaCalendarAlt size={10} className="inline-block ml-1" />
          </a>
          <a href="/communityPage" className={className}>
            Community <FaUsers size={10} className="inline-block ml-1" />
          </a>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs"
          >
            Sign out <FaDoorOpen size={10} className="inline-block ml-1" />
          </button>
        </>
      );
    }

    if (isCommunityPage) {
      return (
        <>
          <a href="/search" className={className}>
            Search <FaSearch size={10} className="inline-block ml-1" />
          </a>
          <a href="/meal-plan" className={className}>
            Generate meal plan{" "}
            <FaCalendarAlt size={10} className="inline-block ml-1" />
          </a>
          <a href="/profile" className={className}>
            Profile <FaUser size={10} className="inline-block ml-1" />
          </a>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs"
          >
            Sign out{" "}
              {" "}
              <FaDoorOpen size={10} className="inline-block ml-1" />
            
          </button>
        </>
      );
    }

    if (!isLoggedIn) {
      return (
        <a
          href="/auth/signin"
          className="bg-transparent text-black hover:text-cyan-500 px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg"
        >
          Sign in
        </a>
      );
    }

    return null;
  };

  return (
    <nav className="bg-white-to-br text-black p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-start cursor-pointer" onClick={() => router.push('/')}>
          <img src="/DD LOGO.png" alt="Logo" className="h-8" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center text-xs">
          {renderNavLinks('hover:text-cyan-500')}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-black focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {renderNavLinks('block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black')}
      </div>
    </nav>
  );
};

export default Navbar;
