// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          CoMake
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/editor" className="hover:text-gray-400">Editor</Link>
          <Link to="/draw" className="hover:text-gray-400">Draw</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
