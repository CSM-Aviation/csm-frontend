import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cityData } from "./CityDestination/cityData";

interface DestinationItem {
  name: string;
  id: keyof typeof cityData;
  image: string;
}

const destinations: DestinationItem[] = [
  {
    name: "Miami",
    id: "miami",
    image: "/images/PopularDestinations/Miami/Miami.jpg",
  },
  {
    name: "New York",
    id: "newyork",
    image: "/images/PopularDestinations/New York/NewYork.jpg",
  },
  {
    name: "Los Angeles",
    id: "losangeles",
    image: "/images/PopularDestinations/Los Angeles/LosAngeles.jpg",
  },
  {
    name: "Las Vegas",
    id: "lasvegas",
    image: "/images/PopularDestinations/Las Vegas/skyline.jpg",
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-csm-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white">
            Popular Destinations
          </h2>
          <p className="text-base md:text-lg text-white/50 font-normal text-center mt-3 mb-14 md:mb-16">
            Fly direct to the destinations that matter most
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/destinations/${destination.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 2}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* City info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {destination.name}
                    </h3>
                    <span className="text-xs sm:text-sm text-white/60 flex items-center gap-1 mt-1.5 group-hover:text-csm-gold transition-colors duration-300">
                      Explore flights{" "}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
