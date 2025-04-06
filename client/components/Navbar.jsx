'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Menu, X, User } from 'lucide-react'; // Import Lucide icons
import './NavBar.css';

export default function Navbar() {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  // Check auth status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    
    checkAuthStatus();
  }, []);

  const handleClick = () => setClick(false);

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={() => setClick(false)}>
          <span>Auto-Recruit</span>
          <span className="icon">
            <Code2 size={20} /> {/* Using Code2 icon from Lucide */}
          </span>
        </Link>

        {/* Nav Links */}
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {routes.map((route, index) => (
            <li className="nav-item" key={index}>
              <Link
                href={route.path}
                className={pathname === route.path ? 'nav-links active' : 'nav-links'}
                onClick={handleClick}
              >
                {route.label}
              </Link>
            </li>
          ))}

          {/* Conditional render based on auth status */}
          {isLoggedIn ? (
            <li className="nav-item group relative">
              <Link
                href="/profile"
                className="nav-links flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
                onClick={handleClick}
              >
                <User className="text-indigo-600 w-5 h-5" /> {/* Using User icon from Lucide */}
              </Link>

              {/* Profile dropdown */}
              <div className="absolute top-12 right-0 z-20 hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48 transition-all duration-300">
                <Link
                  href="/profile"
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md text-sm transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md text-sm transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    setIsLoggedIn(false);
                  }}
                  className="px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md text-sm transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </li>
          ) : (
            <li className="nav-item relative group">
              <Link
                href="/sign-in"
                className="nav-links px-4 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
              >
                Sign In
              </Link>

              <div className="absolute top-12 right-0 z-20 hidden group-hover:flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign in to continue</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Access your dashboard and recruitment tools.
                </p>
                <Link
                  href="/sign-in"
                  className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition"
                >
                  Go to Sign In
                </Link>
              </div>
            </li>
          )}
        </ul>

        {/* Hamburger Icon */}
        <div className="nav-icon" onClick={() => setClick(!click)}>
          {click ? (
            <span className="icon">
              <X size={24} /> {/* Using X (close) icon from Lucide */}
            </span>
          ) : (
            <span className="icon">
              <Menu size={24} /> {/* Using Menu (hamburger) icon from Lucide */}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}