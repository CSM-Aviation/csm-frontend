'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useConfig } from '../contexts/ConfigContext';
import { usePathname, useRouter } from 'next/navigation';
import HeaderMobileAccordion from './HeaderMobileAccordion';
import useMobile from '../hooks/useMobile';
import { usePathname as useNextPathname } from 'next/navigation';

interface HeaderProps {
  headerColor: string;
}

const JetInsightComponent = dynamic(
  () => import('../components/JetInsight/JetInsightComponent'),
  {
    ssr: false,
  }
);

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(true);

  const pathName = usePathname();
  const currentPath = useNextPathname();

  const headerRef = useRef<HTMLElement>(null);
  const { config } = useConfig();
  const headerColor = config?.header_color || '#ffffff'; // Default color if config is not loaded yet
  const router = useRouter();
  const isMobile = useMobile({
    breakPoint: 1024,
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Determine if we're on home page to manage transparent header behavior
    const isHomePage = currentPath === '/';

    const handleScroll = () => {
      // On home page, start with transparent header that becomes solid after scrolling
      if (isHomePage) {
        if (window.scrollY > 650) {
          // Increased to avoid CSM text clipping
          setScrolled(true);
          setTransparent(false);
        } else {
          setScrolled(false);
          setTransparent(true);
        }
      } else {
        // On other pages, header is always solid
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
        setTransparent(false);
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPath]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathName]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        transparent
          ? 'bg-opacity-0'
          : scrolled
          ? 'bg-opacity-90 shadow-lg'
          : 'bg-opacity-100'
      }`}
      style={{ backgroundColor: transparent ? 'transparent' : '#002040' }}
    >
      <div
        className={` w-full flex items-center px-5 py-3 ${
          pathName === '/' ? 'justify-end mt-12' : 'justify-between'
        }`}
      >
        {pathName !== '/' && (
          <Link href='/' className=''>
            <Image
              src='/images/whitebgcsmlogo.png'
              alt='CSM Aviation'
              className='w-40 h-40'
              width={200}
              height={200}
            />
          </Link>
        )}

        {/* Phone Icon */}
        {/* <div className="hidden lg:flex items-center mx-4">
          <a
            href="tel:+18884359276"
            onClick={() => {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: 'cta_call_click',
                category: 'conversion',
                label: window.location.pathname, 
              });
            }}
            className="text-gray-800 transition-colors duration-300 hover:text-blue-600"
          >
            <FontAwesomeIcon className='hover:text-white hover:translate-y-[-5px] hover:duration-300 ease-in-out' color='#23B2EE' icon={faPhone} size="lg" />
          </a>
        </div> */}

        {/* Mobile Phone on Small Screens */}
        {/* <a href="tel:+18884359276" className="flex gap-2 mx-4 justify-center items-center text-white transition-colors duration-300 hover:text-gray-200 lg:hidden">
          <FontAwesomeIcon icon={faPhone} size="lg" color='#23B2EE' /> 
          <span className="hidden sm:inline">(888) I-FLY-CSM</span>
        </a> */}

        {/* JetInsight Button for larger screens */}
        {/* <div className="hidden lg:block">
          <JetInsightComponent />
        </div> */}

        {/* Menu Toggle Button */}
        <button
          className='text-gray-800 focus:outline-none'
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon
            className='text-white'
            icon={mobileMenuOpen ? faTimes : faBars}
            size='lg'
          />
        </button>
      </div>

      {/* Menu Content - Always use accordion style, just toggle visibility */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: '#002040' }} className='py-4'>
          <div className='container mx-auto'>
            <HeaderMobileAccordion />
          </div>
        </div>
      )}

      <Script
        src='https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/empty'
        strategy='afterInteractive'
      />
    </header>
  );
};

export default Header;
