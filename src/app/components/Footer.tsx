'use client'
import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import MessageDeskChatbot from './MessageDeskChatbot';
import EmailSubscription from './EmailSubscription';
import { usePathname } from 'next/navigation';
import MessageDeskController from './MessageDeskChatbot';

const Footer = () => {
  const pathname = usePathname();
  const shouldHideChatbot = pathname === '/f1race';

  return (
    <footer className="bg-[#004080] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <EmailSubscription />
          <div className="grid max-md:ml-10 grid-cols-3 gap-14">
            <div>
              <h3 className="md:text-2xl font-bold mb-4">Got a Question?</h3>
              <ul className="md:text-2xl space-y-2">
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
              <h3 className="md:text-2xl font-bold mb-4">Useful Links</h3>
              <ul className="md:text-2xl space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:underline"
                  >
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

            <div className="flex flex-col space-y-6">
              {/* Social Media Icons */}
              <div className="flex space-x-4 md:text-2xl">
                <a
                  href="https://www.facebook.com/CSMaviation/"
                  target="_blank"
                  className="text-white hover:text-gray-400 transition duration-300"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href="https://www.instagram.com/csm_aviation"
                  target="_blank"
                  className="text-white hover:text-gray-400 transition duration-300"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.linkedin.com/company/csm-aviation"
                  target="_blank"
                  className="text-white hover:text-gray-400 transition duration-300"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className='flex flex-col space-y-6 md:space-y-8'>
          <div className='flex justify-center md:justify-start items-center'>
            <div className=' text-xl md:text-2xl  font-bold'>Proud Members of</div>
            <div className='ml-2'>
              <FaArrowRight className="text-2xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            <a href="https://www.nata.aero/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Image
                src="/images/LOGOS/NATlogo.png"
                alt="NATA"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </a>
            
            <a href="https://ibac.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Image
                src="/images/LOGOS/ibac-logo.svg"
                alt="IBAC"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </a>

            <a href="https://www.wyvernltd.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Image
                src="/images/LOGOS/wyvern_logo.png"
                alt="Wyvern"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </a>

            <a href="https://beechcraft.txtav.com/en/king-air-360" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Image
                src="/images/LOGOS/beechcraft-logo-white.svg"
                alt="Beechcraft"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </a>

            <a href="https://www.gulfstream.com/en/" target="_blank" rel="noopener noreferrer" className="flex items-center col-span-2 md:col-span-1">
              <Image
                src="/images/LOGOS/gulff.png"
                alt="Gulfstream"
                width={100}
                height={200}
                className="h-32 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
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

      <MessageDeskController shouldHide={shouldHideChatbot} />
    </footer>
  );
};

export default Footer;