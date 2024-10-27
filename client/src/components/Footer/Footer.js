import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing Font Awesome icons

const Footer = () => {
  // States for the heading and paragraph text
  const [headingText, setHeadingText] = useState('');
  const [paragraphText, setParagraphText] = useState('');

  // Full strings to be typed out
  const fullHeadingText = "DishDash";
  const fullParagraphText = "Discover new recipes,CHEF!";

  // Typing effect logic for heading and paragraph
  useEffect(() => {
    let headingTimeout;
    let paragraphTimeout;

    // Function to type out heading one character at a time
    const typeHeading = (index) => {
      if (index < fullHeadingText.length) {
        setHeadingText((prev) => prev + fullHeadingText[index]);
        headingTimeout = setTimeout(() => typeHeading(index + 1), 150); // Adjust typing speed here
      } else {
        // Start typing the paragraph once heading is fully typed
        typeParagraph(0);
      }
    };

    // Function to type out paragraph one character at a time
    const typeParagraph = (index) => {
      if (index < fullParagraphText.length) {
        setParagraphText((prev) => prev + fullParagraphText[index]);
        paragraphTimeout = setTimeout(() => typeParagraph(index + 1), 100); // Adjust typing speed here
      }
    };

    // Start typing the heading
    typeHeading(0);

    // Cleanup timeouts when component unmounts
    return () => {
      clearTimeout(headingTimeout);
      clearTimeout(paragraphTimeout);
    };
  }, []); // Empty dependency array to run effect only on mount

  return (
    <footer className="bg-gradient-to-b from-gray-200 to-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8"> {/* Box-like appearance */}
          {/* Main Flex container for footer content */}
          <div className="flex flex-col md:flex-row justify-between items-start">
            
            {/* Left section - DishDash branding */}
            <div className="flex flex-col items-start space-y-2 mb-4 md:mb-0"> {/* Changed to items-start for left-alignment */}
              {/* Typing effect applied here */}
              <h3 className="text-2xl font-semibold">{headingText}</h3> {/* Increased size */}
              {/* Aligning paragraph to the left by removing text-center and setting it red */}
              <p className="text-xs text-red-500" style={{ fontSize: '10px' }} >{paragraphText}</p> {/* Extra extra small font size in red */}
              <p className="text-xs mt-4">&copy; {new Date().getFullYear()} DishDash</p>
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
