"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { apiService, FleetItem } from "../../services/apiService";
import customLoader from "../../../../image-loader";
import { ArrowBigRight, CircleChevronRight, Loader2 } from "lucide-react";

interface CardData {
  imageUrl: string;
  aircraftName: string;
  tail: string;
  seats: string;
  range: string;
  speed: string;
  altitude: string;
}

const AllAircrafts = () => {
  const [aircraftData, setAircraftData] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample data for matching with API results
  const sampleFleet: CardData[] = [
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
      {
        imageUrl: "/images/wheels_removed_fleet/N550ML.png",
        aircraftName: "Citation Bravo",
        tail: "N550ML",
        seats: "7",
        range: "1450NM",
        speed: "290 kts",
        altitude: "35,000 ft",
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

  useEffect(() => {
    const fetchAircraftData = async () => {
      try {
        const response = await apiService.fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        const allowedCategories = ["TURBOPROPS", "LIGHT | MIDSIZE JETS"];
        const filteredAircraft = response.data?.filter(
          (aircraft: FleetItem) => allowedCategories.includes(aircraft.category)
        ) || [];
        setAircraftData(filteredAircraft);
      } catch (err) {
        console.error("Error fetching aircraft data:", err);
        setError("Failed to load aircraft data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAircraftData();
  }, []);

  if (loading) {
    return (
      <section className="relative bg-none text-white overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <Loader2 className="w-16 h-16 animate-spin text-blue-400 mx-auto" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400/20 rounded-full animate-pulse mx-auto"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-pulse">
              Loading Fleet
            </h2>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {aircraftData.map((aircraft) => (
        <Link
          href={{
            pathname: `/charter/fleet/${aircraft.registration}`,
            query: { model: aircraft.aircraftName },
          }}
          key={aircraft._id}
        >
          <motion.div initial={{scale: 0}} whileInView={{scale: 1}} transition={{duration : 0.5}} viewport={{once: true}} className="flex cursor-pointer col-span-1 row-span-1 flex-col items-center b rounded-lg overflow-hidden group relative">
            {/* Image */}
            <div className="w-full  relative">
              {aircraft.imageUrls && aircraft.imageUrls.length > 0 ? (
                (() => {
                  const matchingCard = sampleFleet.find(
                    (item) => item.tail === aircraft.registration
                  );
                  const imageUrl = matchingCard?.imageUrl || aircraft.imageUrls[0];

                  return (
                    <Image
                      src={imageUrl}
                      loader={customLoader}
                      alt={`${aircraft.aircraftName}`}
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
              <h3 className="text-2xl font-semibold mb-2 text-[#1e1e1e]">
                {aircraft.aircraftName}
              </h3>
              {/* <p className="text-[#00254a] font-bold italic">Tail Number: <span className="text-[#565656]">{aircraft.registration}</span></p> */}
              <p className="text-[#00254a] font-bold italic">Seats: <span className="text-[#565656]">{aircraft.seats}</span></p>
              <p className="text-[#00254a] font-bold italic">Range: <span  className="text-[#565656]">{aircraft.range}</span></p>
            </div>
            <button className="text-[#ba9154] max-md:flex hidden text-[16px] uppercase justify-center hover:gap-4 gap-2 items-center font-bold">discover<span className=""><CircleChevronRight size={18}/></span></button>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              {aircraft.imageUrls && aircraft.imageUrls.length > 0 ? (
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={aircraft.imageUrls[0]}
                    loader={customLoader}
                    alt={`${aircraft.aircraftName}`}
                    fill
                    className="scale-125 group-hover:scale-100 transition-transform duration-700 ease-in-out object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  No Image Available
                </div>
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold w-full h-full text-center ">
              <div className="w-full h-full flex flex-col justify-between p-6">
                <h1 className="w-full text-neutral-800">{aircraft.aircraftName}</h1>
                <button className="text-[#ba9154] text-[24px] uppercase flex justify-center gap-2 items-center font-bold">discover<span className=""><CircleChevronRight/></span></button>
              </div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default AllAircrafts;