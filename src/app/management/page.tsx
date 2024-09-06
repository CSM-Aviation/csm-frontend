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
          <h1 className="text-5xl font-bold text-black mb-4">LEGENDARY AIRCRAFT MANAGEMENT SERVICES</h1>
          <p className="text-xl text-black">
            Creating and curating an unmatched aircraft ownership experience every day.
          </p>
        </div>
      </div>

      {/* Alternating Two-Column Sections */}
      <div className="container    px-10 py-16">
        {/* First Row: Left Text, Right Image */}
        <div className="flex flex-col  md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2  p-8 rounded-lg">
            <h2 className="text-3xl   px-16 font-bold mb-4">Charter Revenue Potential</h2>
            <p className="mb-6 text-gray-500 px-16">
              Every hour that your jet spends on the ground it could be generating revenue. If your aircraft is less than fully utilized, we may be able to offer you more charter opportunities, because our demand is greater!
            </p>
          </div>
          <div className="md:w-1/2   flex justify-center items-center">
            <div className="relative   w-[400px] h-[300px] aspect-[9/3]">
              <Image
                src="/images/aircraft_managment.png"
                layout="fill"
                objectFit="cover"
                alt="Private jet in hangar"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col  md:flex-row items-center gap-8 mb-16">
         
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative   w-[400px] h-[300px] aspect-[9/3]">
              <Image
                src="/images/charter.png"
                layout="fill"
                objectFit="cover"
                alt="Private jet in hangar"
                className="rounded-3xl"
              />
            </div>
          </div>

          <div className="md:w-1/2  p-8 rounded-lg">
            <h2 className="text-3xl   px-16 font-bold mb-4">Exclusive Cost Efficiencies</h2>
            <p className="mb-6 text-gray-500 px-16">
            Fuel discounts, alone, can save the owner of a midsize aircraft $20,000 to $25,000 per year. We also monitor the maintenance needs of your aircraft so maintenance and repairs are done on time and in the most cost effective manner.
            </p>
          </div>
        </div>

       
      </div>

      <div className='container bg-slate-900 px-10 py-16'>
      <div className="flex flex-col  md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2  p-8 rounded-lg">
            <h2 className="text-3xl  text-white  px-16 font-bold mb-4">Personal Approach</h2>
            <p className="mb-6 text-white px-16">
            Our clients work with a single point of contact, with a dedicated customer service specialist available 24/7. Our team also includes technical experts from fleet maintenance, operations and accounting -- all working in unison with your interests in mind. 
            </p>
          </div>
          <div className="md:w-1/2   flex justify-center items-center">
            <div className="relative   w-[400px] h-[300px] aspect-[9/3]">
              <Image
                src="/images/aircraft_managment.png"
                layout="fill"
                objectFit="cover"
                alt="Private jet in hangar"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row items-center gap-8 mb-16">
         
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative   w-[400px] h-[300px] aspect-[9/3]">
              <Image
                src="/images/charter.png"
                layout="fill"
                objectFit="cover"
                alt="Private jet in hangar"
                className="rounded-3xl"
              />
            </div>
          </div>

          <div className="md:w-1/2  p-8 rounded-lg">
            <h2 className="text-3xl   px-16 text-white  font-bold mb-4">Your Asset Maintained at Peak Level</h2>
            <p className="mb-6 text-white px-16">
            Under our management program, your aircraft will be maintained to its utmost, peak performance level. All aircraft must pass annual, safety audits by our professional and accredited mechanics so youll be confident that your aircraft is always flying at its peak performance level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;