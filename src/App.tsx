import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import DiseaseDetection from './pages/DiseaseDetection';
import CropRecommendations from './pages/CropRecommendations';
import Chat from './pages/Chat';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className={isDark ? 'dark' : ''}>
          <Navbar
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
          
          <main className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Home isDark={isDark} />} />
                <Route path="/disease-detection" element={<DiseaseDetection isDark={isDark} />} />
                <Route path="/crop-recommendations" element={<CropRecommendations isDark={isDark} />} />
                <Route path="/chat" element={<Chat isDark={isDark} />} />
              </Routes>
            </div>
          </main>

          <Footer isDark={isDark} />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;