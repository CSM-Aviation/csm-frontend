"use client"
import React, { useEffect, useState, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import TurboProps from './TurboProps'
import Light_Midsize from './Light_Midsize';
import dynamic from 'next/dynamic';
import Button from './Button';

const TuvoliWidget = dynamic(() => import('../../components/TuvoliWidget'), {
  ssr: false,
});
const FleetPage: NextPage = () => {
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (

    <div className='w-full bg-white'>
      <div className="relative  h-screen">
        <Image
          src="/images/N923AS_Images/N923AS/snow.png"
          layout="fill"
          objectFit="cover"
          alt="Aircraft on runway"
          priority
        />
        <div className='absolute inset-0 bg-black bg-opacity-10 flex  items-center  px-4'>
          <h1 className='text-4xl  md:text-6xl font-bold text-white mb-4 max-w-4xl'>Explore your Fleet</h1>

        </div>
      </div>
      <div className='p-4 '>

        <Button />
        <div className='py-4'>
          <h1 className='text-4xl mt-10 '>Turbo Props</h1>
          <TurboProps />
          <h1 className='text-4xl mt-10 '>LIGHT | MIDSIZE JETS</h1>
          <Light_Midsize />
        </div>
      </div>
      <div ref={tuvoliWidgetRef} className='mt-20 py-20 bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h2 className='text-center text-4xl mb-4'>JET CHARTER QUOTE</h2>
          <p className='text-center text-xl mb-10'>
            Explore our Dynamic map for immediate private aircraft rental pricing.
          </p>
          <TuvoliWidget />
        </div>
      </div>
    </div>
  );
};

export default FleetPage;