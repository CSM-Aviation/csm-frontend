'use client'
import React, { useRef } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const TuvoliWidget = dynamic(() => import('../../components/TuvoliWidget'), {
  ssr: false,
});

const QuotePage: NextPage = () => {
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto ">
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/images/m1.jpg"
            layout="fill"
            objectFit="cover"
            alt="Aircraft on runway"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl text-center font-bold mb-4">BOOK A JET TODAY</h1>
          <div className='flex justify-center gap-2'>
            <button 
              className='border-2 border-red-400 bg-white text-black rounded-lg p-2'
              onClick={scrollToTuvoliWidget}
            >
              JET CHARTER QUOTE
            </button>
            <Link href="/company/contact">
              <button className='border-2 border-red-400 bg-white text-black rounded-lg p-2'>
                CONTACT US
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-slate-900 py-10'>
        <div className='text-5xl px-6 text-center font-bold text-white'>Private Charter Quote</div>
        <p className='px-28 text-center mt-10 text-white'>
          The cost of a private jet charter varies based on several factors: The size of the aircraft, 
          The distance you're flying, Your departure and arrival locations, How long your trip lasts, 
          Various other considerations. To get a ballpark figure for your private jet charter, you can 
          use our flight cost calculator. For more detailed pricing information, take a look at the 
          charts we've provided below. Our company boasts an extensive and varied charter fleet, and 
          we have connections to thousands of aircraft across the globe. This allows us to match you 
          with the ideal jet for your upcoming journey, whatever your specific needs may be.
        </p>
      </div>
      <div ref={tuvoliWidgetRef} className='p-16 bg-white'>
        <h1 className='text-center text-4xl'>JET CHARTER QUOTE</h1>
        <p className='text-center mt-5 text-2xl mb-5'>
          Explore our Dynamic map for immediate private aircraft rental pricing.
        </p>
        <TuvoliWidget />
      </div>
    </div>
  );
};

export default QuotePage;