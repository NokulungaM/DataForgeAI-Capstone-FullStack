import React, { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

export default function Contact() {
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
      <div 
        className="container mx-auto px-4 py-12"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* About us Box */}
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 min-h-[280px] transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-green-500 font-semibold">About us</h3>
              <p className="text-black-500">We are a group that is inspired by the art of happiness, and we all know there's nothing better to bring people together in a happy space like good food. We are motivated by the endless possibilities of creativeness in food and the love that comes with it.</p>
            </div>
          </div>
          {/*  */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 min-h-[280px] transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-green-500 font-semibold">Our Mission</h3>
              <p className="text-black-500">Our mission is to give access to different kinds of food to all kinds of cultures, for them to incorporate our recipes to their own, or simply try something new.</p>
            </div>
          </div>
          {/* Feedback and Suggestions Box */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 min-h-[280px] transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-green-500 font-semibold">Feedback and Suggestions</h3>
              <p className="text-black-500">We value your feedback to help improve our services.</p>
            </div>
          </div>
        </div>

        {/* Main Flex Container for Contact Information and Form */}
        <div className="flex flex-col md:flex-row items-start justify-between bg-white p-8 rounded-lg shadow-lg border border-gray-300">
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
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First name"
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
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                >
                  Submit
                </button>
                <p className="text-gray-600 text-xs text-center mt-4">
                  By submitting, you agree to our{' '}
                  <Link href="termsAndConditions" legacyBehavior>
                    <a className="text-blue-500">Terms and conditions</a>
                  </Link>{' '}
                  and{' '}
                  <Link href="/policy" legacyBehavior>
                    <a className="text-blue-500">Privacy Policy</a>
                  </Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
