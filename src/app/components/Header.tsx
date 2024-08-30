"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import JetInsightComponent from './JetInsight/JetInsightComponent';
import dynamic from 'next/dynamic';
import Script from 'next/script';

interface HeaderProps {
  headerColor: string;
}

const JetInsightComponent = dynamic(() => import('../components/JetInsight/JetInsightComponent'), {
  ssr: false,
});

const Header: React.FC<HeaderProps> = ({ headerColor }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownHover = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const NavItems = () => (
    <>
      <li 
        className="relative group"
        onMouseEnter={() => handleDropdownHover('charter')}
      >
        <Link href="/charter" className={`block p-1.5 text-xl font-bold uppercase transition-all duration-300 ${activeDropdown === 'charter' ? 'text-blue-600 underline' : 'text-white hover:text-blue-600'}`}>CHARTER</Link>
      </li>
      <li>
        <Link href="/management" className="block p-1.5 text-xl font-bold text-white uppercase transition-all duration-300 hover:text-blue-600">MANAGEMENT</Link>
      </li>
      <li>
        <Link href="/maintenance" className="block p-1.5 text-xl font-bold text-white uppercase transition-all duration-300 hover:text-blue-600">MAINTENANCE</Link>
      </li>
      <li 
        className="relative group"
        onMouseEnter={() => handleDropdownHover('company')}
      >
        <Link href="/company" className={`block p-1.5 text-xl font-bold uppercase transition-all duration-300 ${activeDropdown === 'company' ? 'text-blue-600 underline' : 'text-white hover:text-blue-600'}`}>COMPANY</Link>
      </li>
    </>
  );

  return (
    <header ref={headerRef} className="absolute top-0 left-0 w-full z-50">
      {/* <nav className="relative w-full transition-transform duration-500 shadow-none "> */}
        <div className="container mx-auto flex justify-between items-center px-5 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/CSM_Logo_WHITE-01_no_plane.png" alt="CSM Aviation" width={120} height={120}  />
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <NavItems />
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
          </button>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+8884359276" className="text-gray-800 transition-colors duration-300 hover:text-blue-600">
              <FontAwesomeIcon color='#007BA7' icon={faPhone} size="lg" />
            </a>
            <JetInsightComponent />
          </div>
        </div>
      {/* </nav> */}
      
      {/* Full-width Dropdown Menu */}
      {activeDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute left-0 w-full py-8 hidden md:block"
          onMouseLeave={handleDropdownLeave}
        >
          <div className="container mx-auto flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              {activeDropdown === 'charter' && (
                <>
                  <Link href="/charter/quote" className="text-xl text-gray-800 text-white hover:text-white transition-colors duration-300" onClick={() => setActiveDropdown(null)}>INSTANT QUOTE</Link>
                  <Link href="/charter/trip" className="text-xl text-gray-800  text-white hover:text-white transition-colors duration-300" onClick={() => setActiveDropdown(null)}>TRIP REQUEST</Link>
                  <Link href="/charter/fleet" className="text-xl text-gray-800 text-white hover:text-white transition-colors duration-300" onClick={() => setActiveDropdown(null)}>FLEET</Link>
                </>
              )}
              {activeDropdown === 'company' && (
                <>
                  <Link href="/company/about" className="text-xl text-gray-800   text-white hover:text-white transition-colors duration-300" onClick={() => setActiveDropdown(null)}>ABOUT US</Link>
                  <Link href="/company/contact" className="text-xl text-gray-800 text-white hover:text-white transition-colors duration-300" onClick={() => setActiveDropdown(null)}>CONTACT</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <ul className="flex flex-col items-center py-4">
            <NavItems />
            <li className="mt-4">
              <a href="tel:+8884359276" className="text-gray-800 transition-colors duration-300 hover:text-blue-600">
                <FontAwesomeIcon icon={faPhone} size="lg" /> Call Us
              </a>
            </li>
            {/* <li className="mt-4">
              <button className="bg-[#007BA7] text-white px-6 py-3 rounded hover:bg-[#555555] transition-colors duration-300">
                Request a quote
              </button>
            </li> */}
          </ul>
        </div>
      )}
      <Script
          src='https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/empty'
          strategy="afterInteractive"
        />
    </header>
  );
};

export default Header;