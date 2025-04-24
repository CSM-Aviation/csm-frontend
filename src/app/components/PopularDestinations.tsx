import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cityData } from "./CityDestination/cityData";

interface DestinationItem {
  name: string;
  id: keyof typeof cityData;
  image: string;
}

// Define available destinations
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
    <div className="w-full h-full py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center pb-5 text-3xl  md:text-4xl lg:text-5xl font-bold  mb-3 text-[#004080]">
          Popular Destinations
        </h1>
        <p className="text-sm px-8 md:text-xl lg:text-2xl font-bold text-center  text-gray-400">
        Beyond First Class. Beyond Expectation. Safely There. Discover seamless and luxurious private jet charters to your global destinations, knowing your journey with CSM Aviation is underpinned by the highest safety standards.
        </p>
      </div>
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {destinations.map((destination) => (
          <Link 
            href={`/destinations/${destination.id}`} 
            key={destination.id}
            className="block group"
          >
            <div className="cursor-pointer transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden">
              <div className="bg-black aspect-square relative">
                <Image
                  className="object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={destination.name === "Miami"} // Prioritize loading for first image
                />
              </div>
              <div className="text-center font-semibold py-4 bg-white">
                {destination.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;