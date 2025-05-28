import React, { useState, useEffect, useRef } from "react";
import KingAir200 from "../../../public/assets/aircrafts/King Air 200.png";
import KingAirF90 from "../../../public/assets/aircrafts/King Air F90.png";
import KingAirB200 from "../../../public/assets/aircrafts/King Air B200.png";
import KingAirB200GT from "../../../public/assets/aircrafts/King Air B200(2).png";
import CitationBravo from "../../../public/assets/aircrafts/CitationBravo.png";
import GulfstreamG150 from "../../../public/assets/aircrafts/GulfstreamG150.png";
import Cesnna from "../../../public/assets/aircrafts/Cessna_uc-35a_citation_560_ultra_v_arp-removebg-preview.png";
import Arrow from "../../../public/assets/aircrafts/arrow.svg";
import Image, { StaticImageData } from "next/image";

interface CardData {
  imageUrl: StaticImageData;
  aircraftName: string;
  tail : string;
  seats : string;
  range : string;
}

const CascadeSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<"Turbo" | "Midsize">(
    "Turbo"
  );
  const [titleAnimation, setTitleAnimation] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [detailsAnimation, setDetailsAnimation] = useState(false);
  
  const turboFleet: CardData[] = [
    { imageUrl: KingAir200, aircraftName: "King Air 200", tail: "N923AS", seats : "7+1", range: "1450NM" },
    { imageUrl: KingAirF90, aircraftName: "King Air F90", tail: "N30GT", seats : "6", range: "1450NM" },
    { imageUrl: KingAirB200, aircraftName: "King Air B200", tail: "N132N", seats : "7+1", range: "1400NM" },
    { imageUrl: KingAirB200GT, aircraftName: "King Air B200GT", tail: "N177TA", seats : "7", range: "1450NM" },
  ];

  const midsizeFleet: CardData[] = [
    { imageUrl: CitationBravo, aircraftName: "Citation Bravo" , tail: "N550ML", seats : "7", range: "1980NM"},
    { imageUrl: GulfstreamG150, aircraftName: "Gulfstream G150" , tail: "N8821C", seats : "8+1", range: "2760NM"},
    { imageUrl: GulfstreamG150, aircraftName: "Gulfstream G150" , tail: "N518KH", seats : "8+1", range: "2760NM"},
    { imageUrl: GulfstreamG150, aircraftName: "Gulfstream G150" , tail: "N360AV", seats : "7", range: "2760NM"},
    { imageUrl: Cesnna, aircraftName: "Cessna Citation CE560 Ultra", tail: "561CC", seats : "7+1", range: "1960NM" },
  ];

  const cardData = selectedCategory === "Turbo" ? turboFleet : midsizeFleet;
  const itemCount = cardData.length;

  const animateTitleChange = (callback: () => void) => {
    // First fade out
    setTitleAnimation(false);
    setDetailsAnimation(false);

    // Clear any existing timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // After fade out completes, execute callback and fade in
    animationTimeoutRef.current = setTimeout(() => {
      callback();
      setTitleAnimation(true);
      setDetailsAnimation(true);
    }, 400); // Matches transition duration
  };

  const goToNext = () => {
    animateTitleChange(() => {
      setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
    });
  };

  const goToPrev = () => {
    animateTitleChange(() => {
      setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
    });
  };


  useEffect(() => {
    // When category changes, fade out then reset index and fade in
    animateTitleChange(() => {
      setCurrentIndex(0);
    });
  }, [selectedCategory]);

  useEffect(() => {
    // Initial animation
    const timer = setTimeout(() => {
      setTitleAnimation(true);
      setDetailsAnimation(true);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const getSlidePosition = (index: number) => {
    if (index === currentIndex) return "now";
    if (index === (currentIndex + 1) % itemCount) return "next";
    if (index === (currentIndex - 1 + itemCount) % itemCount) return "prev";
    return "";
  };

 return (
    <>
    <section className="bg-black text-white bg-gradient-to-br from-cyan-800/40 via-blue-900/60 to-slate-900/80 backdrop-blur-sm ">
    <h1 className="max-sm:text-3xl max-md:text-4xl text-5xl font-bold pt-4 text-center ">Our Fleet</h1>
    <div  className="bg- text-white relative w-full min-h-screen mx-auto flex flex-col justify-between items-center overflow-x-hidden max-sm:py-30 py-20 font-montserrat ">
      <div className="flex flex-col gap-4 justify-center items-center">
        {/* Toggle Buttons */}
        <div id="selector" className="flex">
          <button
            className={`p-4 rounded-l-2xl max-sm:text-2xl max-md:text-3xl text-4xl transition-all duration-700 italic ${
              selectedCategory === "Turbo"
                ? "bg-gradient-to-br from-cyan-900/90 via-slate-900/95 to-blue-950/98 border border-transparent"
                : "border border-neutral-500 bg-transparent cursor-pointer text-white"
            }`}
            onClick={() => setSelectedCategory("Turbo")}
          >
            <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Turbo </span> Props
          </button>
          <button
            className={`p-4 rounded-r-2xl max-sm:text-2xl max-md:text-3xl text-4xl transition-all duration-700  ${
              selectedCategory === "Midsize"
                ? "bg-gradient-to-br from-cyan-900/90 via-slate-900/95 to-blue-950/98 border border-transparent"
                : "border border-neutral-500 bg-transparent cursor-pointer text-white"
            }`}
            onClick={() => setSelectedCategory("Midsize")}
          >
            <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Light</span> /Midsize
          </button>
        </div>

        {/* Aircraft Title with Animation */}
        <h1
          className={`text-center max-sm:text-3xl md:text-5xl  font-bold w-[100%] transition-all duration-[400ms] transform ease-out bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-[110%] ${
            titleAnimation
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
        >
          {cardData[currentIndex]?.aircraftName}
        </h1>
      </div>

      {/* Slides Container */}
      <div className="h-full">
        {cardData.map((item, index) => (
          <div
            key={index}
            className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-[0.3]
              transition-all duration-1000 ease-in-out opacity-0 -z-10 text-center
              ${
                getSlidePosition(index) === "next"
                  ? "left-1/2 -translate-x-[105%] scale-100 opacity-100 z-10 brightness-[85%]"
                  : ""
              }
              ${
                getSlidePosition(index) === "prev"
                  ? "left-1/2 translate-x-[5%] scale-100 opacity-100 z-10 brightness-[85%]"
                  : ""
              }
              ${
                getSlidePosition(index) === "now"
                  ? "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 scale-[0.8] opacity-100 z-[5]"
                  : ""
              }`}
          >
            <div className="text-[#243C82] w-[560px] h-auto max-sm:w-[320px] max-md:w-[400px] transition-all duration-1000">
              <div className="align-middle">
                <div className="relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.aircraftName}
                    className="relative -top-[35px] -left-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center max-sm:gap-4 gap-8">
        <button className="cursor-pointer" onClick={goToPrev}>
          <Image
            src={Arrow}
            alt="Previous"
            className="h-[40px] w-[40px] max-sm:h-[32px] max-sm:w-[32px] rotate-180"
          />
        </button>

        <div className={`max-md:text-xl text-2xl text-center max-md:p-2 p-4 bg-gradient-to-br from-cyan-900/90 via-slate-900/95 to-blue-950/98 backdrop-blur-sm text-white cursor-pointer rounded-2xl transition-all duration-[400ms] transform ease-out ${
          detailsAnimation
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}>
        <ul className="list-disc text-left pl-5 ">
          <li className="italic marker:text-[#8ec6ff]">Tail Number: <span className="text-[#8ec6ff] font-bold">{cardData[currentIndex]?.tail}</span></li>
          <li className="italic marker:text-[#8ec6ff]">Seats: <span className="text-[#8ec6ff] font-bold">{cardData[currentIndex]?.seats}</span></li>
          <li className="italic marker:text-[#8ec6ff]">Range: <span className="text-[#8ec6ff] font-bold">{cardData[currentIndex]?.range}</span></li>
        </ul>
        </div>

        <button className="cursor-pointer" onClick={goToNext}>
          <Image
            src={Arrow}
            alt="Next"
            className="h-[40px] w-[40px] max-sm:h-[32px] max-sm:w-[32px] rotate-0 "
          />
        </button>
      </div>
    </div>
    </section>
    </>
  );
};

export default CascadeSlider;