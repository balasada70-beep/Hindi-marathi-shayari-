
import React, { useState, useCallback } from 'react';
import { Language, ShayriResult } from './types';
import LanguageSelector from './components/LanguageSelector';
import ShayriCard from './components/ShayriCard';
import LoadingSpinner from './components/LoadingSpinner';
import { generateShayri } from './services/geminiService';

const FeatherIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.Hindi);
  const [topic, setTopic] = useState('');
  const [shayriResult, setShayriResult] = useState<ShayriResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useSearch, setUseSearch] = useState(false);

  const placeholders = {
    [Language.Hindi]: 'विषय लिखें (जैसे प्रेम, जीवन...)',
    [Language.Marathi]: 'विषय लिहा (उदा. प्रेम, जीवन...)',
  };
  
  const buttonTexts = {
    [Language.Hindi]: 'शायरी बनाएँ',
    [Language.Marathi]: 'शायरी बनवा',
  };

  const handleGenerateShayri = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setShayriResult(null);
    try {
      const result = await generateShayri(topic, language, useSearch);
      setShayriResult(result);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, language, useSearch]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 selection:bg-amber-500/30">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" 
          style={{backgroundImage: "url('https://picsum.photos/1920/1080?blur=5&grayscale')"}}
        ></div>
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto flex-grow">
            <header className="text-center my-8 md:my-12">
                <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                    शायरी संगम
                </h1>
                <p className="text-slate-300 mt-2 text-lg">AI द्वारा निर्मित हिंदी और मराठी शायरी</p>
            </header>

            <main className="w-full flex-grow flex flex-col items-center">
                <div className="mb-8">
                    <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
                </div>

                <div className="w-full max-w-2xl px-4 md:px-0 mt-auto pb-36 md:pb-0">
                    {isLoading && <LoadingSpinner />}
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    {shayriResult && !isLoading && <ShayriCard shayri={shayriResult.text} sources={shayriResult.sources} />}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-lg border-t border-slate-700 md:relative md:bg-transparent md:border-0 md:backdrop-filter-none md:mt-8">
                    <div className="w-full max-w-2xl mx-auto">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerateShayri()}
                                placeholder={placeholders[language]}
                                className="flex-grow bg-slate-800 border border-slate-600 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                            />
                            <button
                                onClick={handleGenerateShayri}
                                disabled={isLoading}
                                className="flex items-center justify-center bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-full text-lg hover:bg-amber-300 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                            >
                                <FeatherIcon />
                                <span className="hidden md:inline ml-2">{buttonTexts[language]}</span>
                            </button>
                        </div>
                        <div className="flex justify-center items-center mt-3">
                            <input
                                type="checkbox"
                                id="use-search"
                                checked={useSearch}
                                onChange={(e) => setUseSearch(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-500 text-amber-500 focus:ring-amber-500 bg-slate-700"
                                aria-describedby="search-description"
                            />
                            <label htmlFor="use-search" className="ml-2 text-sm text-slate-300">
                                Ground with Google Search
                            </label>
                            <p id="search-description" className="sr-only">Enhance generation with real-time information from Google Search.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
};

export default App;
