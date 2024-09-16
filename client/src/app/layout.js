import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '../../src/Styles/globals.css';



export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer /> {/* Add Footer component here */}
    </>
  );
}