"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useConfig } from "../contexts/ConfigContext";
import { usePathname, useRouter } from "next/navigation";
import HeaderMobileAccordion from "./HeaderMobileAccordion";
import useMobile from "../hooks/useMobile";
import { usePathname as useNextPathname } from "next/navigation";

interface HeaderProps {
  headerColor: string;
}

const JetInsightComponent = dynamic(
  () => import("../components/JetInsight/JetInsightComponent"),
  {
    ssr: false,
  }
);

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const pathName = usePathname();
  const currentPath = useNextPathname();

  const headerRef = useRef<HTMLElement>(null);
  const { config } = useConfig();
  const headerColor = config?.header_color || "#ffffff"; // Default color if config is not loaded yet
  const router = useRouter();
  const isMobile = useMobile({
    breakPoint: 1024,
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Determine if we're on home page to manage transparent header behavior
    const isHomePage = currentPath === "/";

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine scroll direction
      const isScrollingDown = currentScrollPos > prevScrollPos;

      // Only change visibility based on scroll direction
      // When scrolling down: hide header
      // When scrolling up: show header
      // When not scrolling (equal positions): maintain previous state
      if (currentScrollPos > 100) {
        // Only apply hide/show behavior after scrolling past threshold
        if (isScrollingDown) {
          setVisible(false);
        } else if (currentScrollPos < prevScrollPos) {
          // Explicitly check for upward scrolling
          setVisible(true);
        }
        // If currentScrollPos === prevScrollPos (stopped scrolling), maintain current visible state
      } else {
        // Always show header at the top of the page
        setVisible(true);
      }

      // Update previous scroll position
      setPrevScrollPos(currentScrollPos);

      // On home page, start with transparent header that becomes solid after scrolling
      if (isHomePage) {
        if (currentScrollPos > 650) {
          // Increased to avoid CSM text clipping
          setScrolled(true);
          setTransparent(false);
        } else {
          setScrolled(false);
          setTransparent(true);
        }
      } else {
        // On other pages, header is always solid
        if (currentScrollPos > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
        setTransparent(false);
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPath, prevScrollPos]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathName]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-[1] transition-all duration-300 ${
        transparent
          ? "bg-opacity-0"
          : scrolled
          ? "bg-opacity-90 shadow-lg"
          : "bg-opacity-100"
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
      style={{ backgroundColor: transparent ? "transparent" : "#002040" }}
    >
      <div className="w-full flex items-center justify-between px-5 py-3">
        <div className="relative z-[1] max-md:left-1/2 max-md:-translate-x-[50%]">
          <Link href="/" className="">
            <Image
              src="/images/whitebgcsmlogo.png"
              alt="CSM Aviation"
              className="w-20 h-20" // Changed from w-40 h-40 to w-20 h-20
              width={100} // Changed from 200 to 100
              height={100} // Changed from 200 to 100
            />
          </Link>
        </div>

        {/* Phone Icon */}
        {/* <div className="hidden lg:flex items-center mx-4">
          
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
        {/* <button
          className="text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon
            className="text-white"
            icon={mobileMenuOpen ? faTimes : faBars}
            size="lg"
          />
        </button> */}
        <div className="z-[1]">
          <HeaderMobileAccordion />
        </div>
      </div>

      {/* Menu Content - Always use accordion style, just toggle visibility */}
      {/* {mobileMenuOpen && (
        <div style={{ backgroundColor: "#002040" }} className="py-4">
          <div className="container mx-auto">
            <HeaderMobileAccordion />
          </div>
        </div>
      )} */}

      <Script
        src="https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/empty"
        strategy="afterInteractive"
      />
    </header>
  );
};

export default Header;