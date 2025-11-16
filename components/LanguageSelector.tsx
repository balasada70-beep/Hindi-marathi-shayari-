
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const languages = [
    { id: Language.Hindi, name: 'हिंदी' },
    { id: Language.Marathi, name: 'मराठी' },
  ];

  return (
    <div className="flex justify-center space-x-4 bg-slate-800/60 p-2 rounded-full backdrop-blur-sm border border-slate-700">
      {languages.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onLanguageChange(lang.id)}
          className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
            selectedLanguage === lang.id
              ? 'bg-amber-400 text-slate-900 shadow-md'
              : 'text-gray-300 hover:bg-slate-700'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
