import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        {/* Flex container with horizontal alignment */}
        <div className="flex justify-between items-center">
          {/* Left section */}
          <div className="text-left">
            <h3 className="text-lg font-semibold">DishDash</h3>
            <p className="mt-2 text-sm">Discover new recipes tailored to your taste!</p>
            <p className="text-sm mt-4">&copy; {new Date().getFullYear()} DishDash</p>
          </div>

          {/* Right section */}
          <div className="text-right">
            <ul className="space-y-1">
              <li><a href="/faq" className="hover:underline text-sm">Help</a></li>
              <li><a href="/customer" className="hover:underline text-sm">FAQ</a></li>
              <li><a href="/how-to" className="hover:underline text-sm">How-to articles</a></li>
              <li><a href="/contact" className="hover:underline text-sm">Contact support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;