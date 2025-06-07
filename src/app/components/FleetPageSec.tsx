"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { apiService, FleetItem } from "../services/apiService";
import customLoader from "../../../image-loader";

interface CardData {
  imageUrl: string;
  aircraftName: string;
  tail: string;
  seats: string;
  range: string;
  speed: string;
  altitude: string;
}

const FleetPageSec = () => {
  const [turboPropData, setTurboPropData] = useState<FleetItem[]>([]);
  const [midSizeData, setMidSizeData] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("turboprops");

  const turboFleet: CardData[] = [
    {
        imageUrl: "/images/wheels_removed_fleet/N923AS.png",
        aircraftName: "King Air 200",
        tail: "N923AS",
        seats: "7+1",
        range: "1450NM",
        speed: "285 kts",
        altitude: "35,000 ft",
      },
      {
        imageUrl: "/images/wheels_removed_fleet/30GT.png",
        aircraftName: "King Air F90",
        tail: "N30GT",
        seats: "6",
        range: "1450NM",
        speed: "270 kts",
        altitude: "31,000 ft",
      },
      {
        imageUrl: "/images/wheels_removed_fleet/132N.png",
        aircraftName: "King Air B200",
        tail: "N132N",
        seats: "7+1",
        range: "1400NM",
        speed: "285 kts",
        altitude: "35,000 ft",
      },
      {
        imageUrl: "/images/wheels_removed_fleet/177TA.png",
        aircraftName: "King Air B200GT",
        tail: "N177TA",
        seats: "7",
        range: "1450NM",
        speed: "290 kts",
        altitude: "35,000 ft",
      },
  ];

  const midsizeFleet: CardData[] = [
    {
        imageUrl: "/images/wheels_removed_fleet/N550ML.png",
        aircraftName: "Citation Bravo",
        tail: "N550ML",
        seats: "7",
        range: "1980NM",
        speed: "420 kts",
        altitude: "45,000 ft",
      },
      {
        imageUrl: "/images/wheels_removed_fleet/N8821C.png",
        aircraftName: "Gulfstream G150",
        tail: "N8821C",
        seats: "8+1",
        range: "2760NM",
        speed: "470 kts",
        altitude: "45,000 ft",
      },
      {
        imageUrl: "/images/wheels_removed_fleet/N518KH.png",
        aircraftName: "Gulfstream G150",
        tail: "N518KH",
        seats: "8+1",
        range: "2760NM",
        speed: "470 kts",
        altitude: "45,000 ft",
      },
      {
        imageUrl: "/images/wheels_removed_fleet/N360AV.png",
        aircraftName: "Gulfstream G150",
        tail: "N360AV",
        seats: "7",
        range: "2760NM",
        speed: "470 kts",
        altitude: "45,000 ft",
      },
      {
        imageUrl: "/images/wheels_removed_fleet/561CC.png",
        aircraftName: "Citation Ultra",
        tail: "561CC",
        seats: "7+1",
        range: "1960NM",
        speed: "430 kts",
        altitude: "45,000 ft",
      },
  ];

  useEffect(() => {
    const fetchAircraftData = async () => {
      try {
        const response = await apiService.fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        
        const turboPropAircraft = response.data?.filter(
          (aircraft: FleetItem) => aircraft.category === "TURBOPROPS"
        ) || [];
        
        const midSizeAircraft = response.data?.filter(
          (aircraft: FleetItem) => aircraft.category === "LIGHT | MIDSIZE JETS"
        ) || [];
        
        setTurboPropData(turboPropAircraft);
        setMidSizeData(midSizeAircraft);
      } catch (err) {
        console.error("Error fetching aircraft data:", err);
        setError("Failed to load aircraft data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAircraftData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const renderAircraftCards = (aircraftData: FleetItem[], fallbackData: CardData[]) => {
    return aircraftData.map((aircraft) => {
      // Find matching no-wheels image from fallback data
      const noWheelsImage = fallbackData.find(
        (item) => item.tail === aircraft.registration
      )?.imageUrl || "/images/default-aircraft.jpg";

      // Get the first API image if available
      const apiImage = aircraft.imageUrls?.[0] || noWheelsImage;

      return (
        <Link
          href={{
            pathname: `/charter/fleet/${aircraft.registration}`,
            query: { model: aircraft.aircraftName },
          }}
          key={aircraft._id}
        >
          <motion.div 
            initial={{ scale: 0 }} 
            whileInView={{ scale: 1 }} 
            transition={{ duration: 0.5 }} 
            viewport={{ once: true }} 
            className="flex cursor-pointer flex-col items-center rounded-lg overflow-hidden group relative"
          >
            {/* Default Image (no wheels) */}
            <div className="w-full h-32 relative">
              <Image
                src={noWheelsImage}
                loader={customLoader}
                alt={`${aircraft.registration} - ${aircraft.aircraftName}`}
                height={500}
                width={500}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Text Info */}
            <div className="p-4 text-center text-black">
              <h3 className="text-xl font-semibold ">
                {aircraft.aircraftName}
              </h3>
              {/* <p className="text-black">Tail Number: {aircraft.registration}</p> */}
             
            </div>

            {/* Hover Effect - Shows API image */}
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={apiImage}
                  loader={customLoader}
                  alt={`${aircraft.registration} - ${aircraft.aircraftName}`}
                  fill
                  className="scale-125 group-hover:scale-100 transition-transform duration-700 ease-in-out object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold w-full text-center">
                <h1 className="w-full">{aircraft.aircraftName}</h1>
              </div>
            </div>
          </motion.div>
        </Link>
      );
    });
  };

  return (
    <>
    <div className="px-14 box-border">
        <h1 className="text-[#133d4f] text-7xl max-lg:text-6xl max-md:text-5xl max-sm:text-4xl mb-12 font-bold text-center">Our Fleet</h1>
    </div>
    
    {/* Category Toggle Buttons as Tabs */}
    <div className="px-14 box-border mb-8">
      <div className="flex justify-center border-b border-gray-300">
        {/* <button 
          onClick={() => setActiveCategory("all")}
          className={`px-8 py-3 font-medium text-lg transition-all duration-300 ${
            activeCategory === "all" 
              ? "text-[#133d4f] border-b-2 border-[#133d4f] -mb-[1px]" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Aircraft
        </button> */}
        <button 
          onClick={() => setActiveCategory("turboprops")}
          className={`px-10 py-4 font-medium text-4xl transition-all duration-300 ${
            activeCategory === "turboprops" 
              ? "text-[#133d4f] border-b-3 border-[#133d4f] -mb-[1px]" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Turbo Props
        </button>
        <button 
          onClick={() => setActiveCategory("midsize")}
          className={`px-10 py-4 font-medium text-4xl transition-all duration-300 ${
            activeCategory === "midsize" 
              ? "text-[#133d4f] border-b-3 border-[#133d4f] -mb-[1px]" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Midsize Jets
        </button>
      </div>
    </div>

    {/* Turbo Props Section */}
    {(activeCategory === "turboprops") && (
      <div className="px-14 box-border">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {renderAircraftCards(turboPropData, turboFleet)}
        </div>
      </div>
    )}

    {/* Midsize Jets Section */}
    {(activeCategory === "midsize") && (
      <div className="px-14 box-border mt-10">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {renderAircraftCards(midSizeData, midsizeFleet)}
        </div>
      </div>
    )}
    </>
  );
};

export default FleetPageSec;