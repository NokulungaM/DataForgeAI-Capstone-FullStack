import React, { useEffect, useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUsers, FaBullseye, FaCommentDots } from 'react-icons/fa';

export default function Contact() {
  const [headingText, setHeadingText] = useState('');
  const [paragraphText, setParagraphText] = useState('');
  const fullHeadingText = "Contact Us";
  const fullParagraphText = "We care about your views. Write to us."; 

  useEffect(() => {
    let headingTimeout;
    let paragraphTimeout;

    const typeHeading = (index) => {
      if (index < fullHeadingText.length) {
        setHeadingText((prev) => prev + fullHeadingText[index]);
        headingTimeout = setTimeout(() => typeHeading(index + 1), 150);
      } else {
        typeParagraph(0);
      }
    };

    const typeParagraph = (index) => {
      if (index < fullParagraphText.length) {
        setParagraphText((prev) => prev + fullParagraphText[index]);
        paragraphTimeout = setTimeout(() => typeParagraph(index + 1), 100);
      }
    };

    typeHeading(0);

    return () => {
      clearTimeout(headingTimeout);
      clearTimeout(paragraphTimeout);
    };
  }, [fullHeadingText, fullParagraphText]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      {/* Contact Us Section Below Navbar */}
      <div className="bg-gray-100 py-6">
        <div className="bg-white p-6 rounded-none shadow-md max-w-4xl mx-auto flex flex-col items-center border-t-2 border-b-2 border-cyan-500">
          {/* Header with Borders */}
          <h1 className="text-5xl font-bold text-black relative">{headingText}</h1>
          <p className="text-xs text-center text-cyan-500 mt-4">{paragraphText}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* About Us, Our Mission, and Feedback Boxes with gradient backgrounds and icons */}
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-gradient-to-r from-green-200 to-cyan-200 p-6 rounded-lg shadow-lg border border-gray-300 min-h-[280px] transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <FaUsers className="text-green-600 text-3xl mb-4" />
              <h3 className="text-green-600 font-semibold">About us</h3>
              <p className="text-xs text-black-500">
                We are a group inspired by the art of happiness, and we know there's nothing better to bring people together like good food. We are motivated by the endless possibilities of creativity in food and the love that comes with it.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-gradient-to-r from-green-200 to-cyan-200 p-6 rounded-lg shadow-lg border border-gray-300 min-h-[280px] transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <FaBullseye className="text-green-600 text-3xl mb-4" />
              <h3 className="text-green-600 font-semibold">Our Mission</h3>
              <p className="text-xs text-black-500">
                Our mission is to give access to different kinds of food to all kinds of cultures, for them to incorporate our recipes into their own, or simply try something new.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-gradient-to-r from-green-200 to-cyan-200 p-6 rounded-lg shadow-lg border border-gray-300 min-h-[280px] transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <FaCommentDots className="text-green-600 text-3xl mb-4" />
              <h3 className="text-green-600 font-semibold">Feedback and Suggestions</h3>
              <p className="text-xs text-black-500">We value your feedback to help improve our services.</p>
            </div>
          </div>
        </div>

        {/* Main Flex Container for Contact Information and Form */}
        <div className="flex flex-col md:flex-row items-start justify-between bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-5xl mx-auto space-y-8 md:space-y-0 md:space-x-12">
          {/* Contact Information Section */}
          <div className="flex-1 mb-8 md:mb-0 md:pr-4">
            <h1 className="text-4xl text-black-500 font-bold mb-4">Contact Us</h1>
            <p className="text-gray-500 mb-4">
              Email, call, or complete the form to learn how we can help with your queries.
            </p>
            <div className="flex items-center mb-4">
              <PhoneIcon className="h-6 w-6 mr-3" />
              <p className="font-bold text-black-500">+27 81 223 7901</p>
            </div>

            <div className="flex items-center mb-4">
              <EnvelopeIcon className="h-6 w-6 mr-3" />
              <p className="font-bold text-black-500">Dishdash@gmail.com</p>
            </div>

            <div className="flex items-center">
              <MapPinIcon className="h-6 w-6 mr-3" />
              <div>
                <p className="font-bold text-black-500">Pretoria</p>
                <p className="font-bold text-black-500">Gauteng, South Africa</p>
              </div>
            </div>

            <div className="flex justify-start mt-6 space-x-3">
              <a href="https://facebook.com" target="_blank" className="text-black">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" className="text-black">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" className="text-black">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" className="text-black">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 p-6 md:p-8 rounded-lg shadow-lg border border-gray-300" 
              style={{ maxWidth: '400px', margin: '0 auto' }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
