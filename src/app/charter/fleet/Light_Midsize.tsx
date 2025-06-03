"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { apiService, FleetItem } from "../../services/apiService";
import customLoader from "../../../../image-loader";
interface CardData {
  imageUrl: string;
  aircraftName: string;
  tail: string;
  seats: string;
  range: string;
  speed: string;
  altitude: string;
}
const Light_Midsize = () => {
  const [aircraftData, setAircraftData] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const turboFleet: CardData[] = [
    {
      imageUrl: "/images/wheels_removed_fleet/N550ML.png",
      aircraftName: "Citation Bravo",
      tail: "N550ML",
      seats: "7",
      range: "1980NM",
      speed: "420 kts",
      altitude: "45,000 ft"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N8821C.png",
      aircraftName: "Gulfstream G150",
      tail: "N8821C",
      seats: "8+1",
      range: "2760NM",
      speed: "470 kts",
      altitude: "45,000 ft"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N518KH.png",
      aircraftName: "Gulfstream G150",
      tail: "N518KH",
      seats: "8+1",
      range: "2760NM",
      speed: "470 kts",
      altitude: "45,000 ft"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N360AV.png",
      aircraftName: "Gulfstream G150",
      tail: "N360AV",
      seats: "7",
      range: "2760NM",
      speed: "470 kts",
      altitude: "45,000 ft"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N518KH.png",
      aircraftName: "Cessna Citation CE560 Ultra",
      tail: "561CC",
      seats: "7+1",
      range: "1960NM",
      speed: "430 kts",
      altitude: "45,000 ft"
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
      imageUrl: "/images/wheels_removed_fleet/N518KH.png",
      aircraftName: "Cessna Citation CE560 Ultra",
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
        // Filter for TURBOPROPS aircraft only
        const turboPropAircraft =
          response.data?.filter(
            (aircraft: FleetItem) => aircraft.category === "LIGHT | MIDSIZE JETS"
          ) || [];
        setAircraftData(turboPropAircraft);
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

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 w-full">
      {aircraftData.map((aircraft) => (
        <Link
          href={{
            pathname: `/charter/fleet/${aircraft.registration}`,
            query: { model: aircraft.aircraftName },
          }}
          key={aircraft._id}
        >
          <motion.div initial={{scale: 0}} whileInView={{scale: 1}} transition={{duration : 0.5}} viewport={{once: true}} className="flex cursor-pointer flex-col items-center rounded-lg overflow-hidden group relative">
            {/* Image */}
            <div className="w-full max-2xl:h-64 h-96 relative">
              {aircraft.imageUrls && aircraft.imageUrls.length > 0 ? (
                (() => {
                  const matchingCard = turboFleet.find(
                    (item) => item.tail === aircraft.registration
                  );
                  const imageUrl =
                    matchingCard?.imageUrl || aircraft.imageUrls[0];

                  return (
                    <Image
                      src={imageUrl}
                      loader={customLoader}
                      alt={`${aircraft.registration} - ${aircraft.aircraftName}`}
                      height={500}
                      width={500}
                      className="object-cover w-full"
                    />
                  );
                })()
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>

            {/* Text Info */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {aircraft.aircraftName}
              </h3>
              <p className="text-gray-600">{aircraft.registration}</p>
              <p className="mt-2">Seats: {aircraft.seats}</p>
              <p>Range: {aircraft.range}</p>
            </div>

            {/* Hidden on default, visible on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              {aircraft.imageUrls && aircraft.imageUrls.length > 0 ? (
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={aircraft.imageUrls[0]}
                    loader={customLoader}
                    alt={`${aircraft.registration} - ${aircraft.aircraftName}`}
                    fill
                    className="scale-125 group-hover:scale-100 transition-transform duration-700 ease-in-out object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  No Image Available
                </div>
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold w-full text-center">
                <h1 className="w-full">{aircraft.aircraftName}</h1>
              </div>
            </div>
            
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default Light_Midsize;