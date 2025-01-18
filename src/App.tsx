import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import DiseaseDetection from './pages/DiseaseDetection';
import CropRecommendations from './pages/CropRecommendations';
import Chatbot from './components/features/chat/Chatbot';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLanguage = () => setCurrentLang(currentLang === 'EN' ? 'HI' : 'EN');
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);

  return (
    <BrowserRouter>
      <div className={isDark ? 'dark' : ''}>
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          toggleLanguage={toggleLanguage}
          currentLang={currentLang}
          toggleChatbot={toggleChatbot}
        />
        
        <main className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home isDark={isDark} />} />
              <Route path="/disease-detection" element={<DiseaseDetection isDark={isDark} />} />
              <Route path="/crop-recommendations" element={<CropRecommendations isDark={isDark} />} />
            </Routes>
          </div>
        </main>

        <Chatbot isDark={isDark} isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
        <Footer isDark={isDark} />
      </div>
    </BrowserRouter>
  );
}

export default App;