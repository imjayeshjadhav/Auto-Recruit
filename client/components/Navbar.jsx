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
        <Link href="/" className="nav-logo" onClick={() => setClick(false)}>
          <span>Auto-Recruit</span>
          <span className="icon">
            <CodeIcon />
          </span>
        </Link>

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
        </ul>

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
