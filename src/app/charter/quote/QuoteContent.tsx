"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const TuvoliWidget = dynamic(() => import('../../components/TuvoliWidget'), {
  ssr: false,
});

const QuoteContent: React.FC = () => {
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative h-screen">
        <Image
          src="/images/maintenance.jpg"
          layout="fill"
          objectFit="cover"
          alt="Aircraft on runway"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-8">BOOK A JET TODAY</h1>
          <div className='flex gap-4'>
            <button
              className='bg-electric-blue text-black rounded-lg px-1 py=1 md:px-6 md:py-3 text-lg font-semibold hover:bg-gray-200 transition'
              onClick={scrollToTuvoliWidget}
            >
              JET CHARTER QUOTE
            </button>
            <Link href="/company/contact">
              <button className='bg-electric-blue text-black rounded-lg px-1 py-1 md:px-6 md:py-3 text-lg font-semibold hover:bg-red-700 transition'>
                CONTACT US
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='bg-slate-900 py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl text-center font-bold text-white mb-8'>Private Charter Quote</h2>
          <p className='max-w-4xl mx-auto text-center text-lg text-gray-300'>
            The cost of a private jet charter varies based on several factors: The size of the aircraft, 
            The distance you are flying, Your departure and arrival locations, How long your trip lasts, 
            Various other considerations. To get a ballpark figure for your private jet charter, you can 
            use our flight cost calculator. For more detailed pricing information, take a look at the 
            charts we have provided below. Our company boasts an extensive and varied charter fleet, and 
            we have connections to thousands of aircraft across the globe. This allows us to match you 
            with the ideal jet for your upcoming journey, whatever your specific needs may be.
          </p>
        </div>
      </div>

      <div ref={tuvoliWidgetRef} className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-center text-4xl mb-4'>JET CHARTER QUOTE</h2>
          <p className='text-center text-xl mb-10'>
            Explore our Dynamic map for immediate private aircraft rental pricing.
          </p>
          <TuvoliWidget />
        </div>
      </div>
    </>
  );
};

export default QuoteContent;