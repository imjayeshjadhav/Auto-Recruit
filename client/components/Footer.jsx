'use client';

import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-white py-10 px-6 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        {/* Gradient Line */}
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 rounded-full"></div>

        {/* Inspiring Line */}
        <p className="text-xl md:text-2xl font-semibold flex justify-center items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          <span className="bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Empowering Recruitment with Intelligence & Insight
          </span>
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
        </p>

        {/* Button to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 px-4 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:to-red-500 rounded-full transition-all duration-300"
        >
          <ArrowUp className="w-4 h-4" />
          Back to Top
        </button>

        {/* Divider */}
        <hr className="border-t border-gray-800 w-3/4 mx-auto" />

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-white font-medium">Auto-Recruit</span>. All rights reserved.
        </p>

      
      </div>
    </footer>
  );
};

export default Footer;
