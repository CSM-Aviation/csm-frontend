'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import TurboProps from './TurboProps';
import Light_Midsize from './Light_Midsize';
import dynamic from 'next/dynamic';
import Button from './Button';
import customLoader from '../../../../image-loader';
import JetInsightComponent from '@/app/components/JetInsight/JetInsightComponent';

const TuvoliWidget = dynamic(() => import('../../components/TuvoliWidget'), {
  ssr: false,
});

const FleetContent: React.FC = () => {
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='w-full bg-white'>
      <div className="relative h-screen">
        {/* Responsive Image Handling */}
        <div className="absolute inset-0">
          {/* Desktop Image */}
          <div className="hidden md:block w-full h-full">
            <Image
              src="/images/snow_desktop.jpg"
              layout="fill"
              loader={customLoader}
              objectFit="cover"
              alt="Fleet hero image"
              priority
              className="transition-opacity duration-300"
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden w-full h-full">
            <Image
              src="/images/snow_mobile.jpg"
              layout="fill"
              loader={customLoader}
              objectFit="cover"
              alt="Fleet hero image"
              priority
              className="transition-opacity duration-300"
            />
          </div>
        </div>
        {/* <div className='absolute inset-0  flex flex-col justify-center items-center'>
         
          <button
              className='bg-electric-blue r text-black max-md:p-3 hover:translate-y-[-5px]  hover:duration-300 ease-in-out rounded-lg px-1 py=1 md:px-6 md:py-6 text-lg font-semibold hover:bg-gray-200 transition'
              onClick={scrollToTuvoliWidget}
            >
              JET CHARTER QUOTE
            </button>
        </div> */}

        <div className="absolute inset-0  flex flex-col justify-center items-center ">
          <JetInsightComponent />
        </div>

      </div>
      <div className='p-4'>
        <Button />
        <div className='text-black py-4'>
          <h1 className='text-4xl mt-10'>TURBO PROPS</h1>
          <TurboProps />
          <h1 className='text-4xl mt-10'>LIGHT | MIDSIZE JETS</h1>
          <Light_Midsize />
        </div>
      </div>
      <div ref={tuvoliWidgetRef} className='mt-20 py-20 bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h2 className='text-center text-4xl mb-4'>INSTANT CHARTER QUOTE</h2>
          <p className='text-center text-xl mb-10'>
            Explore our Dynamic map for immediate private aircraft  pricing.
          </p>
          <TuvoliWidget />
        </div>
      </div>
    </div>
  );
};

export default FleetContent;