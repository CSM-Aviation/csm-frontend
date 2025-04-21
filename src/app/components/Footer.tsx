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
    <footer className="bg-[#004080] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* Email Subscription and Contact Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">CONTACT US</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <FaPhone className="text-xl text-white/80 group-hover:text-white transition-colors" />
                  <a href="tel:+18884359276" className="hover:underline transition-all">
                    Call: (888) 435-9276
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <FaEnvelope className="text-xl text-white/80 group-hover:text-white transition-colors" />
                  <a href="mailto:charter@csmaviation.com" className="hover:underline transition-all">
                    charter@csmaviation.com
                  </a>
                </div>
              </div>
            </div>

            {/* Email Subscription */}
            <div className="relative">
              <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">STAY UPDATED</h3>
              <EmailSubscription />
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">CONNECT WITH US</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/csm_aviation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/80 rounded-full p-2.5 hover:bg-white hover:text-[#004080] hover:border-white transition-all duration-300 transform hover:scale-105"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/CSMaviation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/80 rounded-full p-2.5 hover:bg-white hover:text-[#004080] hover:border-white transition-all duration-300 transform hover:scale-105"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/csm-aviation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/80 rounded-full p-2.5 hover:bg-white hover:text-[#004080] hover:border-white transition-all duration-300 transform hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">GOT A QUESTION?</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/faqs" className="hover:underline hover:text-white/80 transition-colors flex items-center">
                    <FaArrowRight className="mr-2 text-sm" />
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/company/contact" className="hover:underline hover:text-white/80 transition-colors flex items-center">
                    <FaArrowRight className="mr-2 text-sm" />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">USEFUL LINKS</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/privacy-policy" className="hover:underline hover:text-white/80 transition-colors flex items-center">
                    <FaArrowRight className="mr-2 text-sm" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="hover:underline hover:text-white/80 transition-colors flex items-center">
                    <FaArrowRight className="mr-2 text-sm" />
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Partners Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2 flex items-center">
              Affiliations/Ratings
              <FaArrowRight className="ml-2 text-sm" />
            </h3>

            <div className="grid grid-cols-2 gap-6">

              <div className="p-3 items-center justify-center">
                <a href="https://www.argus.aero/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/LOGOS/CSM_Aviation_Argus_Gold_150x150.png"
                    alt="ARGUS"
                    width={200}
                    height={1000}
                    className="max-h-full w-auto object-contain"
                  />
                </a>
              </div>

              <div className="p-3 items-center justify-center">
                <a href="https://www.wyvernltd.com/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/LOGOS/wyvern_logo.png"
                    alt="Wyvern"
                    width={100}
                    height={40}
                    className="max-h-full w-auto object-contain"
                  />
                </a>
              </div>


              <div className="p-3 items-center justify-center">
                <a href="https://nbaa.org/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/LOGOS/nbaa_logo.png"
                    alt="NBAA"
                    width={100}
                    height={40}
                    className="max-h-full w-auto object-contain"
                  />
                </a>
              </div>

              <div className="p-3 items-center justify-center">
                <a href="https://www.nata.aero/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/LOGOS/NATA_logo.png"
                    alt="NATA"
                    width={100}
                    height={40}
                    className="max-h-full w-auto object-contain"
                  />
                </a>
              </div>


              {/* <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center h-16 hover:bg-white/20 transition-colors">
                <a href="https://beechcraft.txtav.com/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/LOGOS/beechcraft-logo-white.svg"
                    alt="Beechcraft"
                    width={100}
                    height={40}
                    className="max-h-full w-auto object-contain"
                  />
                </a>
              </div> */}
              {/* <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center h-16 hover:bg-white/20 transition-colors">
                <a href="https://www.argus.aero/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/LOGOS/CSM_Aviation_Argus_Gold_150x150.png"
                    alt="ARGUS"
                    width={100}
                    height={40}
                    className="max-h-full w-auto object-contain"
                  />
                </a>
              </div> */}
              <div className="p-3 items-center justify-center">
                <a href="https://acsf.aero/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/LOGOS/acsf_logo.png"
                    alt="ACSF"
                    width={100}
                    height={40}
                    className="max-h-full w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/images/CSM-Logo-WHITE-01-web300.jpg"
                alt="CSM Logo"
                width={100}
                height={50}
                className="mr-4"
              />
              <p className="text-sm md:text-base text-white/80">
                Copyright {new Date().getFullYear()} CSM Aviation. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MessageDeskController shouldHide={shouldHideChatbot} />
    </footer>
  );
};

export default Footer;