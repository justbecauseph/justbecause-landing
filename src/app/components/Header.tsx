'use client';

import { useState } from 'react';
import Link from 'next/link';
import Obfuscate from 'react-obfuscate';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <p className="hidden md:flex items-center hover:text-blue-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <Obfuscate email="info@justbecause.ph" />
          </p>
          <p className="hidden md:flex items-center hover:text-blue-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <Obfuscate tel="+63 952 480 7466" />
          </p>
        </div>
        
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-6">
            <Link href="/#services" className="hover:text-blue-400 transition">Services</Link>
            <Link href="/#contact" className="hover:text-blue-400 transition">Contact</Link>
          </nav>
          
          <button
            type="button"
            className="md:hidden text-2xl"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 absolute top-16 left-0 w-full z-50">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <Link
              href="/#services"
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <p className="flex items-center py-2 hover:text-blue-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <Obfuscate email="info@justbecause.ph" />
            </p>
            <p className="flex items-center py-2 hover:text-blue-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <Obfuscate tel="+63 952 480 7466" />
            </p>
          </div>
        </div>
      )}
    </header>
  );
}