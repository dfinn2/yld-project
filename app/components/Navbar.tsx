import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="container mx-auto px-4 md:px-4 py-4 flex justify-between items-center">
      <div className="text-xl font-bold ml-2">Your Company Name</div>
      <ul className="flex space-x-6 mx-auto">
        <li><a href="/" className="text-gray-800 hover:underline font-light">Home</a></li>
        <li><a href="#services" className="text-gray-800 hover:underline font-light">Services</a></li>
        <li><a href="#contact" className="text-gray-800 hover:underline font-light">Contact Us</a></li>
        <li><a href="#learn" className="text-gray-800 hover:underline font-light">Learn</a></li>
      </ul>
      <div className="flex space-x-4">
        <Link href="#signup" legacyBehavior>
          <a className="border border-black text-black py-1 px-2 rounded-md hover:bg-[#FAFF03] hover:text-black transition">Sign Up</a>
        </Link>
        <Link href="#login" legacyBehavior>
          <a className="border border-black bg-black text-white py-1 px-2 rounded-md hover:bg-[#FAFF03] hover:text-black transition">Login</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


