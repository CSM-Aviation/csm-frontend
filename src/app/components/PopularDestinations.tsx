import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cityData } from "./CityDestination/cityData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setSlideDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setSlideDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Calculate the visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window === "undefined") return 4; // Default for SSR
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const visibleSlides = getVisibleSlides();
  const slidesToShow = Math.min(visibleSlides, destinations.length);

  // Create an array of slides to display (including clones for seamless looping)
  const getDisplaySlides = () => {
    const slides = [];
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentIndex + i) % destinations.length;
      slides.push(destinations[index]);
    }
    return slides;
  };

  const displaySlides = getDisplaySlides();

  return (
    <div className="w-full h-full py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center pb-5 text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-[#004080]">
          Popular Destinations
        </h1>
        <p className="text-sm px-8 md:text-xl lg:text-2xl font-bold text-center text-gray-400">
          Beyond First Class. Beyond Expectation. Safely There. Discover seamless and luxurious private jet charters to your global destinations, knowing your journey with CSM Aviation is underpinned by the highest safety standards.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto mt-12">
        <div className="flex items-center justify-center">
          <button
            onClick={handlePrev}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="p-2 rounded-full bg-white shadow-md text-[#004080] hover:bg-gray-100 transition-colors z-10 mr-4"
            aria-label="Previous destinations"
          >
            <FaChevronLeft size={24} />
          </button>

          <div className="flex-1 overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out`}
              style={{
                transform: `translateX(${slideDirection === "right" ? "-10px" : "10px"})`,
              }}
            >
              <div className="flex w-full gap-6 px-4">
                {displaySlides.map((destination, index) => (
                  <div
                    key={`${destination.id}-${index}`}
                    className={`flex-shrink-0 w-full ${
                      slidesToShow === 1
                        ? "sm:w-full"
                        : slidesToShow === 2
                        ? "sm:w-1/2"
                        : "sm:w-1/2 lg:w-1/4"
                    }`}
                  >
                    <Link
                      href={`/destinations/${destination.id}`}
                      className="block group"
                    >
                      <div className="cursor-pointer transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden h-full">
                        <div className="bg-black aspect-square relative">
                          <Image
                            className="object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
                            src={destination.image}
                            alt={destination.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={destination.name === "Miami"}
                          />
                        </div>
                        <div className="text-center text-black font-semibold py-4 bg-white">
                          {destination.name}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="p-2 rounded-full bg-white shadow-md text-[#004080] hover:bg-gray-100 transition-colors z-10 ml-4"
            aria-label="Next destinations"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-[#004080] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;