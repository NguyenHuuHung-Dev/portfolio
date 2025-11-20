import React, { createContext, useState, useContext } from 'react';
import en from '../locales/en.json';
import vi from '../locales/vi.json';

const LanguageContext = createContext();

const translations = {
  en,
  vi,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('vi');

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result[k];
      if (!result) {
        return key;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
