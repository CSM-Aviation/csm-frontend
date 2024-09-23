"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';

interface AircraftDetailPageProps {
  params: { id: string };
  searchParams: { model: string };
}

interface AircraftDetails {
  aircraftName: string;
  registration: string;
  seats: string;
  lavatory: string;
  altitude: string;
  cabinHeight: string;
  cabinLength: string;
  cabinWidth: string;
  range: string;
  speed: string;
  wifi: string;
  luggageCapacity: string;
}

const TuvoliWidget = dynamic(() => import('../../../components/TuvoliWidget'), {
  ssr: false,
});

const AircraftDetailPage = ({ params, searchParams }: AircraftDetailPageProps) => {
  const { id } = params;
  const { model } = searchParams;
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [aircraftDetails, setAircraftDetails] = useState<AircraftDetails | null>(null);
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(() => {
    fetch(`/api/images?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched images:", data);
        setImages(data);
      })
      .catch(error => console.error('Error fetching images:', error));

    fetch(`https://www.csmaviation-api.com/api/fleet`)
      .then(response => response.json())
      .then(data => {
        const aircraft = data.find((item: AircraftDetails) => item.registration === id);
        if (aircraft) {
          setAircraftDetails(aircraft);
        }
      })
      .catch(error => console.error('Error fetching aircraft details:', error));
  }, [id]);

  const renderDetailRow = (label: string, value: string) => (
    <div className="flex justify-between py-2 border-b">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-5xl font-bold mb-4 text-blue-600">Aircraft Details</h1>
      {id && model && images.length > 0 ? (
        <div>
          <p className="text-5xl text-center mb-6">
            {id} - {model}
          </p>
          <div className="flex px-10 flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div className="relative w-full h-[400px] mb-4">
                <Image
                  src={images[selectedImage]}
                  alt={`${model} - Image ${selectedImage + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-wrap gap-2 pb-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-20 bg-red-200 rounded flex-shrink-0 cursor-pointer ${selectedImage === index ? 'border-2 rounded-md border-red-500' : ''
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={img}
                      alt={`${model} - Thumbnail ${index + 1}`}
                      fill
                      style={{ objectFit: 'fill' }}
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
          {aircraftDetails && (
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
            </div>

          )}
          <div className='mt-20 px-10 text-black text-3xl'>Aircraft Amenities
            <div className='w-3/4 mt-5 h-1 bg-black'></div>
            <div className='flex mt-10 gap-2 font-light flex-col'>
              <p>Custom Leather Upholstery</p>
              <p>Power outlets</p>
              <p>Luggage Racks and Hangars</p>
              <p> Galley area</p>
              <p>Chiller</p>
              <p>Aft lavatory with full vanity</p>
            </div>

          </div>
        </div>
      ) : (
        <p>Loading aircraft details...</p>
      )}
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

export default AircraftDetailPage;