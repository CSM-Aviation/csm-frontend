'use client'
import React from 'react';
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

            <div className="flex md:text-2xl space-x-4">
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

        {/* Partners Section */}
        <div className="border-t border-white pt-8 mb-8">
          <h3 className="text-xl font-bold mb-6 text-center">Proud Partners / Members Of:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <a href="https://www.gulfstream.com/en/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg hover:opacity-80 transition-opacity">
              <Image
                src="/images/partners/gulfstream-logo.png"
                alt="Gulfstream"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </a>
            <a href="https://ibac.org/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg hover:opacity-80 transition-opacity">
              <Image
                src="/images/partners/ibac-logo.png"
                alt="IBAC"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </a>
            <a href="https://www.nata.aero/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg hover:opacity-80 transition-opacity">
              <Image
                src="/images/partners/nata-logo.png"
                alt="NATA"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </a>
            <a href="https://beechcraft.txtav.com/en/king-air-360" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg hover:opacity-80 transition-opacity">
              <Image
                src="/images/partners/beechcraft-logo.png"
                alt="Beechcraft"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        <div className="border-t border-white pt-8 flex flex-col md:flex-row justify-between items-center">
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