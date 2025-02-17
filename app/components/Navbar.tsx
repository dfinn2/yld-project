"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

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

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className={`sticky top-0 container mx-auto px-2 md:px-3 flex justify-between items-center z-50 transition-colors duration-300 
      ${isScrolled ? 'bg-white' : 'bg-transparent'}`}
    >
      <div className="text-xl font-bold ml-2">Your Logo</div>

      {/* Main navigation links - hidden on small screens */}
      <ul className="hidden md:flex space-x-6 mx-auto">
        <li>
          <Link href="/" className="text-gray-800 hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="#services" className="text-gray-800 hover:text-gray-600">
            Services
          </Link>
        </li>
        <li>
          <Link href="#contact" className="text-gray-800 hover:text-gray-600">
            Contact Us
          </Link>
        </li>
        <li>
          <Link href="/learn" className="text-gray-800 hover:text-gray-600">
            Learn
          </Link>
        </li>
      </ul>

      {/* Sign Up / Login buttons - hidden on small screens */}
      <div className="hidden md:flex space-x-4">
        {user ? (
          <>
            <Link href="/dashboard" className="text-gray-800 hover:text-gray-600">
              Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="text-gray-800 hover:text-gray-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" className="text-gray-800 hover:text-gray-600">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </>
        )}
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
              <li><Link href="/services" className="text-black hover:bg-[#FAFF03] block px-3 py-2 rounded-md text-base font-medium">
                Services
              </Link></li>
              <li><Link href="/contact" className="text-black hover:bg-[#FAFF03] block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </Link></li> 
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
