import React from 'react';
import Navbar from './components/Navbar';
import '../Styles/globals.css';


export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

