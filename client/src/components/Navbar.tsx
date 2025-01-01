import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Paintbrush, Home, Menu, X, LogInIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { to: '/editor', label: 'Editor', icon: <Code className="w-4 h-4" /> },
    { to: '/draw', label: 'Draw', icon: <Paintbrush className="w-4 h-4" /> },
    { to: '/login', label: 'Login', icon: <LogInIcon className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-200 to-black-200 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              CoMake
            </span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="relative px-4 py-2 group"
                onMouseEnter={() => setActiveItem(item.label)}
                onMouseLeave={() => setActiveItem('')}
              >
                <span className="relative z-10 flex items-center space-x-2 text-gray-300 group-hover:text-white transition-colors duration-200">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                <span 
                  className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-200 ease-out ${
                    activeItem === item.label ? 'scale-100' : ''
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
