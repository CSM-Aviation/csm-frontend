import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

const MaintenancePage: NextPage = () => {
  return (
    <div>
      {/* Hero Section */}
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
        {/* <div className="relative z-100 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl ml-20 font-bold text-red-700 mb-4">AIRCRAFT MAINTENANCE</h1>
          <p className="text-xl ml-20  text-black">
          Fresno - Madera -Visalia
          </p>
        </div> */}
      </div>
      <div className='bg-gray-400'>
        <div className='text-5xl p-6  font-bold text-white ml-32 '>FAA Certified Part 145 Repair Station</div>
        <p className='px-28  text-white py-10'>CSM Aviation specializes in Aircraft Management and part 91/135 operations, our Maintenance operations are provided by our partner organization Madera Jet Center, which operates all Aircraft Maintenance and Aircraft Parts business operations.  We offer a certified part 145 repair station to the Central Valley of California.  We have experienced aircraft mechanics and a comprehensive aircraft mechanics training program that ensures your aircraft will be serviced to the highest industry standards.  We have a zero-incident record with Safety and Client Satisfaction as our primary focus.  We service single-engine, turbo-props, light to heavy jets, and provide Mobile AOG services as well as keeping one of the largest aircraft parts stock supporting the Central Valley.  See below for more information and how to get in touch.</p>
      </div>
      {/* Alternating Two-Column Sections */}
      <div className="container    px-10 py-16">
        {/* First Row: Left Text, Right Image */}
        <div className="flex flex-col  md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2  p-8 rounded-lg">
            <h2 className="text-3xl   px-16 font-bold mb-4">MRO SERVICE</h2>
            <p className="mb-6 text-gray-500 px-16">
              Our highly experienced, factory-trained, airplane and maintenance teams offer both scheduled and unscheduled aircraft maintenance. Periodic servicing, annual inspections, airframe structural repairs, engine overhaul, engine replacements, electrical repairs, avionics installations, and repairs.
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
            <h2 className="text-3xl   px-16 font-bold mb-4">AIRCRAFT & ENGINES</h2>
            <p className="mb-6 text-gray-500 px-16">
              Specializing in maintenance, servicing, repairs, and overhaul of all models of Cessna aircraft, Piper aircraft, Beechcraft, Cirrus, Mooney, Aero Commander, Diamond, Learjet, Bombardier, Canadair, Cessna Citation, Falcon, Eclipse aircraft and many more.
            </p>
          </div>
        </div>


      </div>

      <div className='container bg-slate-900 px-10 py-16'>
        <div className="flex flex-col  md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2  p-8 rounded-lg">
            <h2 className="text-3xl  text-white  px-16 font-bold mb-4">AOG SERVICES</h2>
            <p className="mb-6 text-white px-16">
              We offer quick-response mobile  AOG services. We have a well-equipped and stocked mobile aircraft recovery vehicle, to provide you services at any airport in the Central California region. Our AOG team is trained to conduct quick and efficient offsite assistance and repairs.
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
            <h2 className="text-3xl   px-16 text-white  font-bold mb-4">AIRCRAFT PARTS</h2>
            <p className="mb-6 text-white px-16">
              We stock only high-quality , genuine aircraft parts, and an extensive inventory of tires, tubes, batteries, gaskets, filters, oils, lubes, and more.  24/7 call center to support your emergency needs.
            </p>
          </div>
        </div>
      </div>
      <div className='p-10 mx-auto flex flex-col items-center justify-center text-center max-w-2xl min-h-[300px]'>
        <h1 className='text-3xl font-bold mb-4'>Request a Quote</h1>
        <p className='mb-6'>
          Discover our exceptional approach to aircraft management, where we provide superior safety standards, outstanding service, and maximized value for your aviation asset.
        </p>
        <button className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300'>
          MAINTENANCE INQUIRY
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;