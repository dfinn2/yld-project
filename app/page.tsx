"use client";

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Navbar from './components/Navbar' // Import the Navbar component
import Footer from './components/Footer';
import FlowchartIP from './components/FlowchartIP';


export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [navbarTransparent, setNavbarTransparent] = useState(true)
  const [highlightAnimated, setHighlightAnimated] = useState(false)

  const handleGetStartedClick = () => {
    setShowForm(true)
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })
  }
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlightAnimated(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
      <div className="h-3/4  p-4 bg-zinc-50">
      <Navbar /> 

      <main className="h-3/4">
        {/* Hero Section */}
        <section id="home" className="flex items-center">
      {/* Left Column */}
      <div className="w-full md:w-[50%] p-8 z-40 " >
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 relative">
          Good ideas are rare, so{' '}
          <span
            className={`relative before:absolute before:left-0 before:right-0 before:bg-[#1ce4ff] before:h-2 before:bottom-[-5px] before:opacity-100 before:scale-x-0 before:origin-bottom-left before:transition-transform before:duration-1000 before:delay-500 before:rounded-lg ${
              highlightAnimated ? 'before:scale-x-100' : ''
            }`}
          >
            protect
          </span>{' '}
          them.
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-gray-800">
          Follow our expert guidance from start to finish, and secure your intellectual property in China.
        </p>
        
        <div className="flex flex-row items-center space-y-4 md:space-y-0 md:space-x-2 mt-1">
          <span className="relative mr-2 flex items-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--highlightBlue] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
          </span>
          <Link
            href="/products/NNNBuilder"
            className="inline-block border border-black shadow-[4px_4px_0_0_black] font-semibold py-3 px-6 rounded-md hover:bg-[var(--highlightYellow)] hover:text-black transition"
          >
            Get your NNN Started
          </Link>
        </div>
        
      </div>
        {/*  bg-[rgba(250,255,3,0.25)] [background-image:repeating-linear-gradient(180deg,transparent,transparent_29px,rgba(255,0,0,0.2)_29px,rgba(255,0,0,0.2)_30px)] p-8 LEGAL NOTE PAD  */}
      {/* Right Column (Hidden on small screens) */}
      <div className="hidden md:block w-[60%] overflow-visible pb-20">
        <img
          src="/images/cn_guy_lined.svg"
          alt="CN Guy"
          className="w-full h-full object-cover scale-[1.05] origin-right pb-10"
        />
      </div>
    </section>

        

        {/* Services Section */}
        <section id="services" className="container mx-auto px-6 md:px-12 py-12 border-b border-t border-gray-300 bg-slate-100">
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Service 1</h3>
              <p className="text-gray-700">Description of Service 1.</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Service 2</h3>
              <p className="text-gray-700">Description of Service 2.</p>
            </div>
            <div className="p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Service 3</h3>
              <p className="text-gray-700">Description of Service 3.</p>
            </div>
          </div>
          <div className="mt-6 text-center p-4">
            <a href="/services" className="inline-block border border-black shadow-[4px_4px_0_0_black] font-semibold py-3 px-6 rounded-md hover:bg-[var(--highlightYellow)] hover:text-black transition">
              See More Products
            </a>
          </div>
        </section>

        {/* Steps Flowchart Section */}
        <FlowchartIP />

        
        <Link href="#learn" className="inline-block border border-black text-black font-semibold py-3 px-6 rounded-md hover:bg-[var(--highlightYellow)] hover:text-black transition">
                    Learn More
        </Link>
        {/* Footer */}
        <Footer />  
      </main>
      </div>

      <style jsx>{`
        .highlight-button {
          position: relative;
          overflow: hidden;
        }

        .highlight-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--highlightYellow);
          z-index: -1;
          transform: translateX(-100%);
          transition: transform 0.5s ease-in-out;
        }

        .highlight-button:hover::before {
          transform: translateX(0);
        }
      `}</style>
    </>
  )
}