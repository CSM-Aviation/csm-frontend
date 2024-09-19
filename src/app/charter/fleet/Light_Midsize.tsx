import React from 'react';

const Light_Midsize = () => {
  const aircraftData = [
    { id: 'N550ML', model: 'CITATION BRAVO', image: '/images/N550ML_Images/N550ML/image.jpg' },
    { id: 'N8821C', model: 'GULFSTREAM G150', image: '/images/N8821C_Images/N8821C/exterior.jpg' },
    { id: 'N518KH', model: 'GULFSTREAM G150', image: '/images/N518KH_Images/N518KH/exterior.jpg' },
    { id: 'N360AV', model: 'GULFSTREAM GV150', image: '/images/N360AV_Images/N360AV/exterior.jpg' },
  ];

  return (
    <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {aircraftData.map((aircraft) => (
        <div key={aircraft.id} className="flex flex-col items-center">
          <div className="w-full h-48 mb-2 overflow-hidden">
            <img
              src={aircraft.image}
              alt={`${aircraft.id} - ${aircraft.model}`}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          <p className="text-center">
            {aircraft.id} - {aircraft.model}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Light_Midsize;