"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import Arrow from "../../../public/assets/aircrafts/arrow.svg";
import { apiService, FleetItem } from "../services/apiService";

interface CardData {
  imageUrl: string;
  aircraftName: string;
  tail: string;
  seats: string;
  range: string;
}

const FleetMob = () => {
  const [selectedCategory, setSelectedCategory] = useState<"Turbo" | "Midsize">("Turbo");
  const isAnimating = false;
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centeredCardIndex, setCenteredCardIndex] = useState<number>(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [fleetIdMap, setFleetIdMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchFleetIds = async () => {
      const response = await apiService.fetchFleet();
      if (response.data) {
        const map: Record<string, string> = {};
        response.data.forEach((item: FleetItem) => {
          map[item.registration] = item._id;
        });
        setFleetIdMap(map);
      }
    };
    fetchFleetIds();
  }, []);

  const turboFleet: CardData[] = [
    {
      imageUrl: "/images/wheels_removed_fleet/N923AS.png",
      aircraftName: "King Air 200",
      tail: "N923AS",
      seats: "7+1",
      range: "1450NM"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/30GT.png",
      aircraftName: "King Air F90",
      tail: "N30GT",
      seats: "6",
      range: "1450NM"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/132N.png",
      aircraftName: "King Air B200",
      tail: "N132N",
      seats: "7+1",
      range: "1400NM"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/177TA.png",
      aircraftName: "King Air B200GT",
      tail: "N177TA",
      seats: "7", 
      range: "1450NM"
    },
  ];

  const midsizeFleet: CardData[] = [
    {
      imageUrl: "/images/wheels_removed_fleet/N550ML.png",
      aircraftName: "Citation Bravo",
      tail: "N550ML",
      seats: "7",
      range: "1980NM"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N8821C.png",
      aircraftName: "Gulfstream G150",
      tail: "N8821C",
      seats: "8+1",
      range: "2760NM" 
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N518KH.png",
      aircraftName: "Gulfstream G150",
      tail: "N518KH",
      seats: "8+1",
      range: "2760NM"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N360AV.png",
      aircraftName: "Gulfstream G150",
      tail: "N360AV",
      seats: "7",
      range: "2760NM"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/N518KH.png",
      aircraftName: "Cessna Citation CE560 Ultra",
      tail: "561CC",
      seats: "7+1",
      range: "1960NM"
    },
  ];

  const currentFleet = selectedCategory === "Turbo" ? turboFleet : midsizeFleet;

  const handleCategoryChange = (category: "Turbo" | "Midsize") => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    setCenteredCardIndex(1);
    setIsInitialLoad(true);
  };

  const scrollToCard = (index: number, behavior: ScrollBehavior = "smooth") => {
    const container = scrollRef.current;
    if (!container) return;
  
    const cardsContainer = container.children[0];
    if (!cardsContainer || index < 0 || index >= cardsContainer.children.length) return;
  
    const card = cardsContainer.children[index] as HTMLElement;
    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const scrollPosition = card.offsetLeft - containerWidth / 2 + cardWidth / 2;
  
    // Immediately update the centered card index
    setCenteredCardIndex(index);
  
    // Cancel any pending scroll timeouts
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  
    container.scrollTo({
      left: scrollPosition,
      behavior,
    });
  };

  const handleNextCard = () => {
    const nextIndex = (centeredCardIndex + 1) % currentFleet.length;
    scrollToCard(nextIndex);
  };
  
  const handlePrevCard = () => {
    const prevIndex = (centeredCardIndex - 1 + currentFleet.length) % currentFleet.length;
    scrollToCard(prevIndex);
  };

  const handleScroll = () => {
    if (isInitialLoad) return;
  
    const container = scrollRef.current;
    if (!container) return;
  
    // Add a small debounce to prevent interference with manual scrolling
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  
    scrollTimeoutRef.current = setTimeout(() => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
  
      let closestIndex = 0;
      let closestDistance = Infinity;
  
      const cards = Array.from(container.children[0].children) as HTMLElement[];
  
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
  
      if (closestIndex !== centeredCardIndex) {
        setCenteredCardIndex(closestIndex);
      }
    }, 100);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (isInitialLoad) {
      scrollToCard(1, "auto");
      setIsInitialLoad(false);
    }

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, [selectedCategory, currentFleet, isInitialLoad]);

  // Get current aircraft for the View Details button
  const currentAircraft = currentFleet[centeredCardIndex];

  return (
    <section className="min-h-screen flex flex-col lg:hidden justify-center items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-50"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 animate-fade-in">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Our Fleet
          </span>
        </h1>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto mb-2 animate-expand"></div>
        <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto animate-slide-up">
          Experience excellence with our premium aircraft collection
        </p>
      </div>

      {/* Category Toggle */}
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="bg-black/30 backdrop-blur-md rounded-full p-1 border border-blue-500/30 animate-glow">
          <button
            onClick={() => handleCategoryChange("Turbo")}
            className={`px-3 md:px-4 py-2 rounded-l-full text-xs md:text-sm font-semibold transition-all duration-500 transform ${
              selectedCategory === "Turbo"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg scale-105"
                : "text-gray-300 hover:text-white hover:scale-105"
            }`}
          >
            Turbo Props
          </button>
          <button
            onClick={() => handleCategoryChange("Midsize")}
            className={`px-3 md:px-4 py-2 rounded-r-full text-xs md:text-sm font-semibold transition-all duration-500 transform ${
              selectedCategory === "Midsize"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg scale-105"
                : "text-gray-300 hover:text-white hover:scale-105"
            }`}
          >
            Light/Midsize
          </button>
        </div>
      </div>

      {/* Fleet Cards */}
      <div
        ref={scrollRef}
        className="text-white overflow-y-hidden overflow-x-scroll w-full px-4"
      >
        <div
          className={`flex gap-4 min-w-max transition-opacity duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentFleet.map((aircraft, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-blue-900/30 to-slate-900/30 rounded-2xl border border-blue-400/40 backdrop-blur-sm p-4 w-64 flex-shrink-0 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 flex flex-col justify-between transform ${
                centeredCardIndex === index ? "scale-100" : "scale-100"
              }`}
            >
              <Image
                src={aircraft.imageUrl}
                alt={aircraft.aircraftName}
                width={250}
                height={150}
                className="rounded-lg mx-auto mb-2"
              />
              <div className="flex flex-col justify-center items-center w-full bg-gradient-to-br from-cyan-900/90 via-slate-900/95 to-blue-950/98 backdrop-blur-sm p-4 rounded-2xl">
                <h3 className="text-lg font-bold">{aircraft.aircraftName}</h3>
                <ul className="list-disc">
                  {/* <li className="text-sm text-gray-300 italic">
                    Tail Number: <span>{aircraft.tail}</span>
                  </li> */}
                  <li className="text-sm text-gray-300 italic">
                    Seats: {aircraft.seats}
                  </li>
                  <li className="text-sm text-gray-300 italic">
                    Range: {aircraft.range}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls with View Details Button */}
      <div className="flex mt-4 gap-4 items-center">
        <Image 
          onClick={handlePrevCard}  
          src={Arrow} 
          alt="Previous" 
          className="rotate-180 w-[32px] h-[32px] cursor-pointer hover:opacity-80 transition-opacity"
        />
        
        {/* View Details Button with Navigation */}
        {currentAircraft && (
          <Link
            href={{
              pathname: `/charter/fleet/${fleetIdMap[currentAircraft.tail] || currentAircraft.tail}`,
              query: { model: currentAircraft.aircraftName },
            }}
          >
            <button className="md:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-lg md:rounded-xl text-sm md:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              View Details - {currentAircraft.aircraftName}
            </button>
          </Link>
        )}
        
        <Image 
          onClick={handleNextCard}  
          src={Arrow} 
          alt="Next" 
          className="rotate-0 w-[32px] h-[32px] cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </section>
  );
};

export default FleetMob;