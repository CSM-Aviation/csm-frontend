"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

const TurboProps = () => {
  const [aircraftData, setAircraftData] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      imageUrl: "/images/wheels_removed_fleet/N30ext1.png",
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden">
            <div className="aspect-[16/10] bg-neutral-200" />
            <div className="p-4 space-y-2">
              <div className="h-5 bg-neutral-200 rounded w-3/4 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-neutral-500">Unable to load aircraft data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {aircraftData.map((aircraft, index) => {
        const matchingCard = turboFleet.find(
          (item) => item.tail === aircraft.registration
        );
        const noWheelsImage = matchingCard?.imageUrl || "/images/default-aircraft.jpg";

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
  );
};

export default TurboProps;
