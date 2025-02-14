"use client";

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [navbarTransparent, setNavbarTransparent] = useState(true)

  const handleGetStartedClick = () => {
    setShowForm(true)
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarTransparent(false)
    } else {
      setNavbarTransparent(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <>
      <Head>
        <title>Protect Your IP in China | Your Company Name</title>
        <meta
          name="description"
          content="Secure your intellectual property with our expert legal templates and services, tailored for protection in China."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <header className={`fixed w-full z-10 transition duration-300 ${navbarTransparent ? 'bg-transparent' : 'bg-white bg-opacity-70'}`}>
        <nav className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Your Company Name</div>
          <ul className="flex space-x-6">
            <li><a href="#home" className="text-gray-900 hover:text-blue-600">Home</a></li>
            <li><a href="#services" className="text-gray-900 hover:text-blue-600">Services</a></li>
            <li><a href="#contact" className="text-gray-900 hover:text-blue-600">Contact Us</a></li>
            <li><a href="#learn" className="text-gray-900 hover:text-blue-600">Learn</a></li>
            <li><a href="#signup" className="text-gray-900 hover:text-blue-600">Sign Up</a></li>
          </ul>
        </nav>
      </header>

      <main className="min-h-screen flex flex-col bg-white font-sans">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center border-b border-gray-300">
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
                Protect Your Intellectual Property in China
              </h1>
              <p className="text-lg md:text-2xl mb-8 text-gray-800">
                Secure your ideas and innovations with expert legal services and tailored document templates.
              </p>
            </div>
            <div className="relative md:w-1/2">
              <img src="/images/cnguy.png" alt="CN Guy" className="mx-auto mb-8 max-w-full h-auto" />
              <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <Link href="/products/NNNBuilder" legacyBehavior>
                  <a className="inline-block border border-black text-black font-semibold py-3 px-6 rounded-md hover:bg-[#FAFF03] hover:text-black transition">
                    Get Started
                  </a>
                </Link>
                <Link href="#learn" legacyBehavior>
                  <a className="inline-block border border-black text-black font-semibold py-3 px-6 rounded-md hover:bg-[#FAFF03] hover:text-black transition">
                    Learn More
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        {showForm && (
          <section id="form-section" className="container mx-auto px-6 md:px-12 py-12 border-b border-gray-300">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    <input type="radio" name="option" value="nnn" className="mr-2" />
                    I'm just getting started, and looking for an NNN
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    <input type="radio" name="option" value="protect-business" className="mr-2" />
                    I'm looking to protect my business
                  </label>
                </div>
                <button type="submit" className="border border-black bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-[#FAFF03] hover:text-black transition">
                  Submit
                </button>
              </form>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section id="services" className="container mx-auto px-6 md:px-12 py-12 border-b border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Service 1</h3>
              <p className="text-gray-700">Description of Service 1.</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Service 2</h3>
              <p className="text-gray-700">Description of Service 2.</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Service 3</h3>
              <p className="text-gray-700">Description of Service 3.</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/services" className="border border-black text-black text-blue-600 font-medium hover:bg-[#FAFF03] hover:text-black transition">
              See More Products
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        button:hover {
          box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
        }

        button:active {
          box-shadow: none;
        }
      `}</style>
    </>
  )
}