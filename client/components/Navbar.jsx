'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from './Icons';
import './NavBar.css';

export default function Navbar() {
  const [click, setClick] = useState(false);
  const pathname = usePathname();

  const handleClick = () => setClick(!click);

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
            <CodeIcon />
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

          {/* Sign In Button with Tooltip */}
          <li className="nav-item relative group">
            <Link
              href="/sign-in"
              className="nav-links px-4 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
            >
              Sign In
            </Link>

            {/* Tooltip Card on Hover */}
            <div className="absolute top-12 right-0 z-20 hidden group-hover:flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign in to continue</h3>
              <p className="text-sm text-gray-600 mb-3">
                Access your dashboard, manage applicants, and view recruitment analytics in real-time.
              </p>
              <Link
                href="/sign-in"
                className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition"
              >
                Go to Sign In
              </Link>
            </div>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <HamburgetMenuOpen />
            </span>
          ) : (
            <span className="icon">
              <HamburgetMenuClose />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

