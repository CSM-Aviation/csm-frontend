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
  const [lightJetData, setLightJetData] = useState<FleetItem[]>([]);
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
      imageUrl: "/images/wheels_removed_fleet/30GT2.png",
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

  const lightJetFleet: CardData[] = [
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
      imageUrl: "/images/wheels_removed_fleet/561CC3.png",
      aircraftName: "Citation Ultra",
      tail: "561CC",
      seats: "7+1",
      range: "1960NM",
      speed: "430 kts",
      altitude: "45,000 ft",
    },
  ];

  const midsizeFleet: CardData[] = [
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
  ];

  useEffect(() => {
    const fetchAircraftData = async () => {
      try {
        const response = await apiService.fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }

        const turboPropAircraft =
          response.data?.filter(
            (aircraft: FleetItem) => aircraft.category === "TURBOPROPS"
          ) || [];
        const lightJetAircraft =
          response.data?.filter(
            (aircraft: FleetItem) => aircraft.category === "LIGHT"
          ) || [];
        const midSizeAircraft =
          response.data?.filter(
            (aircraft: FleetItem) =>
              aircraft.category === "LIGHT | MIDSIZE JETS"
          ) || [];

        setTurboPropData(turboPropAircraft);
        setLightJetData(lightJetAircraft);
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

  const categories = [
    { key: "turboprops", label: "Turbo Props" },
    { key: "lightjets", label: "Light Jets" },
    { key: "midsize", label: "Midsize Jets" },
  ];

  const getActiveData = (): { data: FleetItem[]; fallback: CardData[] } => {
    switch (activeCategory) {
      case "lightjets":
        return { data: lightJetData, fallback: lightJetFleet };
      case "midsize":
        return { data: midSizeData, fallback: midsizeFleet };
      default:
        return { data: turboPropData, fallback: turboFleet };
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:py-28 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-10">
            <div className="h-10 bg-neutral-200 rounded-lg w-48 mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden">
                  <div className="aspect-[16/10] bg-neutral-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-neutral-200 rounded w-3/4 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 md:py-28 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-500">
            Unable to load fleet data. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const { data: activeData, fallback: activeFallback } = getActiveData();

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
            Our Fleet
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3 mb-10 md:mb-12">
            Premium aircraft for every mission
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-row justify-center border-b border-neutral-200 mb-10 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 sm:px-6 md:px-8 py-2.5 font-medium text-sm md:text-base lg:text-lg transition-all duration-300 ${
                activeCategory === cat.key
                  ? "text-csm-navy border-b-2 border-csm-blue -mb-[1px] font-semibold"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Aircraft Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeData.map((aircraft, index) => {
            const noWheelsImage =
              activeFallback.find(
                (item) => item.tail === aircraft.registration
              )?.imageUrl || "/images/default-aircraft.jpg";

            const validImageUrls =
              aircraft.imageUrls?.filter(
                (url) =>
                  !url.includes(".DS_Store") &&
                  (url.includes(".jpg") ||
                    url.includes(".png") ||
                    url.includes(".jpeg"))
              ) || [];

            const apiImage = validImageUrls[0] || noWheelsImage;

            return (
              <motion.div
                key={aircraft._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={{
                    pathname: `/charter/fleet/${aircraft._id}`,
                    query: { model: aircraft.aircraftName },
                  }}
                >
                  <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Aircraft Image */}
                    <div className="w-full aspect-[16/10] relative bg-neutral-50 overflow-hidden">
                      <Image
                        src={noWheelsImage}
                        loader={customLoader}
                        alt={`${aircraft.registration} - ${aircraft.aircraftName}`}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4 text-center border-t border-neutral-100">
                      <h3 className="text-base sm:text-lg font-semibold text-csm-navy">
                        {aircraft.aircraftName}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1 group-hover:text-csm-blue transition-colors">
                        View Details
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FleetPageSec;
