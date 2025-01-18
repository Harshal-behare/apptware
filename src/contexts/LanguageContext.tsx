import React, { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

type LanguageContextType = {
  currentLang: 'EN' | 'HI';
  setCurrentLang: (lang: 'EN' | 'HI') => void;
  t: (key: keyof typeof translations.EN) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<'EN' | 'HI'>('EN');

  const t = (key: keyof typeof translations.EN) => {
    return translations[currentLang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 