import React, { useState } from "react"; 

import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-md sticky top-0 bg-gray-900 z-10" style={{background:"#202120"}}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div>
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap p-1 rounded-md lg:border lg:border-white">
              <span className="text-slate-600">product</span>
              <span className="text-slate-200">Store</span>
            </h1>
          </Link>
        </div>
        <div className="sm:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-16 right-0 w-40 rounded-lg border border-double-2 p-4" style={{background:"#202120"}}>
              <Link to="/" className="block text-white mb-2 ">
              <p className="hover:text-gray-900">Products</p>
              </Link>
              <Link to="/category" className="block text-white mb-2 hover:text-gray-900">
                Categories
              </Link>
              <Link to="/users" className="block text-white hover:text-gray-900">
                Users
              </Link>
            </div>
          )}
        </div>
        <div className="hidden sm:flex justify-between gap-4">
          <Link to="/" className="text-white transition duration-300 ease-in-out hover:text-gray-600">
            Products
          </Link>
          <Link to="/category" className="text-white transition duration-300 ease-in-out hover:text-gray-600">
            Categories
          </Link>
          <Link to="/users" className="text-white transition duration-300 ease-in-out hover:text-gray-600">
            Users
          </Link>
        </div>
      </div>
    </header>
  );
}
