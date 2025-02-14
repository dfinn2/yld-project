import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Clear event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 container mx-auto px-2 md:px-3 flex justify-between items-center z-50 transition-colors duration-300 
      ${isScrolled ? 'bg-white' : 'bg-transparent'}`}
    >
      <div className="text-xl font-bold ml-2">Your Company Name</div>

      {/* Main navigation links - hidden on small screens */}
      <ul className="hidden md:flex space-x-6 mx-auto">
        <li>
          <a href="/" className="text-gray-800 hover:underline font-light">
            Home
          </a>
        </li>
        <li>
          <a href="#services" className="text-gray-800 hover:underline font-light">
            Services
          </a>
        </li>
        <li>
          <a href="#contact" className="text-gray-800 hover:underline font-light">
            Contact Us
          </a>
        </li>
        <li>
          <Link href="/learn" legacyBehavior>
            <a className="text-gray-800 hover:underline font-light">Learn</a>
          </Link>
        </li>
      </ul>

      {/* Sign Up / Login buttons - hidden on small screens */}
      <div className="hidden md:flex space-x-4">
        <Link href="#signup" legacyBehavior>
          <a className="border border-black text-black py-1 px-2 rounded-md hover:bg-[#FAFF03] hover:text-black transition">
            Sign Up
          </a>
        </Link>
        <Link href="#login" legacyBehavior>
          <a className="border border-black bg-black text-white py-1 px-2 rounded-md hover:bg-[#FAFF03] hover:text-black transition">
            Login
          </a>
        </Link>
      </div>

      {/* Hamburger button - only visible on small screens */}
      <div className="flex md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu, shown when hamburger is clicked */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 float-right relative">
            <ul className="mt-0 position-absolute left-0 top:100% width-full">
              <li><Link href="/about" className="text-black hover:bg-[#FAFF03] block px-3 py-2 rounded-md text-base font-medium">
                About
              </Link></li>
              <li><Link href="/services" legacyBehavior>
              <a className="text-black hover:bg-[#FAFF03] block px-3 py-2 rounded-md text-base font-medium">
                Services
              </a>
            </Link></li>
              <li><Link href="/contact" legacyBehavior>
              <a className="text-black hover:bg-[#FAFF03] block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
            </Link></li> 
            </ul>
            
            
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
