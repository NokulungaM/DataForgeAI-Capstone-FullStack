import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing Font Awesome icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-200 to-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8"> {/* Box-like appearance */}
          {/* Main Flex container for footer content */}
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Left section - DishDash branding */}
            <div className="flex flex-col items-center space-y-2 mb-4 md:mb-0">
              <h3 className="text-2xl font-semibold">DishDash</h3> {/* Increased size */}
              <p className="text-sm text-center">Discover new recipes tailored to your taste!</p>
              <p className="text-xs mt-4 text-center">&copy; {new Date().getFullYear()} DishDash</p>
            </div>

            {/* Middle section - Contact information */}
            <div className="flex flex-col items-start space-y-1 text-left mb-4 md:mb-0">
              <h4 className="font-semibold">Contact</h4>
              <p className="text-xs">Phone: <span>2781 9765 223</span></p> {/* No hover effect */}
              <p className="text-xs">Email: <a href="mailto:dishdash@gmail.com" className="hover:underline hover:text-cyan-500">dishdash@gmail.com</a></p>
              <p className="text-xs">Location: <span className="hover:text-cyan-500">287 Pretoria, South Africa</span></p>
            </div>

            {/* Right section - Sign In/Sign Up links */}
            <div className="flex flex-col items-start space-y-1 text-left mb-4 md:mb-0">
              <h4 className="font-semibold">Account</h4>
              <a href="/auth/signin" className="hover:underline hover:text-cyan-500 text-xs">Sign In</a>
              <a href="/auth/signup" className="hover:underline hover:text-cyan-500 text-xs">Register to have an account</a>
            </div>

            {/* Help section - aligned next to Sign In/Sign Up */}
            <div className="flex flex-col items-start space-y-1 text-left">
              <h4 className="font-semibold">Help</h4>
              <a href="/termsAndConditions" className="hover:underline hover:text-cyan-500 text-xs">Terms and Conditions</a>
              <a href="/policy" className="hover:underline hover:text-cyan-500 text-xs">Our Policy</a>
              <a href="/aboutUs" className="hover:underline hover:text-cyan-500 text-xs">Write to us</a>
            </div>
          </div>

          {/* Social Media Icons - Centered below the sections */}
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-cyan-500 transition duration-300" 
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-cyan-500 transition duration-300" 
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-cyan-500 transition duration-300" 
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-cyan-500 transition duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
