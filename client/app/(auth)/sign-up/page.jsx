'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import Link from 'next/link';

const SignUp = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form submitted:', formData);
  };

  if (!mounted) {
    return null; // Prevent hydration issues by not rendering until client-side
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1a1f37]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-[#f0f2f5] rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-3 text-[#1a1f37]">
            Create Account
          </h2>

          <p className="text-center mb-8 text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="text-[#0055ff] hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border-2 border-transparent focus:border-[#0055ff] focus:outline-none transition-all duration-200 text-gray-700 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border-2 border-transparent focus:border-[#0055ff] focus:outline-none transition-all duration-200 text-gray-700 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border-2 border-transparent focus:border-[#0055ff] focus:outline-none transition-all duration-200 text-gray-700 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border-2 border-transparent focus:border-[#0055ff] focus:outline-none transition-all duration-200 text-gray-700 text-sm"
                required
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border-2 border-transparent focus:border-[#0055ff] focus:outline-none transition-all duration-200 text-gray-700 text-sm"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0055ff] text-white py-3.5 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-lg shadow-blue-500/30 mt-6"
            >
              Create Account
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp; 