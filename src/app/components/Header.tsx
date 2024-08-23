"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  headerColor: string;
}

const Header: React.FC<HeaderProps> = ({ headerColor }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownHover = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // Delay before closing dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="relative w-full z-[1000]">
      <nav className="relative w-full transition-transform duration-500 shadow-none" style={{ backgroundColor: headerColor }}>
        <div className="container mx-auto flex justify-between items-center px-5 py-2.5">
          <Link href="/" className="flex items-center">
            <Image src="/images/CSM-Logo-WHITE-01-web300.jpg" alt="CSM Aviation" width={60} height={60} className="invert" />
          </Link>
          <ul className="flex items-center space-x-8">
            <li 
              className="relative group"
              onMouseEnter={() => handleDropdownHover('charter')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link href="/charter" className="block p-1.5 text-xl font-bold text-gray-800 uppercase transition-all duration-300 hover:text-blue-600">CHARTER</Link>
            </li>
            <li>
              <Link href="/management" className="block p-1.5 text-xl font-bold text-gray-800 uppercase transition-all duration-300 hover:text-blue-600">MANAGEMENT</Link>
            </li>
            <li>
              <Link href="/maintenance" className="block p-1.5 text-xl font-bold text-gray-800 uppercase transition-all duration-300 hover:text-blue-600">MAINTENANCE</Link>
            </li>
            <li 
              className="relative group"
              onMouseEnter={() => handleDropdownHover('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link href="/company" className="block p-1.5 text-xl font-bold text-gray-800 uppercase transition-all duration-300 hover:text-blue-600">COMPANY</Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <a href="tel:+8884359276" className="text-gray-800 transition-colors duration-300 hover:text-blue-600">
              <FontAwesomeIcon icon={faPhone} size="lg" />
            </a>
            <button className="bg-[#333333] text-white px-4 py-2 rounded hover:bg-[#555555] transition-colors duration-300">
              Request a quote
            </button>
          </div>
        </div>
      </nav>
      {activeDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute left-0 w-full bg-[#bdae7a] py-8"
          onMouseEnter={() => handleDropdownHover(activeDropdown)}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="container mx-auto flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              {activeDropdown === 'charter' && (
                <>
                  <Link href="/charter/quote" className="text-xl text-gray-800 hover:text-white transition-colors duration-300">INSTANT QUOTE</Link>
                  <Link href="/charter/trip" className="text-xl text-gray-800 hover:text-white transition-colors duration-300">TRIP REQUEST</Link>
                  <Link href="/charter/fleet" className="text-xl text-gray-800 hover:text-white transition-colors duration-300">FLEET</Link>
                </>
              )}
              {activeDropdown === 'company' && (
                <>
                  <Link href="/company/about" className="text-xl text-gray-800 hover:text-white transition-colors duration-300">ABOUT US</Link>
                  <Link href="/company/contact" className="text-xl text-gray-800 hover:text-white transition-colors duration-300">CONTACT</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;