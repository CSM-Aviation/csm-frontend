import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faUser } from '@fortawesome/free-solid-svg-icons';

const HeaderMobileAccordion: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const router = useRouter();

  const toggleAccordion = (accordion: string) => {
    setActiveAccordion(activeAccordion === accordion ? null : accordion);
  };

  const handleLoginClick = () => {
    router.push('/admin/login');
  };

  return (
    <div className="w-full">
      <div className="accordion-item">
        <button
          className="w-full flex justify-between items-center p-4 text-white"
          onClick={() => toggleAccordion('charter')}
        >
          <span>CHARTER</span>
          <FontAwesomeIcon icon={activeAccordion === 'charter' ? faChevronUp : faChevronDown} />
        </button>
        {activeAccordion === 'charter' && (
          <div className="pl-8 py-2">
            <Link href="/charter/fleet" className="block py-2 text-white hover:text-blue-600">FLEET</Link>
            <Link href="/destinations" className="block py-2 text-white hover:text-blue-600">CHARTER DESTINATIONS</Link>
          </div>
        )}
      </div>
      
      <Link href="/management" className="block p-4 text-white hover:text-blue-600">MANAGEMENT</Link>
      
      <Link href="/maintenance" className="block p-4 text-white hover:text-blue-600">MAINTENANCE</Link>
      
      <div className="accordion-item">
        <button
          className="w-full flex justify-between items-center p-4 text-white"
          onClick={() => toggleAccordion('company')}
        >
          <span>COMPANY</span>
          <FontAwesomeIcon icon={activeAccordion === 'company' ? faChevronUp : faChevronDown} />
        </button>
        {activeAccordion === 'company' && (
          <div className="pl-8 py-2">
            <Link href="/company/about" className="block py-2 text-white hover:text-blue-600">ABOUT US</Link>
            <Link href="/company/contact" className="block py-2 text-white hover:text-blue-600">CONTACT</Link>
          </div>
        )}
      </div>

      {/* Added Login Button */}
      <button
        onClick={handleLoginClick}
        className="w-full flex items-center p-4 text-white hover:text-blue-600"
      >
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        <span>LOGIN</span>
      </button>
    </div>
  );
};

export default HeaderMobileAccordion;