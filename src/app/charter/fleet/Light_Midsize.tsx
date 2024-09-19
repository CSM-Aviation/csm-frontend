import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Light_Midsize = () => {
  const aircraftData = [
    { id: 'N550ML', model: 'CITATION BRAVO', image: '/images/N550ML_Images/N550ML/image.jpg' },
    { id: 'N8821C', model: 'GULFSTREAM G150', image: '/images/N8821C_Images/N8821C/exterior.jpg' },
    { id: 'N518KH', model: 'GULFSTREAM G150', image: '/images/N518KH_Images/N518KH/exterior.jpg' },
    { id: 'N360AV', model: 'GULFSTREAM GV150', image: '/images/N360AV_Images/N360AV/exterior.jpg' },
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
                style={{ objectFit: 'fill' }}
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
export default Light_Midsize;