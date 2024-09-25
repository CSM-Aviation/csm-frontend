"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { fetchFleet, FleetItem } from '../../../services/apiService';
import customLoader from '../../../../../image-loader'
interface AircraftDetailPageProps {
  params: { id: string };
  searchParams: { model: string };
}

const TuvoliWidget = dynamic(() => import('../../../components/TuvoliWidget'), {
  ssr: false,
});

const AircraftDetailPage: NextPage<AircraftDetailPageProps> = ({ params, searchParams }) => {
  const { id } = params;
  const { model } = searchParams;
  const [aircraftDetails, setAircraftDetails] = useState<FleetItem | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    const fetchAircraftDetails = async () => {
      try {
        const response = await fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        const aircraft = response.data?.find((item: FleetItem) => item.registration === id);
        if (aircraft) {
          setAircraftDetails(aircraft);
        } else {
          setError('Aircraft not found');
        }
      } catch (err) {
        console.error('Error fetching aircraft details:', err);
        setError('Failed to load aircraft details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAircraftDetails();
  }, [id]);

  const renderDetailRow = (label: string, value: string) => (
    <div className="flex justify-between py-2 border-b">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );

  if (loading) return <div>Loading aircraft details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!aircraftDetails) return <div>No aircraft details found.</div>;

  return (
    <div className="container mx-auto mt-10 text-black p-5">
      <h1 className="text-5xl font-bold mb-4 text-blue-600">Aircraft Details</h1>
      <p className="text-5xl text-center mb-6">
        {aircraftDetails.registration} - {aircraftDetails.aircraftName}
      </p>
      <div className="flex px-10 flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <div className="relative w-full h-[400px] mb-4">
            {aircraftDetails.imageUrls.length > 0 ? (
              <Image
                src={aircraftDetails.imageUrls[selectedImage]}
                alt={`${aircraftDetails.aircraftName} - Image ${selectedImage + 1}`}
                fill
                loader={customLoader}
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image Available
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 pb-2">
            {aircraftDetails.imageUrls.map((img, index) => (
              <div
                key={index}
                className={`relative w-24 h-20 bg-gray-200 rounded flex-shrink-0 cursor-pointer ${selectedImage === index ? 'border-2 rounded-md border-blue-500' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img}
                  alt={`${aircraftDetails.aircraftName} - Thumbnail ${index + 1}`}
                  fill
                  loader={customLoader}
                  style={{ objectFit: 'cover' }}
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <button className="text-black border-gray-400 border-2 font-bold py-5 px-10 rounded-2xl hover:bg-red-700 hover:text-white transition duration-300">
            CHARTER QUOTE
          </button>
          <button className="text-black font-bold py-5 px-10 border-gray-400 border-2 rounded-2xl hover:bg-blue-700 hover:text-white transition duration-300">
            CONTACT US
          </button>
        </div>
      </div>

      <div className='mt-20 px-10 text-black text-3xl'>
        Aircraft Details
        <div className='w-full mt-5 h-1 bg-black'></div>
      </div>
      <div className="mt-10 px-10 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
        {renderDetailRow("Aircraft Name", aircraftDetails.aircraftName)}
        {renderDetailRow("Registration", aircraftDetails.registration)}
        {renderDetailRow("Seats", aircraftDetails.seats)}
        {renderDetailRow("Lavatory", aircraftDetails.lavatory)}
        {renderDetailRow("Altitude", aircraftDetails.altitude)}
        {renderDetailRow("Cabin Height", aircraftDetails.cabinHeight)}
        {renderDetailRow("Cabin Length", aircraftDetails.cabinLength)}
        {renderDetailRow("Cabin Width", aircraftDetails.cabinWidth)}
        {renderDetailRow("Range", aircraftDetails.range)}
        {renderDetailRow("Speed", aircraftDetails.speed)}
        {renderDetailRow("Wi-Fi", aircraftDetails.wifi)}
        {renderDetailRow("Luggage Capacity", aircraftDetails.luggageCapacity)}
        {renderDetailRow("Door Height", aircraftDetails.doorHeight)}
        {renderDetailRow("Door Width", aircraftDetails.doorWidth)}
        {renderDetailRow("Year of Manufacture", aircraftDetails.yom)}
        {renderDetailRow("Category", aircraftDetails.category)}
      </div>

      <div className='mt-20 px-10 text-black text-3xl'>
        Description
        <div className='w-full mt-5 h-1 bg-black'></div>
      </div>
      <div className="mt-5 px-10">
        <p>{aircraftDetails.description}</p>
      </div>

      <div className='mt-20 px-10 text-black text-3xl'>
        Amenities
        <div className='w-full mt-5 h-1 bg-black'></div>
      </div>
      <div className="mt-5 px-10">
        <ul className="list-disc pl-5">
          {aircraftDetails.amenities.split(',').map((amenity, index) => (
            <li key={index}>{amenity.trim()}</li>
          ))}
        </ul>
      </div>

      {/* TuvoliWidget section remains the same */}
    </div>
  );
};

export default AircraftDetailPage;