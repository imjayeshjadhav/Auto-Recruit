'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('candidate');
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = activeTab === 'admin'
        ? 'http://localhost:8080/auth/sign-in/admin'
        : 'http://localhost:8080/auth/sign-in/candidate';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('userData', JSON.stringify({
        ...data.user,
        token: data.token,
        userType: activeTab
      }));

      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.href = activeTab === 'admin' 
          ? '/admin' 
          : '/profile';
      }, 1500);

    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1a1f37]">
      <ToastContainer />
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
              type="button"
              onClick={() => setActiveTab('candidate')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'candidate'
                  ? 'bg-[#0055ff] text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:text-[#0055ff]'
              }`}
            >
              candidate
            </button>
            <button
              type="button"
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
            {"Don't have an account? "}
            <Link
              href={`/sign-up?userType=${activeTab}`}
              className="text-[#0055ff] hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
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

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center text-gray-600">
                <input 
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4 rounded border-gray-300 text-[#0055ff] focus:ring-[#0055ff]"
                />
                Remember me
              </label>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-[#0055ff] text-white py-3.5 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-lg shadow-blue-500/30 mt-6 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;