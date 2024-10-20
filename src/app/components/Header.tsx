"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useConfig } from '../contexts/ConfigContext';
import { usePathname, useRouter } from 'next/navigation';
import HeaderMobileAccordion from './HeaderMobileAccordion';
import useMobile from '../hooks/useMobile';

interface HeaderProps {
  headerColor: string;
}

const JetInsightComponent = dynamic(() => import('../components/JetInsight/JetInsightComponent'), {
  ssr: false,
});

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathName = usePathname()

  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const { config } = useConfig();
  const headerColor = config?.header_color || "#ffffff";  // Default color if config is not loaded yet
  const router = useRouter();
  const isMobile = useMobile({
    breakPoint: 1024
  })

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
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathName])

  const NavItems = () => (
    <>
      <li
        className="relative group"
        onMouseEnter={() => handleDropdownHover('charter')}
      >
        <Link href="/" className={`block p-1.5 text-xl font-bold uppercase transition-all duration-300 ${activeDropdown === 'charter' ? 'text-electric-blue underline' : 'text-white hover:text-electric-blue'}`}>CHARTER</Link>
      </li>
      <li onMouseEnter={() => setActiveDropdown(null)}>
        <Link href="/management" className="block p-1.5 text-xl font-bold text-white uppercase transition-all duration-300 hover:text-electric-blue">MANAGEMENT</Link>
      </li>
      <li onMouseEnter={() => setActiveDropdown(null)}>
        <Link href="/maintenance" className="block p-1.5 text-xl font-bold text-white uppercase transition-all duration-300 hover:text-electric-blue">MAINTENANCE</Link>
      </li>
      <li
        className="relative group"
        onMouseEnter={() => handleDropdownHover('company')}
      >
        <Link href="/" className={`block p-1.5 text-xl font-bold uppercase transition-all duration-300 ${activeDropdown === 'company' ? 'text-electric-blue underline' : 'text-white hover:text-blue-600'}`}>COMPANY</Link>
      </li>
    </>
  );

  const handleLoginClick = () => {
    router.push('/admin/login');
  };

  if (isMobile) {
    return (
      <header ref={headerRef} className="relative top-0 left-0 w-full z-50" style={{ backgroundColor: headerColor }}>
        <div className=" w-full  flex  items-center px-5 py-3">
          <Link href="/" className="flex-shrink-0">
            <Image src="/images/whitebgcsmlogo.png" alt="CSM Aviation" width={60} height={60} />
          </Link>
          <a href="tel:+18884359276" className="  flex gap-2 mt-2  absolute left-1/2  justify-center items-center text-white transition-colors duration-300 hover:text-gray-200">
                  <FontAwesomeIcon icon={faPhone} size="lg" />(888) I-FLY-CSM
                </a>
          {/* Login Button */}
          <button
            onClick={handleLoginClick}
            className="absolute top-2  right-4 bg-transparent text-white hover:text-blue-500 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Login
          </button>


          {/* Mobile Menu Button */}
          <button
            className="text-gray-800  focus:outline-none w-full mt-2 flex justify-end"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon className='text-white' icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
          </button>

        </div>




        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ backgroundColor: headerColor }}>
            <ul className="flex flex-col items-center py-4">
              <HeaderMobileAccordion />
              <li className="mt-4">
                <a href="tel:+18884359276" className="text-white transition-colors duration-300 hover:text-gray-200">
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
  }

  return (
    <header ref={headerRef} className="relative top-0 left-0 w-full z-50" style={{ backgroundColor: headerColor }}>
      <div className=" w-full  flex  items-center px-5 py-3">
        <Link href="/" className="flex-shrink-0">
          <Image src="/images/whitebgcsmlogo.png" alt="CSM Aviation" className='p-2' width={120} height={120} />
        </Link>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="absolute top-3 right-6 bg-transparent text-white hover:text-blue-500 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Login
        </button>

        <nav className="hidden lg:flex flex-grow justify-center">
          <ul className=" flex space-x-8">
            <NavItems />
          </ul>
        </nav>



        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <a href="tel:+18884359276" className="text-gray-800 transition-colors duration-300 hover:text-blue-600">
            <FontAwesomeIcon className='hover:text-white  hover:translate-y-[-5px]  hover:duration-300 ease-in-out' color='#23B2EE' icon={faPhone} size="lg" />
          </a>
          <JetInsightComponent />
        </div>
      </div>

      {/* Full-width Dropdown Menu */}
      {activeDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 w-full py-8 hidden lg:block"
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
                  <Link href="/charter/quote" className="text-xl text-white  hover:text-electric-blue hover:underline transition-colors duration-300" onClick={() => setActiveDropdown(null)}>INSTANT QUOTE</Link>
                  <Link href="/charter/trip" className="text-xl text-white   hover:text-electric-blue hover:underline transition-colors duration-300" onClick={() => setActiveDropdown(null)}>TRIP REQUEST</Link>
                  <Link href="/charter/fleet" className="text-xl text-white  hover:text-electric-blue hover:underline transition-colors duration-300" onClick={() => setActiveDropdown(null)}>FLEET</Link>
                </>
              )}
              {activeDropdown === 'company' && (
                <>
                  <Link href="/company/about" className="text-xl text-white  hover:text-electric-blue hover:underline transition-colors duration-300" onClick={() => setActiveDropdown(null)}>ABOUT US</Link>
                  <Link href="/company/contact" className="text-xl text-white  hover:text-electric-blue hover:underline transition-colors duration-300" onClick={() => setActiveDropdown(null)}>CONTACT</Link>
                </>
              )}
            </div>
          </div>
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
