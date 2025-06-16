'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { NextPage } from 'next';
import { apiService, FleetItem } from '../../../services/apiService';
import customLoader from '../../../../../image-loader';
import Button from '../Button';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

interface AircraftDetailPageProps {
  params: { id: string };
  searchParams: { model: string };
}
const JetInsightComponent = dynamic(() => import('../../../components/JetInsight/JetInsightComponent2'), {
  ssr: false,
});
const TuvoliWidget = dynamic(() => import('../../../components/TuvoliWidget'), {
  ssr: false,
});

interface AircraftDetailsTypes extends FleetItem {
  configurationUrls: string[] | undefined;
  pdfUrls: string[] | undefined;
}

const AircraftDetailPage: NextPage<AircraftDetailPageProps> = ({ params, searchParams }) => {
  const { id } = params;
  const { model } = searchParams;
  const [aircraftDetails, setAircraftDetails] = useState<AircraftDetailsTypes | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [configurationImageUrl, setConfigurationImageUrl] = useState<string | null>(null);
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : aircraftDetails!.imageUrls.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev < aircraftDetails!.imageUrls.length - 1 ? prev + 1 : 0));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const fetchAircraftDetails = async () => {
      try {
        const response = await apiService.fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        const aircraft = response.data?.find((item: FleetItem) => item.registration === id);

        const {
          pdfUrls = [],
          configurationUrls = [],
          imageUrls = []
        } = (aircraft?.imageUrls?.reduce((acc: {
          pdfUrls: string[],
          configurationUrls: string[],
          imageUrls: string[]
        }, item: string) => {
          if (item.includes('others/')) {
            if (item.includes('.pdf')) {
              acc.pdfUrls.push(item);
            } else {
              acc.configurationUrls.push(item);
            }
          } else {
            acc.imageUrls.push(item);
          }
          return acc;
        }, { pdfUrls: [], configurationUrls: [], imageUrls: [] })) || { pdfUrls: [], configurationUrls: [], imageUrls: [] };

        if (aircraft) {
          setConfigurationImageUrl(configurationUrls.length > 0 ? configurationUrls[0] : null);
          setAircraftDetails({ ...aircraft, imageUrls, configurationUrls, pdfUrls });
          setPdfUrl(pdfUrls.length > 0 ? pdfUrls[0] : null);
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
      <p className="text-5xl max-md:text-3xl max-md:mt-10 mt-24 text-center mb-6">
         {aircraftDetails.aircraftName}
      </p>
      <div className="flex px-10   flex-col md:flex-row gap-10">
        <div className="flex-grow ">
          <div className="relative w-full h-[400px] mb-4">
            {aircraftDetails.imageUrls.length > 0 ? (
              <>
                <Image
                  src={aircraftDetails.imageUrls[selectedImage]}
                  alt={`${aircraftDetails.aircraftName} - Image ${selectedImage + 1}`}
                  fill
                  loader={customLoader}
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
                  onClick={toggleFullScreen}
                >
                  <Maximize size={24} />
                </button>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image Available
              </div>
            )}
          </div>
          <div className="flex flex-wrap  gap-2 pb-2">
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


        <div className="flex  justify-items-center  md:mt-24 gap-10  flex-col ">

          <JetInsightComponent />


        </div>


      </div>

      <div className='mt-20 px-10 text-black text-3xl'>
        Aircraft Details
        <div className='w-full mt-5 h-1 bg-black'></div>
      </div>
      <div className="mt-10 px-10 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
        {renderDetailRow("Aircraft Name", aircraftDetails.aircraftName)}
        {/* {renderDetailRow("Registration", aircraftDetails.registration)} */}
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



      {pdfUrl && (
        <div className="mt-10 flex justify-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black bg-electric-blue hover:translate-y-[-5px] border-gray-400 border-2 font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-black transition duration-300"
          >
            Download Aircraft Details
          </a>
        </div>
      )}

      <div className="mt-10 flex flex-col lg:flex-row justify-between px-10">
        {/* Aircraft Amenities */}
        <div className="lg:w-1/2 lg:mr-10">
          <h3 className="text-2xl font-bold mb-4">Aircraft Amenities</h3>
          <div className='w-full mt-5 h-1 bg-black'></div>
          <ul className="list-disc pl-5 mt-5">
            {aircraftDetails.amenities.split(',').map((amenity, index) => (
              <li key={index} className="text-lg">{amenity.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Cabin Configuration */}

        <div className="lg:w-1/2 lg:mr-10">
          <h3 className="text-2xl mt-10 md:mt-0 font-bold mb-4">Cabin Configuration</h3>
          <div className='w-full mt-5 h-1 bg-black'></div>
          <div className="flex justify-center">
            {configurationImageUrl ? (
              <Image
                src={configurationImageUrl}
                alt="Cabin Configuration"
                width={800}
                height={400}
                layout="responsive"
                loader={customLoader}
                className="rounded-lg mt-10"
              />
            ) : (
              <div>No configuration image available</div>
            )}

          </div>
        </div>
      </div>



      <div className='mt-20 px-10 text-black text-3xl'>
        Description
        <div className='w-full mt-5 h-1 bg-black'></div>
      </div>
      <div className="mt-5 px-10">
        <p>{aircraftDetails.description}</p>
      </div>

      {/* <div ref={tuvoliWidgetRef} className='mt-20 py-20 bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h2 className='text-center text-4xl mb-4'>INSTANT CHARTER QUOTE</h2>
          <p className='text-center text-xl mb-10'>
            Explore our Dynamic map for immediate private aircraft  pricing.
          </p>
          <TuvoliWidget />
        </div>
      </div> */}

      {/* More JSX here... */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={aircraftDetails.imageUrls[selectedImage]}
              alt={`${aircraftDetails.aircraftName} - Full Screen Image`}
              fill
              loader={customLoader}
              style={{ objectFit: 'contain' }}
            />
            <button
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
              onClick={toggleFullScreen}
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
              onClick={handlePrevImage}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
              onClick={handleNextImage}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AircraftDetailPage;