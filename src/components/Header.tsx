import { useState, useEffect } from 'react';

export default function Header() {
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarTransparent(false);
    } else {
      setNavbarTransparent(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-10 transition duration-300 ${navbarTransparent ? 'bg-transparent' : 'bg-white bg-opacity-70'}`}>
      <nav className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Your Company Name</div>
        <ul className="flex space-x-6">
          <li><a href="#home" className="text-gray-800 hover:text-blue-600">Home</a></li>
          <li><a href="#services" className="text-gray-800 hover:text-blue-600">Services</a></li>
          <li><a href="#contact" className="text-gray-800 hover:text-blue-600">Contact Us</a></li>
          <li><a href="#learn" className="text-gray-800 hover:text-blue-600">Learn</a></li>
          <li><a href="#signup" className="text-gray-800 hover:text-blue-600">Sign Up</a></li>
        </ul>
      </nav>
    </header>
  );
}
