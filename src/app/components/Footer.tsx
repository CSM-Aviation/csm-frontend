'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faPinterest, faYoutube, faWeixin, faWeibo, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import MessageDeskChatbot from './MessageDeskChatbot';
import Login from '../admin/Login';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Fresh offers, trending stories<br />and much more</h2>
            <Link href="/signup" className="inline-block bg-transparent border-2 border-white text-white py-2 px-4 hover:bg-white hover:text-black transition duration-300">
              Sign me up →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Got a Question?</h3>
              <ul className="space-y-2">
                <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
                <li><Link href="/press-centre" className="hover:underline">Press Centre</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="/locations" className="hover:underline">Map of Covent Garden</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="hover:underline">Privacy & Cookies Policy</Link></li>
                <li><Link href="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
                <li><Link href="/modern-slavery-act" className="hover:underline">Modern Slavery Act</Link></li>
                <li><Link href="/sitemap" className="hover:underline">Sitemap</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image src="/images/CSM-Logo-WHITE-01-web300.jpg" alt="CSM Logo" width={100} height={50} />
            <p className="mt-2 text-sm">Copyright © 2024 CSM Aviation. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faPinterest} /></a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faWeixin} /></a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faWeibo} /></a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300"><FontAwesomeIcon icon={faTiktok} /></a>
          </div>
        </div>
      </div>
      {/* <button 
        onClick={scrollToTop} 
        className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
        aria-label="Scroll to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button> */}
      <MessageDeskChatbot/>
    </footer>
  );
};

export default Footer;