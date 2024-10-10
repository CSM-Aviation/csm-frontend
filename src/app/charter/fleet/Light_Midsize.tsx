"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiService, FleetItem } from '../../services/apiService';
import customLoader from '../../../../image-loader'

const Light_Midsize = () => {
  const [aircraftData, setAircraftData] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAircraftData = async () => {
      try {
        const response = await apiService.fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        // Filter for light and midsize aircraft - adjust this filtering logic as needed
        const lightMidsizeAircraft = response.data?.filter((aircraft: FleetItem) =>
          aircraft.category === "LIGHT | MIDSIZE JETS"
        ) || [];
        setAircraftData(lightMidsizeAircraft);
      } catch (err) {
        console.error('Error fetching aircraft data:', err);
        setError('Failed to load aircraft data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAircraftData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {aircraftData.map((aircraft) => (
        <Link
          href={{
            pathname: `/charter/fleet/${aircraft.registration}`,
            query: { model: aircraft.aircraftName },
          }}
          key={aircraft._id}
        >
          <div className="flex cursor-pointer flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full h-48 relative">
              {aircraft.imageUrls && aircraft.imageUrls.length > 0 ? (
                <Image
                  src={aircraft.imageUrls[0]}
                  loader={customLoader}
                  alt={`${aircraft.registration} - ${aircraft.aircraftName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">{aircraft.aircraftName}</h3>
              <p className="text-gray-600">{aircraft.registration}</p>
              <p className="mt-2">Seats: {aircraft.seats}</p>
              <p>Range: {aircraft.range}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Light_Midsize;