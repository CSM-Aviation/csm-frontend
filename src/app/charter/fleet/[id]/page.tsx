"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NextPage } from "next";
import { apiService, FleetItem } from "../../../services/apiService";
import customLoader from "../../../../../image-loader";
import Button from "../Button";
import PlaneInterior from "../../../../../public/images/planeinterior.png";
import CabinConfiguration from "../../../../../public/images/cabinconfiguration.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import {
  Armchair,
  Bath,
  Briefcase,
  Calendar,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
  CircleArrowLeft,
  CircleArrowRight,
  DoorOpen,
  Download,
  Gauge,
  Gem,
  LandPlot,
  Layout,
  Luggage,
  MapPin,
  Maximize,
  Mountain,
  Plane,
  Ruler,
  Snowflake,
  Star,
  User,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
// import Interior_1 from "../../../../../public/images/fleet/interior(2).jpeg";
// import Interior_2 from "../../../../../public/images/fleet/interior(3).jpg";
// import Interior_3 from "../../../../../public/images/fleet/interior(4).jpeg";
// import Exterior_1 from "../../../../../public/images/fleet/exterior(1).jpg";
// import Exterior_2 from "../../../../../public/images/fleet/exterior(2).jpg";
// import Exterior_3 from "../../../../../public/images/fleet/exterior(3).jpg";
// import Interior_4 from "../../../../../public/images/fleet/exterior(4).jpg";
// import Lifestyle_1 from "../../../../../public/images/fleet/lifestyle(1).jpg";
// import Lifestyle_2 from "../../../../../public/images/fleet/lifestyle(2).webp";
// import Lifestyle_3 from "../../../../../public/images/fleet/lifestyle(3).webp";
// import Lifestyle_4 from "../../../../../public/images/fleet/lifestyle(4).jpg";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaToilet } from "react-icons/fa6";
gsap.registerPlugin(ScrollTrigger);
interface AircraftDetailPageProps {
  params: { id: string };
  searchParams: { model: string };
}
const JetInsightComponent = dynamic(
  () => import("../../../components/JetInsight/JetInsightComponent2"),
  {
    ssr: false,
  }
);
const TuvoliWidget = dynamic(() => import("../../../components/TuvoliWidget"), {
  ssr: false,
});

interface AircraftDetailsTypes extends FleetItem {
  configurationUrls: string[] | undefined;
  pdfUrls: string[] | undefined;
  exteriorImages: string[];
  interiorImages: string[];
  lifestyleImages: string[];
  otherImages: string[];
}
interface CardData {
  imageUrl: string;
  aircraftName: string;
  tail: string;
  seats: string;
  range: string;
  speed: string;
  altitude: string;
}
const AircraftDetailPage: NextPage<AircraftDetailPageProps> = ({
  params,
  searchParams,
}) => {
  const { id } = params;
  const { model } = searchParams;
  const [aircraftDetails, setAircraftDetails] =
    useState<AircraftDetailsTypes | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [configurationImageUrl, setConfigurationImageUrl] = useState<
    string | null
  >(null);
  const tuvoliWidgetRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const turbopropModels = [
    "King Air 200",
    "King Air F90",
    "King Air B200",
    "King Air B200GT",
  ];

  const lightJetModels = [
    "Citation Bravo",
    "Citation Ultra",
    "Cessna Citation CE560 Ultra"
  ];

  const midsizeJetModels = [
    "Gulfstream G150"
  ];

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

  const [currentIndex, setCurrentIndex] = useState(0);
interface ImageLoaderProps {
  src: string;
  width?: number;
  quality?: number;
}
const customLoader = ({ src }: ImageLoaderProps) => {
    return src;
  };

  // Helper function to get aircraft category
  const getAircraftCategory = (aircraftName: string) => {
    if (turbopropModels.includes(aircraftName)) return 'turboprop';
    if (lightJetModels.includes(aircraftName)) return 'light';
    if (midsizeJetModels.includes(aircraftName)) return 'midsize';
    return 'unknown';
  };

  // Helper function to get category display name
  const getCategoryDisplayName = (aircraftName: string) => {
    const category = getAircraftCategory(aircraftName);
    switch (category) {
      case 'turboprop': return 'Turboprop';
      case 'light': return 'Light Jet';
      case 'midsize': return 'Midsize Jet';
      default: return 'Aircraft';
    }
  };

  const scrollToTuvoliWidget = () => {
    tuvoliWidgetRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev > 0 ? prev - 1 : aircraftDetails!.imageUrls.length - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev < aircraftDetails!.imageUrls.length - 1 ? prev + 1 : 0
    );
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<
    "exterior" | "interior" | "lifestyle"
  >("exterior");
  // const categoryImages = {
  //   exterior: aircraftDetails?.imageUrls || [],
  //   interior: aircraftDetails?.imageUrls || [],
  //   lifestyle: aircraftDetails?.imageUrls || []
  // };

  const getCurrentCategoryImages = () => {
    if (!aircraftDetails) return [];
  
    switch (activeCategory) {
      case 'exterior':
        return aircraftDetails.exteriorImages.map((src, index) => ({ id: index, src }));
      case 'interior':
        return aircraftDetails.interiorImages.map((src, index) => ({ id: index, src }));
      case 'lifestyle':
        return aircraftDetails.lifestyleImages.map((src, index) => ({ id: index, src }));
      default:
        return [];
    }
  };

  // const localImageCategories = {
  //   exterior: [Exterior_1, Exterior_2, Exterior_3, Interior_4],
  //   interior: [Interior_1, Interior_2, Interior_3],
  //   lifestyle: [Lifestyle_1, Lifestyle_2, Lifestyle_3, Lifestyle_4],
  // };

  const scrollToImage = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.8; // 80% of container width (matches image width)

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const SpecificationCard = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div className="group flex items-center justify-between p-8 relative">
      <div className="flex items-center space-x-4 w-1/2">
        <span className="text-gray-600 font-extralight text-lg md:text-xl uppercase">
          {label}
        </span>
      </div>
      <span className="text-gray-900 font-bold text-lg text-left w-1/2">
        {value}
      </span>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-px bg-black"></div>
    </div>
  );

  useEffect(() => {
    if (!aircraftDetails || !mainRef.current) return;

    // Background color change - only runs when aircraftDetails is available
    // gsap.to(mainRef.current, {
    //   backgroundColor: "rgba(30, 41, 59, 0)",
    //   scrollTrigger: {
    //     trigger: mainRef.current,
    //     start: "4% center",
    //     end: "center center",
    //     scrub: true,
    //     markers: false,
    //   },
    // });
  }, [aircraftDetails]); // <-- Run this effect when aircraftDetails changes

  useEffect(() => {
    const fetchAircraftDetails = async () => {
      try {
        const response = await apiService.fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        const aircraft = response.data?.find((item: FleetItem) => item.registration === id);
    
        // Initialize categories
        const imageCategories = {
          pdfUrls: [] as string[],
          configurationUrls: [] as string[],
          exteriorImages: [] as string[],
          interiorImages: [] as string[],
          lifestyleImages: [] as string[],
          otherImages: [] as string[]
        };
    
        // Categorize images if they exist
        if (aircraft?.imageUrls) {
          aircraft.imageUrls.forEach((item: string) => {
            if (item.includes('others/')) {
              if (item.includes('.pdf')) {
                imageCategories.pdfUrls.push(item);
              } else {
                imageCategories.configurationUrls.push(item);
              }
            } else if (item.includes('/exterior/')) {
              imageCategories.exteriorImages.push(item);
            } else if (item.includes('/interior/')) {
              imageCategories.interiorImages.push(item);
            } else if (item.includes('/lifestyle/')) {
              imageCategories.lifestyleImages.push(item);
            } else {
              imageCategories.otherImages.push(item);
            }
          });
        }
    
        if (aircraft) {
          setConfigurationImageUrl(imageCategories.configurationUrls.length > 0 ? imageCategories.configurationUrls[0] : null);
          setAircraftDetails({ 
            ...aircraft, 
            ...imageCategories
          });
          setPdfUrl(imageCategories.pdfUrls.length > 0 ? imageCategories.pdfUrls[0] : null);
        } else {
          setError('Aircraft not found');
        }
      } catch (err) {
        console.error('Error fetching aircraft details:', err);
        setError('Failed to load aircraft details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAircraftDetails();
  }, [id]);

  

  const renderDetailRow = (label: string, value: string) => (
    <div className="flex justify-between py-2 border-b">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
  const getNoWheelsImage = (registration: string): string | undefined => {
    const matchedAircraft = sampleFleet.find(
      (aircraft) => aircraft.tail === registration
    );
    return matchedAircraft?.imageUrl;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  useEffect(() => {
    if (carouselRef.current && getCurrentCategoryImages().length > 0) {
      const container = carouselRef.current;
      const scrollAmount = container.clientWidth * 0.8; // 80% of container width

      // Disable smooth scrolling for initial load
      container.style.scrollBehavior = "auto";
      container.scrollLeft = scrollAmount;

      // Re-enable smooth scrolling after initial positioning
      setTimeout(() => {
        container.style.scrollBehavior = "smooth";
      }, 0);
    }
  }, [activeCategory, aircraftDetails]); // Run when category or aircraft data changes
  // Then proceed with your JSX that uses aircraftDetails

  if (!aircraftDetails) {
    return <div>Loading aircraft details...</div>; // Or some loading state
  }

  // Then proceed with your JSX that uses aircraftDetails
  return (
    <section ref={mainRef} className="min-h-screen bg-white relative">
      {/* <div className="w-full h-full overlay absolute z-[-5]"></div> */}
      <div className="mx-auto mt-10 py-5 relative ">
        <div className="flex flex-col justify-between items-center max-md:mt-10 mt-24 px-10 max-sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.p
              variants={childVariants}
              className="text-8xl max-lg:text-6xl max-md:text-4xl  font-bold text bg-gradient-to-r from-neutral-800 via-neutral-500 to-neutral-800 text-transparent bg-clip-text pb-4"
            >
              {aircraftDetails.aircraftName}
            </motion.p>
            <motion.p
              variants={childVariants}
              className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl mb-6 bg-gradient-to-r from-neutral-800 via-neutral-500 to-neutral-800 text-transparent bg-clip-text"
            >
              {aircraftDetails.registration}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <JetInsightComponent />
            </motion.div>
          </motion.div>
          <div className="flex justify-evenly box-border w-full mt-10">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className=""
            >
              <div className="flex flex-col items-center group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-dotted border-gray-500 rounded-full flex items-center justify-center transition-colors duration-300">
                    <Users className="w-6 h-6 md:w-10 md:h-10 text-black  transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500/10  rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 ease-out"></div>
                </div>
                <h3 className="text-black text-sm md:text-xl font-semibold mb-1 md:mb-2 group-hover:text-black transition-colors duration-300">
                  Seats
                </h3>
                <p className="text-black text-lg md:text-2xl font-bold">
                  {aircraftDetails.seats}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className=""
            >
              <div className="flex flex-col items-center group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-dotted border-gray-500 rounded-full flex items-center justify-center  transition-colors duration-300">
                    <MapPin className="w-6 h-6 md:w-10 md:h-10 text-black transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 ease-out"></div>
                </div>
                <h3 className="text-black text-sm md:text-xl font-semibold mb-1 md:mb-2 group-hover:text-black transition-colors duration-300">
                  Range
                </h3>
                <p className="text-black text-lg md:text-2xl font-bold">
                  {aircraftDetails.range}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className=""
            >
              <div className="flex flex-col items-center group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-dotted border-gray-500 rounded-full flex items-center justify-center  transition-colors duration-300">
                    <Calendar className="w-6 h-6 md:w-10 md:h-10 text-black  transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 ease-out"></div>
                </div>
                <h3 className="text-black text-sm md:text-xl font-semibold mb-1 md:mb-2 group-hover:text-black transition-colors duration-300">
                  Speed
                </h3>
                <p className="text-black text-lg md:text-2xl font-bold">
                  {aircraftDetails.speed}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex md:px-10 flex-col gap-4">
          <div className="flex-grow h-[90vh] py-10">
            <div className="relative w-full h-full mb-4 flex flex-col">
              {/* Thumbnail Gallery */}
              <div className="h-[90vh] relative overflow-hidden">
                {getCurrentCategoryImages().length > 0 ? (
                  <div
                    ref={carouselRef}
                    className="flex h-full w-full gap-4 px-[10%] overflow-x-auto scroll-smooth items-center scrollbar-custom"
                    style={{
                      scrollSnapType: "x mandatory",
                       scrollbarColor: "blue"
                    }}
                  >
                    {getCurrentCategoryImages().map((image) => (
                      <div
                        key={image.id}
                        id={`image-${image.id}`}
                        className="relative h-[90%] w-[80%] flex-shrink-0 snap-always snap-center transition-all duration-300"
                        style={{
                          minWidth: "80%",
                         
                        }}
                      >
                        <Image
                          src={image.src}
                          alt={`${
                            aircraftDetails.aircraftName
                          } - ${activeCategory} Image ${image.id + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          priority={image.id === 0}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}

                {/* Navigation Arrows */}
                {getCurrentCategoryImages().length > 1 && (
                  <>
                    <button
                      onClick={() => scrollToImage("left")}
                      className="absolute right-4 bottom-4 -translate-y-1/2 border border-neutral-400 p-4 rounded-full bg-black/50 hover:bg-black/70 transition"
                    >
                      <ChevronLeft color="#fff" />
                    </button>
                    <button
                      onClick={() => scrollToImage("right")}
                      className="absolute right-4 bottom-20 -translate-y-1/2 border border-neutral-400 p-4 rounded-full bg-black/50 hover:bg-black/70 transition"
                    >
                      <ChevronRight color="#fff" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-6">
            <div className="flex w-full justify-evenly">
              <button
                onClick={() => setActiveCategory("exterior")}
                className={`uppercase text-base md:text-[18px] border-t-4 w-full flex justify-center p-2 transition-colors cursor-pointer ${
                  activeCategory === "exterior"
                    ? "border-[#002040] text-[#002040] font-medium"
                    : "border-transparent text-gray-800"
                }`}
              >
                Exterior
              </button>
              <button
                onClick={() => setActiveCategory("interior")}
                className={`uppercase text-base md:text-[18px] border-t-4 w-full flex justify-center p-2 transition-colors cursor-pointer pointer-events-auto ${
                  activeCategory === "interior"
                    ? "border-[#002040] text-[#002040] font-medium"
                    : "border-transparent text-gray-800"
                }`}
              >
                Interior
              </button>
              <button
                onClick={() => setActiveCategory("lifestyle")}
                className={`uppercase text-base md:text-[18px] border-t-4 w-full flex justify-center p-2 transition-colors ${
                  activeCategory === "lifestyle"
                    ? "border-[#002040] text-[#002040] font-medium"
                    : "border-transparent text-gray-800"
                }`}
              >
                Lifestyle
              </button>
            </div>
          </div>
        </div>

        {/* Aircraft Details */}
        <div className=" bg-[#f2f6fe] py-12 mt-10 px-6 ">
          <div className="w-full flex justify-center">
          <div className="uppercase text-black flex gap-2 ">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-xs md:text-sm   ${
                activeTab === "overview"
                  ? "text-[#0c2f6a] bg-white p-4 rounded-3xl shadow-lg"
                  : "text-gray-600 p-4"
              }  uppercase font-semibold transition-all duration-300`}
            >
              Capacity
            </button>
            <button
              onClick={() => setActiveTab("dimensions")}
              className={`text-xs  md:text-sm  ${
                activeTab === "dimensions"
                  ? "text-[#0c2f6a] bg-white p-4 rounded-3xl shadow-lg"
                  : "text-gray-600 p-4"
              }  uppercase font-semibold transition-all duration-300`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab("cargo")}
              className={`text-xs  md:text-sm  ${
                activeTab === "cargo"
                  ? "text-[#0c2f6a] bg-white p-4 rounded-3xl shadow-lg"
                  : "text-gray-600 p-4"
              }  uppercase font-semibold transition-all duration-300`}
            >
              Specs
            </button>
          </div>
          </div>
         

          {/* Image display based on active tab */}
          <div className="mt-10 flex px-6  justify-center">
            {activeTab === "overview" && (
              <div className="flex flex-col gap-20">
                <div className="text-black flex flex-col w-full  gap-6">
                  <div className="w-full">
                    <div className="flex gap-16 mt-8">
                      <ul className="text-sm lg:text-lg space-y-2 font-bold text-gray-500">
                        <li>Seats:</li>
                        <li>Cabin Length:</li>
                        <li>Cabin Height:</li>
                        <li>Cabin Width:</li>
                        <li>Luggage Capacity:</li>
                        <li>Lavatory:</li>
                      </ul>
                      <ul className="text-sm lg:text-lg space-y-2 text-neutral-500">
                        <li>{aircraftDetails.seats}</li>
                        <li>{aircraftDetails.cabinLength}</li>
                        <li>{aircraftDetails.cabinHeight}</li>
                        <li>{aircraftDetails.cabinWidth}</li>
                        <li>{aircraftDetails.luggageCapacity}</li>
                        <li>{aircraftDetails.lavatory}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "dimensions" && (
              <div className="flex flex-col gap-20">
                <div className="text-black flex flex-col w-full  gap-6">
                  <div className="w-full">
                    <div className="flex gap-16 mt-8">
                      <ul className="text-sm lg:text-lg space-y-2 font-bold text-gray-500">
                        <li>Altitude:</li>
                        <li>Range:</li>
                        <li>Speed:</li>
                      </ul>
                      <ul className="text-sm lg:text-lg space-y-2 text-neutral-500">
                        <li>{aircraftDetails.altitude}</li>
                        <li>{aircraftDetails.range}</li>
                        <li>{aircraftDetails.speed}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "cargo" && (
              <div className="flex flex-col gap-20">
                <div className="text-black flex flex-col w-full  gap-6">
                  <div className="w-full">
                    <div className="flex gap-16 mt-8">
                      <ul className="text-sm lg:text-lg space-y-2 font-bold text-gray-500">
                        <li>Wi-Fi:</li>
                        <li>Door Height:</li>
                        <li>Door Width:</li>
                        <li>Year of Manufacture:</li>
                      </ul>
                      <ul className="text-sm lg:text-lg space-y-2 text-neutral-500">
                        <li>Yes</li>
                        <li>{aircraftDetails.doorHeight}</li>
                        <li>{aircraftDetails.doorWidth}</li>
                        <li>{aircraftDetails.yom}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            
          </div>
          {pdfUrl && (
        <div className="mt-10 flex justify-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#002040] text-white font-bold py-3 px-4 md:py-4 md:px-5 rounded-3xl"
          >
            Download Aircraft Details
          </a>
        </div>
      )}

        </div>

        <div className="flex justify-center p-10 text-black w-full bg-[#002040] ">
          <div className="flex max-sm:flex-col justify-between w-full max-w-6xl  gap-2">
            {/* Aircraft Amenities */}
            <section className="flex flex-col justify-center items-center">
              <h1 className="uppercase text-white lg:text-4xl">Aricraft Amenities</h1>
              <ul className="mt-10 space-y-4 text-gray-500">
                <li className="flex gap-4">
                  <Armchair />
                  <div>
                    <li className="font-bold text-white">
                      Custom Leather Upholstery
                    </li>
                    <li>
                      Premium leather seating crafted for ultimate comfort
                    </li>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Zap />
                  <div>
                    <li className="font-bold text-white">Power Outlets</li>
                    <li>Convenient charging solutions throughout the cabin</li>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Luggage />
                  <div>
                    <li className="font-bold text-white">
                      Luggage Racks and Hangars
                    </li>
                    <li>Spacious storage for all your travel essentials</li>
                  </div>
                </li>
                <li className="flex gap-4">
                  <ChefHat />
                  <div>
                    <li className="font-bold text-white">Galley Area</li>
                    <li>
                      Fully equipped kitchen facilities for in-flight dining
                    </li>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Snowflake />
                  <div>
                    <li className="font-bold text-white">Chiller</li>
                    <li>
                      Temperature-controlled storage for beverages and
                      refreshments
                    </li>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Bath />
                  <div>
                    <li className="font-bold text-white">
                      Aft Lavatory with Full Vanity
                    </li>
                    <li>Complete washroom facilities with premium amenities</li>
                  </div>
                </li>
              </ul>
           
            </section>
            <div className="bg-[#002040] px-6">
          <h3 className="text-2xl md:mt-0 font-bold mb-4 text-white">Cabin Configuration</h3>
          <div className='w-full mt-5 h-1 bg-neutral-600'></div>
          <div className="flex justify-center">
          {configurationImageUrl ? (
              <Image
                src={configurationImageUrl}
                alt="Cabin Configuration"
                width={800}
                height={400}
                layout="responsive"
                loader={customLoader}
                className="rounded-lg mt-10"
              />
            ) : (
              <div>No configuration image available</div>
            )}
          </div>
        </div>

          </div>
        </div>
        
        <div className="remainingPlanes  bg-[#002040] py-20 px-6">
  <h2 className="text-8xl max-lg:text-6xl max-md:text-4xl text-center flex flex-col gap-4 font-bold text bg-gradient-to-r from-neutral-500 via-neutral-200 to-neutral-500 text-transparent bg-clip-text pb-4">
    <span className="text-2xl">View More</span>
    <span className="text-2xl">{getCategoryDisplayName(aircraftDetails.aircraftName)}</span>
  </h2>
  <div className="relative">
    <Swiper
      cssMode={true}
      navigation={{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }}
      pagination={false}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className=""
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
    >
      {sampleFleet
        .filter(plane => {
          // Exclude current plane
          if (plane.tail === aircraftDetails.registration) return false;
          
          // Get current aircraft category
          const currentCategory = getAircraftCategory(aircraftDetails.aircraftName);
          const planeCategory = getAircraftCategory(plane.aircraftName);
          
          // Show only aircraft from the same category
          return currentCategory === planeCategory;
        })
        .map((plane, index) => (
          <SwiperSlide key={index} className="bg-transparent">
            <div className="flex flex-col items-center p-6">
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={plane.imageUrl}
                  alt={plane.aircraftName}
                  fill
                  className="object-contain"
                  loader={customLoader}
                />
              </div>
              <div className="bg-gradient-to-r from-gray-500 via-gray-200 to-gray-500 p-4 rounded-3xl">
              <h3 className="text-2xl font-bold text-black mb-2 text-center">{plane.aircraftName}</h3>
              <div className="text-gray-700 text-center">
                <p>Range: {plane.range}</p>
                <p>Seats: {plane.seats}</p>
              </div>
              </div>
              <Link 
                href={`/charter/fleet/${plane.tail}?model=${encodeURIComponent(plane.aircraftName)}`}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
    
    <button className="custom-prev absolute left-0 top-1/2 z-10 text-white hover:text-blue-300 transition">
      <CircleArrowLeft size={40} />
    </button>
    <button className="custom-next absolute right-0 top-1/2 z-10 text-white hover:text-blue-300 transition">
      <CircleArrowRight size={40} />
    </button>
  </div>
</div>
    

        {/* More JSX here... */}
        {isFullScreen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={aircraftDetails.imageUrls[selectedImage]}
                alt={`${aircraftDetails.aircraftName} - Full Screen Image`}
                fill
                loader={customLoader}
                style={{ objectFit: "contain" }}
              />
              <button
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
                onClick={toggleFullScreen}
              >
                <X size={24} />
              </button>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
                onClick={handlePrevImage}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
                onClick={handleNextImage}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AircraftDetailPage;