'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import MessageDeskController from './MessageDeskChatbot';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const shouldHideChatbot = pathname === '/f1race';

  const handleWyvernClick = () => {
    window.open('http://app.wyvern.systems/public/verification/f47895b023ddd948dfcc647054/10463/032a727d117c7-eb882228c5be6', '_blank');
  };
  // #004080
  // #04588d
  // #002449
  return (
    <footer className="relative bg-[#002449] text-white">
      {/* White gradient overlay for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">

        {/* First Row - Logo, Contact Info, and Social */}
        <div className="py-16 md:py-20 border-b border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">

            {/* Company Logo - Left */}
            <div className="flex-shrink-0">
              <Image
                src="/images/CSM-Logo-WHITE-01-web300.jpg"
                alt="CSM Aviation Logo"
                width={100}
                height={100}
                className="h-auto"
              />
            </div>

            {/* Contact and Social Section - Right */}
            <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12">

              {/* Call Section */}
              <div className="text-center">
                <h3 className="text-sm font-medium mb-4 tracking-wider uppercase text-gray-300">CALL</h3>
                <a
                  href="tel:+18884359276"
                  className="text-xl md:text-2xl font-light hover:text-gray-300 transition-colors block whitespace-nowrap"
                  onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: 'cta_call_click',
                      category: 'conversion',
                      label: window.location.pathname,
                    });
                  }}
                >
                  +1 (888)-I-FLY-CSM
                </a>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-20 bg-white/20"></div>

              {/* Email Section */}
              <div className="text-center">
                <h3 className="text-sm font-medium mb-4 tracking-wider uppercase text-gray-300">EMAIL</h3>
                <div className="space-y-2">
                  <div>
                    {/* <p className="text-gray-400 text-xs mb-1">General Enquiries:</p> */}
                    <a
                      href="mailto:charter@csmaviation.com"
                      className="text-lg hover:text-gray-300 transition-colors block"
                    >
                      charter@csmaviation.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-20 bg-white/20"></div>

              {/* Social Media Section */}
              <div className="text-center">
                <h3 className="text-sm font-medium mb-4 tracking-wider uppercase text-gray-300">SOCIAL</h3>
                <div className="flex space-x-4 justify-center">
                  <a
                    href="https://www.instagram.com/csm_aviation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-[#004080] transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/CSMaviation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-[#004080] transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/csm-aviation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-[#004080] transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Navigation Links */}
        <div className="py-12 border-b border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">

            {/* Charter Services */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">CHARTER</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/charter/quote" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Request Quote
                  </Link>
                </li>
                <li>
                  <Link href="/charter/trip" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Trip Request
                  </Link>
                </li>
                <li>
                  <Link href="/charter/fleet" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Our Fleet
                  </Link>
                </li>
                <li>
                  {/* <Link href="/charter/empty-legs" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Empty Legs
                  </Link> */}
                </li>
              </ul>
            </div>

            {/* Aircraft Types */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">AIRCRAFT</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/charter/fleet?category=light" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Light Jets
                  </Link>
                </li>
                <li>
                  <Link href="/charter/fleet?category=midsize" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Midsize Jets
                  </Link>
                </li>
                <li>
                  <Link href="/charter/fleet?category=heavy" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Heavy Jets
                  </Link>
                </li>
                <li>
                  <Link href="/charter/fleet?category=turboprop" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Turboprops
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">SERVICES</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/management" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Aircraft Management
                  </Link>
                </li>
                <li>
                  <Link href="/maintenance" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Maintenance
                  </Link>
                </li>
                {/* <li>
                  <Link href="/services/sales" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Aircraft Sales
                  </Link>
                </li> */}
                {/* <li>
                  <Link href="/services/consulting" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Aviation Consulting
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">COMPANY</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/company/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                    About CSM
                  </Link>
                </li>
                {/* <li>
                  <Link href="/company/team" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Leadership Team
                  </Link>
                </li> */}
                <li>
                  <Link href="/company/careers" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Careers
                  </Link>
                </li>
                {/* <li>
                  <Link href="/safety" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Safety
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">RESOURCES</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/faqs" className="text-gray-300 hover:text-white transition-colors text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/customer-experience" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Customer Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/company/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Stay Updated */}
            <div>
              <h3 className="text-sm font-medium mb-6 tracking-wider uppercase text-white">STAY UPDATED</h3>
              <div className="space-y-4">
                {/* <p className="text-gray-300 text-sm leading-relaxed">
                  Subscribe for CSM offers, updates and aviation insights
                </p> */}
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-transparent border border-gray-400 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-white text-[#004080] rounded-md hover:bg-gray-100 transition-colors font-medium text-sm uppercase tracking-wider"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row - Rights, Message, and Affiliations */}
        <div>
          {/* Copyright and Company Message */}
          {/* <div className="text-center mb-12">
            <p className="text-gray-400 text-sm mb-4">
              © {new Date().getFullYear()} All rights reserved. CSM Aviation Inc.
            </p>
            <p className="text-gray-500 text-xs max-w-4xl mx-auto leading-relaxed">
              CSM Aviation operates as a licensed air charter broker under DOT regulations, providing exceptional private aviation services.
              All flights are operated by certified Part 135 operators or foreign equivalent carriers that meet and exceed standards set by the FAA and internal requirements.
            </p>
          </div> */}

          {/* Affiliations */}
          <div className="border-t border-white/10 py-8 flex items-center">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center w-full">
              <div className="opacity-100 hover:opacity-100 transition-opacity">
                <a href="https://www.argus.aero/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/LOGOS/CSM_Aviation_Gold_ARGUS_04-removebg-preview.png"
                    alt="ARGUS Gold Rating"
                    width={90}
                    height={90}
                    className=""
                  />
                </a>
              </div>
              {/* <div className="opacity-70 hover:opacity-100 transition-opacity">
                <button onClick={handleWyvernClick} className="focus:outline-none">
                  <Image
                    src="/images/LOGOS/wyvern_logo.png"
                    alt="Wyvern Registered Operator"
                    width={60}
                    height={30}
                  />
                </button>
              </div> */}
              <div className="opacity-100 hover:opacity-100 transition-opacity">
                <a href="https://nbaa.org/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/LOGOS/NBAA_logo_4_24.png"
                    alt="NBAA Member"
                    width={90}
                    height={90}
                  />
                </a>
              </div>
              <div className="opacity-100 hover:opacity-100 transition-opacity">
                <a href="https://www.nata.aero/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/LOGOS/NATA_logo.png"
                    alt="NATA Member"
                    width={90}
                    height={90}
                  />
                </a>
              </div>
              <div className="opacity-100 hover:opacity-100 transition-opacity">
                <a href="https://acsf.aero/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/LOGOS/ascf_logo.png"
                    alt="ACSF Member"
                    width={90}
                    height={90}
                  />
                </a>
              </div>
              <div className="opacity-100 hover:opacity-100 transition-opacity">
                <a href="https://www.wyvernltd.com/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/LOGOS/wyvern_logo.png"
                    alt="Wyvern Registered Broker"
                    width={70}
                    height={70}
                  />
                </a>
              </div>
            </div>
          </div>
          {/* Privacy Policy */}
          <div className="border-t border-white/10 pt-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">
                © {new Date().getFullYear()} All rights reserved. CSM Aviation.
              </p>
              <p className="text-gray-400 text-sm">
                By accessing and using our website, you agree to our <a href="/privacy-policy" className="text-white hover:text-gray-300 transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
        {/* Add space between footer and chatbot */}
        <div className="h-20"></div>
      </div>

      <MessageDeskController shouldHide={shouldHideChatbot} />
    </footer>
  );
};

export default Footer;