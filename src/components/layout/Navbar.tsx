import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { currentLang, setCurrentLang, t } = useLanguage();

  const handleLanguageToggle = () => {
    setCurrentLang(currentLang === 'EN' ? 'HI' : 'EN');
  };

  return (
    <nav className={`fixed w-full z-50 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">PlantCare</a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-green-500 text-white' : ''}`}>
              {t('home')}
            </a>
            <a href="/disease-detection" className={`px-3 py-2 rounded-md ${location.pathname === '/disease-detection' ? 'bg-green-500 text-white' : ''}`}>
              {t('diseaseDetection')}
            </a>
            <a href="/crop-recommendations" className={`px-3 py-2 rounded-md ${location.pathname === '/crop-recommendations' ? 'bg-green-500 text-white' : ''}`}>
              {t('cropRecommendations')}
            </a>
            
            <button onClick={handleLanguageToggle} className="px-3 py-2">
              {currentLang === 'EN' ? 'HI' : 'EN'}
            </button>
            
            <button onClick={toggleTheme} className="p-2">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <Link 
              to="/chat"
              className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              {t('chat')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <a href="/" className={`block px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-green-500 text-white' : ''}`}>
              {t('home')}
            </a>
            <a href="/disease-detection" className={`block px-3 py-2 rounded-md ${location.pathname === '/disease-detection' ? 'bg-green-500 text-white' : ''}`}>
              {t('diseaseDetection')}
            </a>
            <a href="/crop-recommendations" className={`block px-3 py-2 rounded-md ${location.pathname === '/crop-recommendations' ? 'bg-green-500 text-white' : ''}`}>
              {t('cropRecommendations')}
            </a>
            
            <div className="flex items-center space-x-4 px-3 py-2">
              <button onClick={handleLanguageToggle}>
                {currentLang === 'EN' ? 'HI' : 'EN'}
              </button>
              <button onClick={toggleTheme}>
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link 
                to="/chat"
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
              >
                {t('chat')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;