'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';

const SignIn = () => {
  const [activeTab, setActiveTab] = useState('client');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1a1f37]">
      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-[#f0f2f5] rounded-3xl shadow-2xl p-8">
          {/* Tab Navigation */}
          <div className="flex mb-8 bg-white rounded-xl p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab('client')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'client'
                  ? 'bg-[#0055ff] text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:text-[#0055ff]'
              }`}
            >
              Client
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-[#0055ff] text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:text-[#0055ff]'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Form Title */}
          <h2 className="text-2xl font-bold text-center mb-3 text-[#1a1f37]">
            Welcome Back
          </h2>

          {/* Toggle between Login and Signup */}
          <p className="text-center mb-8 text-gray-600 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => setIsLogin(false)}
              className="text-[#0055ff] hover:text-blue-700 font-medium"
            >
              Sign up 
            </button>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border-2 border-transparent focus:border-[#0055ff] focus:outline-none transition-all duration-200 text-gray-700 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border-2 border-transparent focus:border-[#0055ff] focus:outline-none transition-all duration-200 text-gray-700 text-sm"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center text-gray-600">
                <input 
                  type="checkbox" 
                  className="mr-2 w-4 h-4 rounded border-gray-300 text-[#0055ff] focus:ring-[#0055ff]"
                />
                Remember me
              </label>
              <button type="button" className="text-[#0055ff] hover:text-blue-700">
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0055ff] text-white py-3.5 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-lg shadow-blue-500/30 mt-6"
            >
              Login
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;