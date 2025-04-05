'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen, UserIcon, DashboardIcon, AnalyticsIcon } from './Icons';
import './NavBar.css';

export default function Navbar() {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const authRoutes = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    { path: '/profile', label: 'Profile', icon: <UserIcon /> },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={closeMobileMenu}>
          <span>Auto-Recruit</span>
          <span className="icon">
            <CodeIcon />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {/* Main Nav Links */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {routes.map((route, index) => (
              <li className="nav-item" key={`main-${index}`}>
                <Link
                  href={route.path}
                  className={pathname === route.path ? 'nav-links active' : 'nav-links'}
                  onClick={closeMobileMenu}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Section */}
          <div className="auth-section">
            <div className="relative group">
              <button className="auth-button">
                <UserIcon className="w-5 h-5" />
                <span>Account</span>
              </button>

              {/* Dropdown Menu */}
              <div className="auth-dropdown">
                <div className="dropdown-header">
                  <h3 className="text-lg font-semibold">Welcome Back</h3>
                  <p className="text-sm">Access your recruitment tools</p>
                </div>
                
                <div className="dropdown-links">
                  {authRoutes.map((route, index) => (
                    <Link
                      href={route.path}
                      key={`auth-${index}`}
                      className="dropdown-link"
                      onClick={closeMobileMenu}
                    >
                      <span className="icon">{route.icon}</span>
                      <span>{route.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="dropdown-footer">
                  <Link href="/sign-in" className="sign-in-btn">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="sign-up-btn">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
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

          {/* Mobile Menu */}
          {click && (
            <div className="mobile-menu">
              <ul className="mobile-nav-menu">
                {routes.map((route, index) => (
                  <li className="mobile-nav-item" key={`mobile-main-${index}`}>
                    <Link
                      href={route.path}
                      className={pathname === route.path ? 'mobile-nav-links active' : 'mobile-nav-links'}
                      onClick={closeMobileMenu}
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}

                <div className="mobile-auth-section">
                  <h3 className="mobile-auth-title">Account</h3>
                  {authRoutes.map((route, index) => (
                    <li className="mobile-nav-item" key={`mobile-auth-${index}`}>
                      <Link
                        href={route.path}
                        className={pathname === route.path ? 'mobile-nav-links active' : 'mobile-nav-links'}
                        onClick={closeMobileMenu}
                      >
                        <span className="icon">{route.icon}</span>
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </div>

                <div className="mobile-auth-buttons">
                  <Link href="/sign-in" className="mobile-sign-in-btn" onClick={closeMobileMenu}>
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="mobile-sign-up-btn" onClick={closeMobileMenu}>
                    Get Started
                  </Link>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}