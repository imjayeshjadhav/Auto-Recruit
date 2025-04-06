'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState('candidate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const type = searchParams.get('userType') || 'candidate';
    setUserType(type);
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    
    try {
      const endpoint = userType === 'admin' 
        ? 'http://localhost:8080/auth/sign-up/admin'
        : 'http://localhost:8080/auth/sign-up/candidate';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('userData', JSON.stringify({
        ...data.user,
        token: data.token,
        userType
      }));

      toast.success('Account created successfully! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.href = userType === 'admin' 
          ? '/admin/dashboard' 
          : '/';
      }, 1500);

    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a1f37] to-[#0d0f1a]">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-[#f8fafc] rounded-3xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex bg-white p-1 shadow-inner">
            <motion.button
              type="button"
              onClick={() => setUserType('candidate')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                userType === 'candidate'
                  ? 'bg-[#0055ff] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#0055ff] hover:bg-blue-50'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Candidate
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                userType === 'admin'
                  ? 'bg-[#0055ff] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#0055ff] hover:bg-blue-50'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Admin
            </motion.button>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={userType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
                  Create {userType === 'admin' ? 'Admin' : 'Candidate'} Account
                </h2>
                <p className="text-center text-gray-500 mb-8">
                  Join our platform to get started
                </p>
              </motion.div>
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 bg-white rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-[#0055ff] focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 text-sm`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs pl-2">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 bg-white rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#0055ff] focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 text-sm`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs pl-2">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 bg-white rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-[#0055ff] focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 text-sm`}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs pl-2">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#0055ff] transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 bg-white rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-[#0055ff] focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 text-sm`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs pl-2">{errors.confirmPassword}</p>}
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0055ff] to-[#00a2ff] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-blue-500/20 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  `Create ${userType === 'admin' ? 'Admin' : 'Candidate'} Account`
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link 
                href="/sign-in" 
                className="font-medium text-[#0055ff] hover:text-blue-700 transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;