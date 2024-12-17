import React, { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiHome, FiCode, FiEdit } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold">CoMake</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
            <FiHome size={20} />
            <span>Home</span>
          </Link>
          <Link to="/editor" className="flex items-center space-x-2 hover:text-gray-300">
            <FiCode size={20} />
            <span>Editor</span>
          </Link>
          <Link to="/draw" className="flex items-center space-x-2 hover:text-gray-300">
            <FiEdit size={20} />
            <span>Draw</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
            <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
          {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700">
              <Link 
            to="/"
            onClick={toggleMobileMenu}
            className="block px-4 py-2 hover:bg-gray-600"
          >
            <div className="flex items-center space-x-2">
              <FiHome size={20} />
              <span>Home</span>
            </div>
              </Link>
              <Link 
            to="/editor"
            onClick={toggleMobileMenu}
            className="block px-4 py-2 hover:bg-gray-600"
          >
            <div className="flex items-center space-x-2">
              <FiCode size={20} />
              <span>Editor</span>
            </div>
              </Link>
              <Link 
            to="/draw"
            onClick={toggleMobileMenu}
            className="block px-4 py-2 hover:bg-gray-600"
          >
            <div className="flex items-center space-x-2">
              <FiEdit size={20} />
              <span>Draw</span>
            </div>
              </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
