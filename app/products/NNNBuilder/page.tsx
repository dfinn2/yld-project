"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar"; // Adjust the import path as necessary
import ReactModal from 'react-modal';
import NNNDocument from './NNNDocument';

interface FormData {
  businessType: string;
  businessName: string;
  businessAddress: string;
  email: string;
  product: string;
  productNameOrTrademark: string;
  skus: string;
  manufacturerNameEnglish: string;
  manufacturerNameChinese: string;
  companyCheckOption: string;
  chineseTrademark: string;
  trademarkOption: string;
}

interface Product {
  id: string;
  name: string;
}

export default function NNNBuilder() {
  const { register, handleSubmit, watch, setValue, setError, clearErrors } =
    useForm<FormData>();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showAccordion, setShowAccordion] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintText, setHintText] = useState("");
  const [showTrademarkAccordion, setShowTrademarkAccordion] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Watch the form fields to update the preview dynamically.
  const businessType = watch("businessType", "");
  const businessName = watch("businessName", "");
  const businessAddress = watch("businessAddress", "");
  const email = watch("email", "");
  const product = watch("product", "");
  const productNameOrTrademark = watch("productNameOrTrademark", "");
  const skus = watch("skus", "");
  const manufacturerNameEnglish = watch("manufacturerNameEnglish", "");
  const manufacturerNameChinese = watch("manufacturerNameChinese", "");
  const chineseTrademark = watch("chineseTrademark", "");
  const trademarkOption = watch("trademarkOption", "");

  // Determine if the form is complete (all required fields are filled)
  const isComplete =
    businessType &&
    businessName &&
    email &&
    product &&
    manufacturerNameEnglish &&
    manufacturerNameChinese;

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    // Send data to the server to generate PDF
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Fetch products based on search query
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?query=${searchQuery}`);
      const data: Product[] = await response.json();
      setProducts(data);
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  // Handle window resize and scroll events
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
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
      setShowAccordion(true);
      setError("manufacturerNameChinese", {
        type: "manual",
        message: "This is important",
      });
    } else {
      setShowAccordion(false);
      clearErrors("manufacturerNameChinese");
    }
  };

  // Handle Chinese Trademark field change
  const handleChineseTrademarkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowTrademarkAccordion(e.target.value === "no");
  };

  // Determine the placeholder text for the business name based on the business type
  const getBusinessNamePlaceholder = () => {
    switch (businessType) {
      case "Individual Person":
        return "Joe Bloggs";
      case "Company":
        return "Joe's Bug Zappers LLC";
      case "Partnership":
        return "The Joe and Jane Zapper Partnership";
      case "Other":
        return "Enter your full business name";
      default:
        return "";
    }
  };

  //Remove duplicate products by name
  const uniqueProducts = Array.from(
    new Map(products.map((product) => [product.name, product])).values()
  );

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mb-8 mt-10">NNN Builder</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Explanation and Reactive Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow ">
          {!showForm ? (
            <div className="mb-4 ">
              <h2 className="text-2xl font-semibold mb-4">What is an NNN Agreement?</h2>
              <p className="text-gray-700 mb-4">
                An NNN Agreement (Non-Disclosure, Non-Use, Non-Circumvention) is a legal contract that helps protect your intellectual property when working with manufacturers in China. It ensures that your business secrets are not disclosed, used, or bypassed by the manufacturer.
              </p>
              <div className="flex flex-col md:flex-row justify-left items-center space-y-4 md:space-y-0 md:space-x-4 mt-1">
              <span className="relative flex size-3">  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--highlightBlue] opacity-75"></span>  <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span></span>
              <button
                onClick={() => setShowForm(true)}
                className="inline-block border border-black shadow-[4px_4px_0_0_black] font-semibold py-3 px-6 rounded-md hover:bg-[var(--highlightYellow)] hover:text-black transition"
              >        start building NNN
              </button>
            </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="businessType"
                    className="block text-sm font-medium text-darkText"
                  >
                    Your Business Name
                  </label>
                  <div
                    className="text-sm text-white rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-[#FAFF03]"
                    onClick={() =>
                      openHintModal("Hint: Enter your business name.")
                    }
                  >
                    ?
                  </div>
                </div>
                <select
                  id="businessType"
                  {...register("businessType", { required: true })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
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
                  {...register("businessName", { required: true })}
                  placeholder={getBusinessNamePlaceholder()}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="businessAddress"
                    className="block text-sm font-medium text-darkText"
                  >
                    Your Business Address
                  </label>
                  <div
                    className="text-sm text-white rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-[#FAFF03]"
                    onClick={() =>
                      openHintModal(
                        "Hint: This can be left blank, but it is best to enter these details."
                      )
                    }
                  >
                    ?
                  </div>
                </div>
                <input
                  id="businessAddress"
                  type="text"
                  {...register("businessAddress")}
                  placeholder="Enter your full address"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-darkText"
                  >
                    Email
                  </label>
                  <div
                    className="text-sm text-white rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-[#FAFF03]"
                    onClick={() =>
                      openHintModal("Hint: Enter your email address.")
                    }
                  >
                    ?
                  </div>
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="manufacturerNameEnglish"
                    className="block text-sm font-medium text-darkText"
                  >
                    Manufacturer Name (English)
                  </label>
                  <div
                    className="text-sm text-white rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-[#FAFF03]"
                    onClick={() =>
                      openHintModal(
                        "Hint: Enter the manufacturer name in English."
                      )
                    }
                  >
                    ?
                  </div>
                </div>
                <input
                  id="manufacturerNameEnglish"
                  type="text"
                  {...register("manufacturerNameEnglish", { required: true })}
                  placeholder="Enter manufacturer name in English"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="manufacturerNameChinese"
                    className="block text-sm font-medium text-darkText"
                  >
                    Manufacturer Name (Chinese)
                  </label>
                  <div
                    className="text-sm text-white rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-[#FAFF03]"
                    onClick={() =>
                      openHintModal(
                        "Hint: Enter the manufacturer name in Chinese."
                      )
                    }
                  >
                    ?
                  </div>
                </div>
                <input
                  id="manufacturerNameChinese"
                  type="text"
                  {...register("manufacturerNameChinese", { required: true })}
                  placeholder="Enter manufacturer name in Chinese"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                  onBlur={handleManufacturerNameChineseBlur}
                />
              </div>

              {showAccordion && (
                <div className="mt-2 p-4 border border-gray-300 rounded bg-[#FAFF03] bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]">
                  <p>
                    Many Chinese companies use English names to make life easier
                    for customers, be sure that you have requested and checked
                    your manufacturer's company registration certificate to
                    confirm their true Chinese business name.{" "}
                    <span>learn more</span>
                  </p>
                  <div className="mt-2">
                    <label className="inline-flex items-center pl-4">
                      <input
                        type="radio"
                        {...register("manufacturerNameChinese")}
                        value="check"
                        defaultChecked
                        onClick={() => {
                          setValue("manufacturerNameChinese", "check");
                        }}
                      />
                      <span
                        className={`ml-2 ${
                          manufacturerNameChinese === "check" ? "font-bold" : ""
                        }`}
                      >
                        +$19 get a company check
                      </span>
                    </label>
                    <label className="inline-flex items-center pl-4">
                      <input
                        type="radio"
                        {...register("manufacturerNameChinese")}
                        value="later"
                        onClick={() => {
                          setValue("manufacturerNameChinese", "later");
                        }}
                      />
                      <span
                        className={`ml-2 ${
                          manufacturerNameChinese === "later" ? "font-bold" : ""
                        }`}
                      >
                        I will enter these details later before signing
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <hr className="my-4" />
                <h3 className="text-lg font-medium text-darkText">
                  Details about your product
                </h3>
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-darkText mt-4"
                >
                  Product
                </label>
                <input
                  id="product"
                  type="text"
                  {...register("product", { required: true })}
                  placeholder="Search for a product"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {uniqueProducts.length > 0 && (
                  <ul className="mt-2 border border-gray-300 rounded">
                    {uniqueProducts.map((product) => (
                      <li
                        key={product.id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setValue("product", product.name);
                          setSearchQuery(product.name);
                          setProducts([]);
                        }}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="productNameOrTrademark"
                  className="block text-sm font-medium text-darkText"
                >
                  Product Name or Trademark
                </label>
                <input
                  id="productNameOrTrademark"
                  type="text"
                  {...register("productNameOrTrademark", { required: true })}
                  placeholder="Enter product name or trademark"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="skus"
                  className="block text-sm font-medium text-darkText"
                >
                  SKUs
                </label>
                <input
                  id="skus"
                  type="text"
                  {...register("skus", { required: true })}
                  placeholder="Enter SKUs"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]"
                />
              </div>

              <div className="mb-4 mt-2 p-4 border border-gray-300 rounded bg-[#FAFF03] bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]">
                <label className="block text-sm font-medium text-darkText">
                  Have you applied for a Chinese Trademark for protection of your
                  brand?
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-left">
                    <input
                      type="radio"
                      {...register("chineseTrademark")}
                      value="yes"
                      onClick={() => setShowTrademarkAccordion(false)}
                    />
                    <span className="ml-2">
                      Yes, I have already registered my brand in China.
                    </span>
                  </label>
                  <label className="inline-flex items-left">
                    <input
                      type="radio"
                      {...register("chineseTrademark")}
                      value="no"
                      onClick={handleChineseTrademarkChange}
                    />
                    <span className="ml-2">
                      No, I haven't applied for a Chinese trademark.
                    </span>
                  </label>
                </div>
              </div>

              {showTrademarkAccordion && (
                <div className="mt-2 p-4 border border-gray-300 rounded bg-[#FAFF03] bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-[#1ce4ff]">
                  <p>Be careful</p>
                  <div className="mt-2">
                    <label className="inline-flex items-center pl-4">
                      <input
                        type="radio"
                        {...register("trademarkOption")}
                        value="understand"
                      />
                      <span
                        className={`ml-2 ${
                          trademarkOption === "understand" ? "font-bold" : ""
                        }`}
                      >
                        I understand
                      </span>
                    </label>
                    <label className="inline-flex items-center pl-4">
                      <input
                        type="radio"
                        {...register("trademarkOption")}
                        value="apply"
                      />
                      <span
                        className={`ml-2 ${
                          trademarkOption === "apply" ? "font-bold" : ""
                        }`}
                      >
                        I would like to apply
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* The form is handled reactively, so no explicit submit button is needed here */}
              <button type="submit" className="hidden">
                Submit
              </button>
            </form>
          )}
          {isMobileView && (
            <button
              onClick={() =>
                document
                  .getElementById("document-preview")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Preview Document
            </button>
          )}
        </div>

        {/* Right Column: Document Template Preview  - add blur or overlay to document frame*/}
        <div id="document-preview-wrapper" className={`document-preview-wrapper w-full md:w-1/2 ${!showForm ? 'bg-black' : ''}`}>
          <NNNDocument
            businessName={businessName}
            businessAddress={businessAddress}
            email={email}
            product={product}
            productNameOrTrademark={productNameOrTrademark}
            skus={skus}
          />
          
          <div className="flex flex-row justify-center mt-4 gap-4">
            {isComplete && (
              <button
                onClick={handleSubmit(onSubmit)}
                className="border border-black text-black py-1 px-2 rounded-md hover:bg-[#FAFF03] hover:text-black transition"
              >
                Buy Document
              </button>
            )}
            <button
              onClick={openLightbox}
              className="border border-black text-black py-1 px-2 rounded-md hover:bg-[#FAFF03] hover:text-black transition"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      {/* Lightbox Modal */}
      <ReactModal
        isOpen={isLightboxOpen}
        onRequestClose={closeLightbox}
        contentLabel="Document Preview"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 overflow-y-auto">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-red-600 text-white py-3 px-5 rounded hover:bg-red-700 transition"
            
          >
            Close Preview
          </button>
          <NNNDocument
            businessName={businessName}
            businessAddress={businessAddress}
            email={email}
            product={product}
            productNameOrTrademark={productNameOrTrademark}
            skus={skus}
          />
        </div>
      </ReactModal>
      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>{hintText}</p>
            <button
              onClick={closeHintModal}
              className="mt-4 border border-black text-black py-1 px-2 rounded-md hover:bg-[#FAFF03] hover:text-black transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .document-preview {
          max-height: 80vh;
          overflow-y: auto;
          padding: 20px;
        }

        .document-preview-page {
          page-break-after: always;
          margin-bottom: 20px;
        }

        .document-preview-page:last-child {
          page-break-after: auto;
        }
/* Add fade-in animation for form button*/
        .animate-fade-in {
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
      `}</style>
    </div>
  );
}
