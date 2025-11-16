
import React, { useState } from 'react';
import { Source } from '../types';

interface ShayriCardProps {
  shayri: string;
  sources?: Source[];
}

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ShayriCard: React.FC<ShayriCardProps> = ({ shayri, sources }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shayri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-400/20 rounded-xl shadow-lg p-6 md:p-8 w-full max-w-2xl mx-auto relative animate-fade-in-up">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 text-sm px-3 py-1.5 rounded-full transition-all duration-300 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-slate-700 text-amber-300 hover:bg-amber-400 hover:text-slate-900'
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="whitespace-pre-wrap text-gray-100 text-xl md:text-2xl leading-relaxed text-center">
        {shayri.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      {sources && sources.length > 0 && (
        <div className="mt-6 pt-4 border-t border-amber-400/20">
          <h3 className="text-sm font-semibold text-amber-300 mb-2 text-center md:text-left">Sources</h3>
          <ul className="list-none space-y-1 text-center md:text-left">
            {sources.map((source, index) => (
              source.web && (
                <li key={index}>
                  <a
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 text-sm hover:text-amber-400 transition-colors truncate block"
                    title={source.web.title}
                  >
                    {`[${index + 1}] ${source.web.title || source.web.uri}`}
                  </a>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShayriCard;
