import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

const ManagementPage: NextPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/images/about_us.jpg"
            layout="fill"
            objectFit="cover"
            alt="Aircraft on runway"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">LEGENDARY AIRCRAFT MANAGEMENT SERVICES</h1>
          <p className="text-xl text-white">
            Creating and curating an unmatched aircraft ownership experience every day.
          </p>
        </div>
      </div>

      {/* Two-Column Section */}
      <div className="container mx-auto px-14 py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2 md:pr-8">
            <h2 className="text-4xl font-bold mb-4">EXPERIENCE FREEDOM</h2>
            <p className="mb-6">
              Clay Lacy Aviation aircraft management allows the ultimate freedom with your aircraft. We bring joy to the aircraft ownership experience. We empower owners to thrive and to accomplish the undoable.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['BOEING BBJ', 'AIRBUS ACJ', 'GULFSTREAM', 'BOMBARDIER', 'DASSAULT', 'EMBRAER', 'HAWKER', 'CESSNA', 'PILATUS', 'HONDAJET'].map((brand, index) => (
                <div key={index} className="text-sm font-semibold">{brand}</div>
              ))}
            </div>
            
          </div>
          
          {/* Right Column - Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <Image
              src="/images/aircraft_managment.png"
              width={600}
              height={400}
              alt="Private jet in hangar"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;