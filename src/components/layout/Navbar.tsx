import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  currentLang: string;
  toggleChatbot: () => void;
}

const Navbar = ({ isDark, toggleTheme, toggleLanguage, currentLang, toggleChatbot }: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Disease Detection', path: '/disease-detection' },
    { name: 'Crop Recommendations', path: '/crop-recommendations' },
    { name: 'Chatbot', path: null, action: toggleChatbot }
  ];

  return (
    <nav className={`fixed w-full z-50 ${
      isDark 
        ? 'bg-gray-900/95 backdrop-blur-md' 
        : 'bg-white/95 backdrop-blur-md'
    } shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-green-600">Agro</span>Care
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                item.path === null ? (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className={`${
                      isDark 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-700 hover:text-gray-900'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-green-600 hover:text-white`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'bg-green-600 text-white'
                        : isDark 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-700 hover:text-gray-900'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-green-600 hover:text-white`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              } hover:bg-green-600 hover:text-white transition-all duration-300`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              } hover:bg-green-600 hover:text-white transition-all duration-300`}
            >
              <Languages size={20} />
              <span>{currentLang}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } hover:bg-green-600 hover:text-white transition-colors`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            {navItems.map((item) => (
              item.path === null ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  } hover:bg-green-600 hover:text-white`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-green-600 text-white'
                      : isDark 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-700 hover:text-gray-900'
                  } hover:bg-green-600 hover:text-white`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;