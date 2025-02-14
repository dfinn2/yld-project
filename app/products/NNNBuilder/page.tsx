'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Navbar'; // Adjust the import path as necessary

interface FormData {
  businessType: string;
  businessName: string;
  businessAddress: string;
  email: string;
  product: string;
  manufacturerNameEnglish: string;
  manufacturerNameChinese: string;
  companyCheckOption: string;
}

export default function NNNBuilder() {
  const { register, handleSubmit, watch, setValue, setError, clearErrors } = useForm<FormData>();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintText, setHintText] = useState('');
  const [showRadioButtons, setShowRadioButtons] = useState(false);

  // Watch the form fields to update the preview dynamically.
  const businessType = watch('businessType', '');
  const businessName = watch('businessName', '');
  const businessAddress = watch('businessAddress', '');
  const email = watch('email', '');
  const product = watch('product', '');
  const manufacturerNameEnglish = watch('manufacturerNameEnglish', '');
  const manufacturerNameChinese = watch('manufacturerNameChinese', '');
  const companyCheckOption = watch('companyCheckOption', '');

  // Determine if the form is complete (all required fields are filled)
  const isComplete = businessType && businessName && email && product && manufacturerNameEnglish && manufacturerNameChinese;

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
    // Send data to the server to generate PDF
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Fetch products based on search query
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?query=${searchQuery}`);
      const data = await response.json();
      console.log('Fetched products:', data); // Log the fetched products
      setProducts(data);
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  // Handle window resize to determine if it's mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle hint modal
  const openHintModal = (text: string) => {
    setHintText(text);
    setShowHintModal(true);
  };

  const closeHintModal = () => {
    setShowHintModal(false);
  };

  // Handle Manufacturer Name (Chinese) field blur
  const handleManufacturerNameChineseBlur = () => {
    if (!manufacturerNameChinese) {
      setShowRadioButtons(true);
      setError('manufacturerNameChinese', {
        type: 'manual',
        message: 'This is important',
      });
    } else {
      setShowRadioButtons(false);
      clearErrors('manufacturerNameChinese');
    }
  };

  // Determine the placeholder text for the business name based on the business type
  const getBusinessNamePlaceholder = () => {
    switch (businessType) {
      case 'Individual Person':
        return 'Joe Bloggs';
      case 'Company':
        return "Joe's Bug Zappers LLC";
      case 'Partnership':
        return 'The Joe and Jane Zapper Partnership';
      case 'Other':
        return 'Enter your full business name';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen p-6 bg-lightBackground text-darkText">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mb-8">NNN Builder</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Reactive Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="businessType" className="block text-sm font-medium text-darkText">
                  Your Business Name
                </label>
                <div
                  className="text-sm text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                  onClick={() => openHintModal('Hint: Enter your business name.')}
                >
                  ?
                </div>
              </div>
              <select
                id="businessType"
                {...register('businessType', { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Business Type</option>
                <option value="Individual Person">Individual Person</option>
                <option value="Company">Company</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
              <input
                id="businessName"
                type="text"
                {...register('businessName', { required: true })}
                placeholder={getBusinessNamePlaceholder()}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="businessAddress" className="block text-sm font-medium text-darkText">
                  Your Business Address
                </label>
                <div
                  className="text-sm text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                  onClick={() => openHintModal('Hint: This can be left blank, but it is best to enter these details.')}
                >
                  ?
                </div>
              </div>
              <input
                id="businessAddress"
                type="text"
                {...register('businessAddress')}
                placeholder="Enter your full address"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium text-darkText">
                  Email
                </label>
                <div
                  className="text-sm text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                  onClick={() => openHintModal('Hint: Enter your email address.')}
                >
                  ?
                </div>
              </div>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter your email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="manufacturerNameEnglish" className="block text-sm font-medium text-darkText">
                  Manufacturer Name (English)
                </label>
                <div
                  className="text-sm text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                  onClick={() => openHintModal('Hint: Enter the manufacturer name in English.')}
                >
                  ?
                </div>
              </div>
              <input
                id="manufacturerNameEnglish"
                type="text"
                {...register('manufacturerNameEnglish', { required: true })}
                placeholder="Enter manufacturer name in English"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="manufacturerNameChinese" className="block text-sm font-medium text-darkText">
                  Manufacturer Name (Chinese)
                </label>
                <div
                  className="text-sm text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                  onClick={() => openHintModal('Hint: Enter the manufacturer name in Chinese.')}
                >
                  ?
                </div>
              </div>
              <input
                id="manufacturerNameChinese"
                type="text"
                {...register('manufacturerNameChinese', { required: true })}
                placeholder={showRadioButtons ? 'This is important' : 'Enter manufacturer name in Chinese'}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded ${showRadioButtons ? 'border-red-500' : ''}`}
                onBlur={handleManufacturerNameChineseBlur}
              />
              {showRadioButtons && (
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register('companyCheckOption')}
                      value="check"
                      onClick={() => setShowAccordion(true)}
                    />
                    <span className="ml-2">+$19 get a company check</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      {...register('companyCheckOption')}
                      value="later"
                      onClick={() => setShowAccordion(false)}
                    />
                    <span className="ml-2">I will enter these details later before signing</span>
                  </label>
                </div>
              )}
              {showAccordion && (
                <div className="mt-2 p-4 border border-gray-300 rounded">
                  <p>This is important, get a check</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <hr className="my-4" />
              <h3 className="text-lg font-medium text-darkText">Details about your product</h3>
              <label htmlFor="product" className="block text-sm font-medium text-darkText mt-4">
                Product
              </label>
              <input
                id="product"
                type="text"
                {...register('product', { required: true })}
                placeholder="Search for a product"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {products.length > 0 && (
                <ul className="mt-2 border border-gray-300 rounded">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setValue('product', product.name);
                        setSearchQuery(product.name);
                        setProducts([]);
                      }}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
              {/* Temporary display of fetched products */}
              <pre>{JSON.stringify(products, null, 2)}</pre>
            </div>

            {/* The form is handled reactively, so no explicit submit button is needed here */}
            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
          {isMobileView && (
            <button
              onClick={() => document.getElementById('document-preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Preview Document
            </button>
          )}
        </div>

        {/* Right Column: Document Template Preview */}
        <div
          id="document-preview"
          className="w-full md:w-1/2 bg-white text-black p-6 rounded-lg shadow-lg border border-gray-200 font-serif"
          style={{
            fontFamily: 'Noto Serif, serif',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            height: '297mm', // A4 height
            width: '210mm', // A4 width
            backgroundColor: 'white',
            color: 'black',
            margin: 'auto',
            padding: '20px',
          }}
        >
          <div style={{ userSelect: 'none', pointerEvents: 'none' }}>
            <h2 className="text-2xl font-bold mb-4">
              {businessName || 'Your Business Name'}
            </h2>
            <p className="mb-4">
              This document is prepared for{' '}
              <strong>{businessName || 'Your Business Name'}</strong> at{' '}
              <strong>{businessAddress || 'Your Business Address'}</strong>.
            </p>
            <p className="mb-4">
              {email ? `We will reach out to you at ${email} once the document is ready.` : 'Enter your email to get updates.'}
            </p>
            <p>
              [This is a live preview of your document. As you answer the questions, the fields in this template update dynamically.]
            </p>
          </div>

          {/* Show Buy Document button when all fields are complete */}
          {isComplete && (
            <div className="mt-8">
              <button onClick={handleSubmit(onSubmit)} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Buy Document
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>{hintText}</p>
            <button
              onClick={closeHintModal}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
