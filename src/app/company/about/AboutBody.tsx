import React from 'react';
import Image from 'next/image';

const AboutUsComponent = () => {
  return (
    <div className="w-full">
      {/* Dedicated People Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue-900">Dedicated People Dedicated to Private Aviation</h2>
          <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              CSM started in private aviation in 2008 with our roots in Aircraft Maintenance and MRO services 
              to aircraft owners in the Central Valley of California. With the success of the Maintenance 
              operations, Managing Aircraft for local valley farmers and executives followed suit. Ownership 
              and leadership offering twenty years of Commercial flying experience and thirty years of FAA 
              regulatory experience ultimately led to CSM Aviation operating as a Part 135 Air Charter 
              provider in 2013. Our focus stays true; provide exceptional and reliable Private Charter and 
              Flight Department services on the backbone of Safety and Maintenance protocols.
            </p>
          </div>
        </div>
      </section>

      {/* CSM Core Values Section */}
      <section className="relative py-16 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* <Image
            src="/images/aircraft-hangar.jpg"
            alt="Aircraft Hangar"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          /> */}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side - Core Values */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-6">CSM Core Values</h2>
              <p className="text-2xl mb-6">The client is why we exist.</p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> People First
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Safety is in the Details
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Teamwork is the only way to win
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Care every step of the way
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Find Solutions, do not relay problems
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Be proactive, and take initiative
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Plan and Prepare, never panic
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Make a Difference
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-white-400">•</span> Grow Every Day
                </li>
              </ul>
            </div>
            
            {/* Right side - Image */}
            <div className="md:w-1/2">
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/csm-team.jpg"
                  alt="CSM Aviation Team"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsComponent;