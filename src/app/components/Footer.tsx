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
    <footer className="bg-[#004080] mt-14 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Email Subscription Section - 50% */}
          <div className="md:col-span-2">
              {/* Contact Information */}
              <div className="mb-8">
              {/* <h3 className="text-2xl font-bold mb-6">CONTACT US</h3> */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-xl" />
                  <a href="tel:+18884359276" className=" hover:underline">
                  Call: (888) 435-9276
                </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-xl" />
                  <a href="mailto:charter@csmaviation.com" className="text-lg hover:underline">
                    charter@csmaviation.com
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  {/* <FaMapMarkerAlt className="text-xl mt-1" /> */}
                  {/* <div>
                    <h4 className="text-lg font-semibold">Corporate HQ</h4>
                    <p className="text-lg">3050 North Winery Avenue</p>
                    <p className="text-lg">Fresno, California 93703</p>
                    <p className="text-lg">(559) 492-9403</p>
                  </div> */}
                </div>
                {/* <div className="">
                  <p className="text-lg">FAT | MCC | MAE | VIS | RNO</p>
                </div> */}
              </div>
            </div>
            <div className="relative mb-8">
              <EmailSubscription/>
            
            </div>

            <div className="mt-8">
              <h3 className="text-xl mb-4">Social</h3>
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/csm_aviation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white rounded-full p-3 hover:bg-white hover:text-[#004080] transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/CSMaviation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white rounded-full p-3 hover:bg-white hover:text-[#004080] transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
                </a>
             
                <a
                  href="https://www.linkedin.com/company/csm-aviation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white rounded-full p-3 hover:bg-white hover:text-[#004080] transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Rest of the footer sections remain the same */}
          {/* Got a Question & Useful Links Section - 25% */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">Got a Question?</h3>
                <ul className="mt-4 text-xl space-y-2">
                  <li>
                    <Link href="/faqs" className="hover:underline">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/company/contact" className="hover:underline">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">Useful Links</h3>
                <ul className="mt-4 text-xl space-y-2">
                  <li>
                    <Link href="/privacy-policy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/sitemap" className="hover:underline">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Partners Section - 25% */}
          <div>
            <div className="flex flex-col">
              <div className="flex items-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold">Proud Members of</h3>
                <FaArrowRight className="ml-2 text-2xl" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center justify-center h-12">
                  <a href="https://www.nata.aero/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/LOGOS/NATlogo.png"
                      alt="NATA"
                      width={100}
                      height={40}
                      className="max-h-full w-auto object-contain"
                    />
                  </a>
                </div>
                <div className="flex items-center justify-center h-12">
                  <a href="https://ibac.org/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/LOGOS/ibac-logo.svg"
                      alt="IBAC"
                      width={100}
                      height={40}
                      className="max-h-full w-auto object-contain"
                    />
                  </a>
                </div>
                {/* <div className="flex items-center justify-center h-12" id="wyvern">
                  <button 
                    onClick={handleWyvernClick}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/images/LOGOS/wyvern_logo.png"
                      alt="WYVERN Verified"
                      width={100}
                      height={100}
                      className="max-h-full w-auto object-contain hover:opacity-80 transition-opacity"
                    />
                  </button>
                </div> */}
                <div className="flex items-center justify-center h-12">
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
                <div className="flex items-center justify-center h-12">
                  <a href="https://beechcraft.txtav.com/en/king-air-360" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/LOGOS/beechcraft-logo-white.svg"
                      alt="Beechcraft"
                      width={100}
                      height={40}
                      className="max-h-full w-auto object-contain"
                    />
                  </a>
                </div>
                <div className="flex items-center justify-center h-24 col-span-2">
                  <a href="https://www.gulfstream.com/en/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/LOGOS/gulff.png"
                      alt="Gulfstream"
                      width={120}
                      height={48}
                      className="max-h-full w-auto object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/CSM-Logo-WHITE-01-web300.jpg"
                alt="CSM Logo"
                width={100}
                height={50}
              />
              <p className="mt-2 md:text-xl">
                Copyright © 2024 CSM Aviation. All rights reserved.
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