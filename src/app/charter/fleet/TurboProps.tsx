import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TurboProps = () => {
  const aircraftData = [
    { id: 'N30GT', model: 'KING F90', image: '/images/N30GT_Images/N30GT/30GT-exterior.jpg' },
    { id: 'N923AS', model: 'KING 200', image: '/images/N923AS_Images/N923AS/923AS-exterior.jpg' },
    { id: 'N132N', model: 'KING AIR B200', image: '/images/N132N_Images/N132N/132N-exterior.jpg' },
    { id: 'N177TA', model: 'KING AIR B200GT', image: '/images/N177TA_Images/N177TA/177TA_EXT.png' },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {aircraftData.map((aircraft) => (
        <Link 
          href={{
            pathname: `/charter/fleet/${aircraft.id}`,
            query: { model: aircraft.model },
          }}
          key={aircraft.id}
        >
          <div className="flex cursor-pointer flex-col items-center">
            <div className="w-full h-48 mb-2 overflow-hidden relative">
              <Image
                src={aircraft.image}
                alt={`${aircraft.id} - ${aircraft.model}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
              />
            </div>
            <p className="text-center">
              {aircraft.id} - {aircraft.model}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TurboProps;