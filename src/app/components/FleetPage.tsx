import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Users, MapPin, Plane, Loader2 } from 'lucide-react';

// Aircraft data interfaces
interface CardData {
  imageUrl: string;
  aircraftName: string;
  tail: string;
  seats: string;
  range: string;
  speed: string;
  altitude: string;
}

const FleetPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<"Turbo" | "Midsize">("Turbo");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textAnimating, setTextAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fleet data - replace with your actual aircraft data
  const turboFleet: CardData[] = [
    {
      imageUrl: "/images/wheels_removed_fleet/N923AS.png",
      aircraftName: "King Air 200",
      tail: "N923AS",
      seats: "7+1",
      range: "1450NM",
      speed: "285 kts",
      altitude: "35,000 ft"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/30GT.png",
      aircraftName: "King Air F90",
      tail: "N30GT",
      seats: "6",
      range: "1450NM",
      speed: "270 kts",
      altitude: "31,000 ft"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/132N.png",
      aircraftName: "King Air B200",
      tail: "N132N",
      seats: "7+1",
      range: "1400NM",
      speed: "285 kts",
      altitude: "35,000 ft"
    },
    {
      imageUrl: "/images/wheels_removed_fleet/177TA.png",
      aircraftName: "King Air B200GT",
      tail: "N177TA",
      seats: "7",
      range: "1450NM",
      speed: "290 kts",
      altitude: "35,000 ft"
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

  const cardData = selectedCategory === "Turbo" ? turboFleet : midsizeFleet;
  const itemCount = cardData.length;

  // Get slide position like in working carousel
  const getSlidePosition = (index: number) => {
    if (index === currentIndex) return "now";
    if (index === (currentIndex + 1) % itemCount) return "next";
    if (index === (currentIndex - 1 + itemCount) % itemCount) return "prev";
    return "hidden";
  };

  // Animate title and details change
  const animateTitleChange = (callback: () => void) => {
    setTextAnimating(true);
    setIsAnimating(true);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      callback();
      setTextAnimating(false);
      setIsAnimating(false);
    }, 400);
  };

  const goToNext = () => {
    if (isAnimating) return;
    animateTitleChange(() => {
      setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
    });
  };

  const goToPrev = () => {
    if (isAnimating) return;
    animateTitleChange(() => {
      setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
    });
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    animateTitleChange(() => {
      setCurrentIndex(index);
    });
  };

  const handleCategoryChange = (category: "Turbo" | "Midsize") => {
    if (category === selectedCategory) return;
    animateTitleChange(() => {
      setSelectedCategory(category);
      setCurrentIndex(0);
    });
  };

  // Component loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && !isLoading) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, isLoading]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const currentAircraft = cardData[currentIndex];

  // Loading Screen
  if (isLoading) {
    return (
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden min-h-screen flex items-center justify-center">
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

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>

      <div className="relative z-10 px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Our Fleet
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto mb-4 animate-expand"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-slide-up">
            Experience excellence with our premium aircraft collection
          </p>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 backdrop-blur-md rounded-full p-1.5 border border-blue-500/30 animate-glow">
            <button
              onClick={() => handleCategoryChange("Turbo")}
              className={`px-6 py-3 rounded-l-full text-sm font-semibold transition-all duration-500 transform ${selectedCategory === "Turbo"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg scale-105"
                  : "text-gray-300 hover:text-white hover:scale-105"
                }`}
            >
              Turbo Props
            </button>
            <button
              onClick={() => handleCategoryChange("Midsize")}
              className={`px-6 py-3 rounded-r-full text-sm font-semibold transition-all duration-500 transform ${selectedCategory === "Midsize"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg scale-105"
                  : "text-gray-300 hover:text-white hover:scale-105"
                }`}
            >
              Light/Midsize
            </button>
          </div>
        </div>

        {/* Aircraft Title with Animation */}
        <div className="text-center mb-8">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2 transition-all duration-400 transform ease-out ${
              textAnimating ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            {currentAircraft?.aircraftName}
          </h2>
          <p className={`text-lg text-gray-400 transition-all duration-400 transform ease-out ${
            textAnimating ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
          }`}>
            {currentAircraft?.tail}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-80 md:h-96 lg:h-[450px] mb-8">
          {/* Aircraft Slides */}
          {cardData.map((item, index) => {
            const position = getSlidePosition(index);
            return (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-in-out cursor-pointer
                  ${position === "now" 
                    ? "scale-100 opacity-100 z-20 translate-x-[-50%]" 
                    : position === "next"
                    ? "scale-75 opacity-70 z-10 translate-x-[30%] brightness-75"
                    : position === "prev"
                    ? "scale-75 opacity-70 z-10 translate-x-[-130%] brightness-75"
                    : "scale-50 opacity-0 z-0"
                  }`}
                onClick={() => position !== "now" && goToSlide(index)}
              >
                <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 rounded-3xl border-2 border-blue-400/40 backdrop-blur-sm p-6 md:p-8 w-72 md:w-80 lg:w-96 h-56 md:h-64 lg:h-72 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500">
                  <img
                    src={item.imageUrl}
                    alt={item.aircraftName}
                    className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500"
                    draggable={false}
                  />
                </div>
                
                {/* Aircraft Badge */}
                {position === "now" && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-bounce-subtle">
                    {selectedCategory === "Turbo" ? "TURBOPROP" : "JET"} CLASS
                  </div>
                )}
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-125 z-30"
            disabled={isAnimating}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-125 z-30"
            disabled={isAnimating}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mb-8 space-x-2">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 hover:scale-125 ${index === currentIndex
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-300 w-8 animate-glow'
                  : 'bg-gray-600 hover:bg-gray-400 w-2'
                }`}
            />
          ))}
        </div>

        {/* Aircraft Details */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Stats Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 transition-all duration-400 transform ease-out ${textAnimating ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"}`}>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-400 mr-2" />
                <p className="text-blue-400 font-semibold">Seats</p>
              </div>
              <p className="text-2xl font-bold">{currentAircraft?.seats}</p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-blue-400 mr-2" />
                <p className="text-blue-400 font-semibold">Range</p>
              </div>
              <p className="text-2xl font-bold">{currentAircraft?.range}</p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <Plane className="w-6 h-6 text-blue-400 mr-2" />
                <p className="text-blue-400 font-semibold">Speed</p>
              </div>
              <p className="text-2xl font-bold">{currentAircraft?.speed}</p>
            </div>
          </div>

          {/* Performance Details */}
          <div className={`bg-gradient-to-r from-blue-900/30 to-slate-900/30 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm mb-6 transition-all duration-400 transform ease-out hover:shadow-lg hover:shadow-blue-500/10 ${textAnimating ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"}`}>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Performance Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
              <div>
                <span className="text-gray-300">Top Speed:</span>
                <p className="font-bold text-white text-lg">{currentAircraft?.speed}</p>
              </div>
              <div>
                <span className="text-gray-300">Service Ceiling:</span>
                <p className="font-bold text-white text-lg">{currentAircraft?.altitude}</p>
              </div>
              <div>
                <span className="text-gray-300">Maximum Range:</span>
                <p className="font-bold text-white text-lg">{currentAircraft?.range}</p>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className={`space-y-3 transition-all duration-400 transform ease-out ${textAnimating ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"}`}>
            <button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              View Details - {currentAircraft?.aircraftName}
            </button>
            <div className="md:ml-3 md:inline-block">
              <button className="w-full md:w-auto bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105">
                Request Charter Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 80px; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-expand { animation: expand 1s ease-out 0.5s both; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.3s both; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default FleetPage;