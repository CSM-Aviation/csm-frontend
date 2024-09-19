"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBars, faTimes, faUser  } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useConfig } from '../contexts/ConfigContext';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  headerColor: string;
}

const JetInsightComponent = dynamic(() => import('../components/JetInsight/JetInsightComponent'), {
  ssr: false,
});

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const { config } = useConfig();
  const headerColor = config?.header_color || "#bdae7a";  // Default color if config is not loaded yet
  const router = useRouter();

  const handleDropdownHover = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    if (!isHoveringDropdown) {
      setActiveDropdown(null);
    }
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
        // onMouseLeave={handleDropdownLeave}
      >
        <Link href="/" className={`block p-1.5 text-xl font-bold uppercase transition-all duration-300 ${activeDropdown === 'charter' ? 'text-blue-600 underline' : 'text-white hover:text-blue-600'}`}>CHARTER</Link>
      </li>
      <li onMouseEnter={() => setActiveDropdown(null)}>
        <Link href="/management" className="block p-1.5 text-xl font-bold text-white uppercase transition-all duration-300 hover:text-blue-600">MANAGEMENT</Link>
      </li>
      <li onMouseEnter={() => setActiveDropdown(null)}>
        <Link href="/maintenance" className="block p-1.5 text-xl font-bold text-white uppercase transition-all duration-300 hover:text-blue-600">MAINTENANCE</Link>
      </li>
      <li
        className="relative group"
        onMouseEnter={() => handleDropdownHover('company')}
        // onMouseLeave={handleDropdownLeave}
      >
        <Link href="/" className={`block p-1.5 text-xl font-bold uppercase transition-all duration-300 ${activeDropdown === 'company' ? 'text-blue-600 underline' : 'text-white hover:text-blue-600'}`}>COMPANY</Link>
      </li>
    </>
  );

  const handleLoginClick = () => {
    router.push('/admin/login');
  };

  return (
    <header ref={headerRef} className=" relative top-0 left-0 w-full z-50" style={{ backgroundColor: headerColor }}>
      <div className="container mx-auto flex justify-between items-center px-5 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/CSM_Logo_WHITE-01_no_plane.png" alt="CSM Aviation" width={120} height={120} />
        </Link>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="absolute top-2 right-2 bg-transparent text-white hover:text-gray-200 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Login
        </button>

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

      {/* Full-width Dropdown Menu */}
      {activeDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 w-full py-8 hidden md:block"
          onMouseEnter={() => setIsHoveringDropdown(true)}
          onMouseLeave={() => {
            setIsHoveringDropdown(false);
            setActiveDropdown(null);
          }}
          style={{ backgroundColor: headerColor }}
        >
          <div className="container mx-auto flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              {activeDropdown === 'charter' && (
                <>
                  <Link href="/charter/quote" className="text-xl text-white hover:text-gray-200 transition-colors duration-300" onClick={() => setActiveDropdown(null)}>INSTANT QUOTE</Link>
                  <Link href="/charter/trip" className="text-xl text-white hover:text-gray-200 transition-colors duration-300" onClick={() => setActiveDropdown(null)}>TRIP REQUEST</Link>
                  <Link href="/charter/fleet" className="text-xl text-white hover:text-gray-200 transition-colors duration-300" onClick={() => setActiveDropdown(null)}>FLEET</Link>
                </>
              )}
              {activeDropdown === 'company' && (
                <>
                  <Link href="/company/about" className="text-xl text-white hover:text-gray-200 transition-colors duration-300" onClick={() => setActiveDropdown(null)}>ABOUT US</Link>
                  <Link href="/company/contact" className="text-xl text-white hover:text-gray-200 transition-colors duration-300" onClick={() => setActiveDropdown(null)}>CONTACT</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: headerColor }}>
          <ul className="flex flex-col items-center py-4">
            <NavItems />
            <li className="mt-4">
              <a href="tel:+8884359276" className="text-white transition-colors duration-300 hover:text-gray-200">
                <FontAwesomeIcon icon={faPhone} size="lg" /> Call Us
              </a>
            </li>
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