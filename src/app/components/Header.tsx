'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import JetInsightLink from "./JetInsightLink";

interface HeaderProps {
  headerColor: string;
}

const Header: React.FC<HeaderProps> = ({ headerColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative w-full z-[1000]">
      <nav className="relative w-full transition-transform duration-500 shadow-none" style={{ backgroundColor: headerColor }}>
        <div className="flex justify-between items-center px-5 py-2.5 relative">
          <Link href="/" className="flex items-center">
            <Image src="/images/CSM-Logo-WHITE-01-web300.jpg" alt="CSM Aviation" width={60} height={60} className="invert" />
          </Link>
          <div className={`flex-grow justify-center ${isOpen ? 'fixed top-[60px] right-0 w-full h-[calc(100vh-60px)] bg-white flex-col items-center justify-start transition-all duration-1000 ease-out opacity-100 overflow-y-auto' : 'hidden lg:flex'}`}>
            <ul className="flex lg:flex-row flex-col items-center w-full lg:w-auto pt-5 lg:pt-0">
              <li className="dropdown relative lg:mx-5 my-2.5 lg:my-0 w-full lg:w-auto text-center">
                <Link href="/charter" onClick={toggleNavbar} className="block relative p-1.5 text-2xl font-bold font-['Source Sans Pro'] text-gray-800 uppercase transition-all duration-500 hover:underline hover:text-blue-600">CHARTER</Link>
                <div className="dropdown-content hidden group-hover:block absolute left-0 right-0 w-screen bg-[#bdae7a] z-[1] py-5 text-center box-border ml-[calc(-50vw+50%)] max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-[300px]">
                  <div className="submenu flex flex-col items-center max-w-[1200px] mx-auto">
                    <Link href="/charter/Quote" className="text-gray-800 py-3 px-4 text-sm uppercase transition-colors duration-300 hover:text-[#b19e58] hover:font-bold">Instant Quote</Link>
                    <Link href="/charter/trip" className="text-gray-800 py-3 px-4 text-sm uppercase transition-colors duration-300 hover:text-[#b19e58] hover:font-bold">Trip Request</Link>
                    <Link href="/charter/fleet" className="text-gray-800 py-3 px-4 text-sm uppercase transition-colors duration-300 hover:text-[#b19e58] hover:font-bold">FLEET</Link>
                  </div>
                </div>
              </li>
              <li className="lg:mx-5 my-2.5 lg:my-0 w-full lg:w-auto text-center">
                <Link href="/management" onClick={toggleNavbar} className="block relative p-1.5 text-2xl font-bold font-['Source Sans Pro'] text-gray-800 uppercase transition-all duration-500 hover:underline hover:text-blue-600">MANAGEMENT</Link>
              </li>
              <li className="lg:mx-5 my-2.5 lg:my-0 w-full lg:w-auto text-center">
                <Link href="/maintenance" onClick={toggleNavbar} className="block relative p-1.5 text-2xl font-bold font-['Source Sans Pro'] text-gray-800 uppercase transition-all duration-500 hover:underline hover:text-blue-600">MAINTENANCE</Link>
              </li>
              <li className="dropdown relative lg:mx-5 my-2.5 lg:my-0 w-full lg:w-auto text-center">
                <Link href="/company" onClick={toggleNavbar} className="block relative p-1.5 text-2xl font-bold font-['Source Sans Pro'] text-gray-800 uppercase transition-all duration-500 hover:underline hover:text-blue-600">COMPANY</Link>
                <div className="dropdown-content hidden group-hover:block absolute left-0 right-0 w-screen bg-[#bdae7a] z-[1] py-5 text-center box-border ml-[calc(-50vw+50%)] max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-[300px]">
                  <div className="submenu flex flex-col items-center max-w-[1200px] mx-auto">
                    <Link href="/company/about" className="text-gray-800 py-3 px-4 text-sm uppercase transition-colors duration-300 hover:text-[#b19e58] hover:font-bold">About Us</Link>
                    <Link href="/company/team" className="text-gray-800 py-3 px-4 text-sm uppercase transition-colors duration-300 hover:text-[#b19e58] hover:font-bold">Contact</Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-3.5 ml-auto">
            <a href="tel:+8884359276" className="text-gray-800 transition-colors duration-300 hover:text-blue-600 hidden lg:block">
              <FontAwesomeIcon icon={faPhone} size="2x" />
            </a>
            {/* <JetInsightLink /> */}
            <div id="mobile" onClick={toggleNavbar} className="cursor-pointer text-black text-2xl lg:hidden">
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;