import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaCalendarAlt, FaUser, FaUsers, FaDoorOpen, FaHome } from "react-icons/fa";

const Navbar = ({ isLandingPage, isCommunityPage, isSearchPage, isMealPlanPage, isAuthPage, isLoggedIn,isProfilePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Token from localStorage:', storedToken); // Check the token value
    setToken(storedToken); // Set the token in the state
  }, []);

  const handleSignOut = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    router.push("/");
  };

  const navLinks = [
    { 
      label: 'Search Recipes', 
      href: '/search',
      icon: <FaSearch size={10} />,
      showOn: ['landing', 'mealPlan', 'community', 'profile'] // Pages to show this link on
    },
    { 
      label: 'Generate Meal Plan', 
      href: '/meal-plan', 
      icon: <FaCalendarAlt size={10} />,
      showOn: ['landing', 'search', 'community', 'profile'] 
    },
    { 
      label: 'Community', 
      href: '/communityPage', 
      icon: <FaUsers size={10} />,
      showOn: ['landing', 'search', 'mealPlan',  'profile'] 
    },
    { 
      label: 'Profile', 
      href: '/profile', 
      icon: <FaUser size={10} />,
      showOn: ['landing', 'search', 'mealPlan', 'community'] 
    },
    {
      label: 'Sign Out',
      href: '/auth/signin',
      icon: <FaDoorOpen size={10} />,
      showOn: ['search', 'mealPlan', 'community', 'profile'] 
    },
    {
      label: 'Home',
      href: '/',
      icon: <FaHome size={10} onClick={() => setIsOpen(!isOpen)} />,
      showOn: ['landing', 'search', 'mealPlan', 'community', 'profile', 'authPage'] // Always show on landing page
    }
  ];

  const shouldShowLink = (link) => {
  
    const currentPage = isLandingPage ? 'landing' :
                        isAuthPage? 'authPage' :
                        isSearchPage ? 'search' :
                        isMealPlanPage ? 'mealPlan' :
                        isCommunityPage ? 'community' :
                        isProfilePage ? 'profile' : 
                        '';
    return link.showOn.includes(currentPage);
  };

  return (
    <nav className="bg-white-to-br text-black p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="flex items-start cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/DD LOGO.png" alt="Logo" className="h-8" />{" "}
          {/* Adjusted logo styling */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-xs">
          {navLinks.map(
            (link, index) =>
              shouldShowLink(link) && (
                <a
                  key={index}
                  href={link.href}
                  className="hover:text-cyan-500 inline-flex items-center"
                >
                  {link.label}
                  <span className="ml-1">{link.icon}</span>
                </a>
              )
          )}

          {/* Sign out/Sign in logic */}
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs"
            >
              Sign out
            </button>
          ) : (
            isLandingPage && ( // Only show Sign in on landing page
              <a
                href="/auth/signin"
                className="bg-transparent text-black hover:text-cyan-500 px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg"
              >
                Sign in
              </a>
            )
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
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        {navLinks.map(
          (link, index) =>
            shouldShowLink(link) && (
              <a
                key={index}
                href={link.href}
                className="block px-4 py-2 text-xs hover:bg-gray-200 hover:text-black"
              >
                {link.label}
              </a>
            )
        )}

        {/* Sign out/Sign in logic - CORRECTED */}
        {isLoggedIn ? ( // Use isLoggedIn here, NOT isAuthPage
          <button
            onClick={handleSignOut}
            className="block w-full text-center px-4 py-2 text-xs bg-red-500 text-white rounded-lg"
          >
            Sign out
          </button>
        ) : (
          <a
            href="/auth/signin"
            className="block w-full text-center px-4 py-2 text-xs bg-transparent text-black hover:text-cyan-500 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg"
          >
            Sign in
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
