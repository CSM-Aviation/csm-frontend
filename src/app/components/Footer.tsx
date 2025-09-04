'use client'
import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import MessageDeskController from './MessageDeskChatbot';
import { usePathname } from 'next/navigation';
import EmailSubscription from './EmailSubscription';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const shouldHideChatbot = pathname === '/f1race';

  const handleWyvernClick = () => {
    window.open('http://app.wyvern.systems/public/verification/f47895b023ddd948dfcc647054/10463/032a727d117c7-eb882228c5be6', '_blank');
  };

  return (
    <footer className="bg-[#004080] text-white">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        
        {/* Top Section - Logo, Contact Info, and Social */}
        <div className="py-16 md:py-20 border-b border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Company Logo - Left */}
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/CSM-Logo-WHITE-01-web300.jpg"
                alt="CSM Aviation Logo"
                width={200}
                height={100}
                className="mb-4"
              />
            </div>

            {/* Contact Information - Center */}
            <div className="text-center">
              {/* Phone Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4 tracking-wider uppercase text-gray-400">CALL</h3>
                <a 
                  href="tel:+18884359276" 
                  className="text-xl md:text-2xl font-light hover:text-gray-300 transition-colors block"
                >
                  +1 (888) 435-9276
                </a>
              </div>

              {/* Email Section */}
              <div>
                <h3 className="text-sm font-medium mb-4 tracking-wider uppercase text-gray-400">EMAIL</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">General Enquiries:</p>
                    <a 
                      href="mailto:charter@csmaviation.com" 
                      className="text-lg hover:text-gray-300 transition-colors"
                    >
                      charter@csmaviation.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media - Right */}
            <div className="flex justify-center md:justify-end">
              <div className="text-center md:text-right">
                <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-gray-400">SOCIAL</h3>
                <div className="flex space-x-4 justify-center md:justify-end">
                  <a
                    href="https://www.instagram.com/csm_aviation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/CSMaviation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/csm-aviation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Our Services */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">OUR SERVICES</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/services/charter" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Private Charter
                  </Link>
                </li>
                <li>
                  <Link href="/services/management" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Aircraft Management
                  </Link>
                </li>
                <li>
                  <Link href="/services/maintenance" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Maintenance
                  </Link>
                </li>
                <li>
                  <Link href="/services/sales" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Aircraft Sales
                  </Link>
                </li>
              </ul>
            </div>

            {/* Aircraft Types */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">AIRCRAFT</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/fleet/light-jets" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Light Jets
                  </Link>
                </li>
                <li>
                  <Link href="/fleet/midsize-jets" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Midsize Jets
                  </Link>
                </li>
                <li>
                  <Link href="/fleet/heavy-jets" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Heavy Jets
                  </Link>
                </li>
                <li>
                  <Link href="/fleet/turboprops" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Turboprops
                  </Link>
                </li>
              </ul>
            </div>

            {/* Why CSM */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">WHY CSM</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/company/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About CSM
                  </Link>
                </li>
                <li>
                  <Link href="/company/team" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Leadership Team
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="/company/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Engage */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">ENGAGE</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/faqs" className="text-gray-400 hover:text-white transition-colors text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/company/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/customer-experience" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Stay Updated */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">STAY UPDATED</h3>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Subscribe to our CSM offers, special updates and much more
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors font-medium text-sm uppercase tracking-wider"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliations Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <a href="https://www.argus.aero/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/LOGOS/CSM_Aviation_Gold_ARGUS_04-removebg-preview.png"
                  alt="ARGUS Gold Rating"
                  width={80}
                  height={40}
                  className="filter brightness-0 invert"
                />
              </a>
            </div>
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <a href="https://www.wyvernltd.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/LOGOS/wyvern_logo.png"
                  alt="Wyvern Registered Operator"
                  width={60}
                  height={30}
                />
              </a>
            </div>
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <a href="https://nbaa.org/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/LOGOS/NBAA_logo_4_24.png"
                  alt="NBAA Member"
                  width={60}
                  height={30}
                  className="filter brightness-0 invert"
                />
              </a>
            </div>
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <a href="https://www.nata.aero/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/LOGOS/NATA_logo.png"
                  alt="NATA Member"
                  width={60}
                  height={30}
                  className="filter brightness-0 invert"
                />
              </a>
            </div>
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <a href="https://acsf.aero/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/LOGOS/ascf_logo.png"
                  alt="ACSF Member"
                  width={60}
                  height={30}
                  className="filter brightness-0 invert"
                />
              </a>
            </div>
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/images/LOGOS/wyvern_logo.png"
                alt="Wyvern Registered Broker"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">
              © 2020-{new Date().getFullYear()} All rights reserved. CSM Aviation Inc.
            </p>
            <p className="text-gray-600 text-xs max-w-4xl mx-auto leading-relaxed">
              CSM Aviation operates as a licensed air charter broker under DOT regulations, providing exceptional private aviation services. 
              All flights are operated by certified Part 135 operators or foreign equivalent carriers that meet and exceed standards set by the FAA and internal requirements.
            </p>
          </div>
        </div>
      </div>

      <MessageDeskController shouldHide={shouldHideChatbot} />
    </footer>
  );
};

export default Footer;