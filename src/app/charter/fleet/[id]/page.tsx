"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NextPage } from "next";
import { apiService, FleetItem } from "../../../services/apiService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import {
  Armchair,
  Bath,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  CircleArrowLeft,
  CircleArrowRight,
  GaugeIcon,
  Luggage,
  MapPin,
  Plus,
  Snowflake,
  Users,
  X,
  Zap,
  Download,
} from "lucide-react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

interface CarouselImage {
  id: number;
  url: string;
  alt: string;
  thumbnail: string;
}

interface AircraftDetailsTypes extends FleetItem {
  yor: string;
  configurationUrls: string[] | undefined;
  pdfUrls: string[] | undefined;
  exteriorImages: string[];
  interiorImages: string[];
  lifestyleImages: string[];
  otherImages: string[];
}

const AircraftDetailPage: NextPage<AircraftDetailPageProps> = ({
  params,
  searchParams,
}) => {
  const { id } = params;
  const { model } = searchParams;
  const [aircraftDetails, setAircraftDetails] =
    useState<AircraftDetailsTypes | null>(null);
  const [allFleet, setAllFleet] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [configurationImageUrl, setConfigurationImageUrl] = useState<
    string | null
  >(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Image carousel states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const turbopropModels = [
    "King Air 200",
    "King Air F90",
    "King Air B200",
    "King Air B200GT",
  ];

  const lightJetModels = [
    "Citation Bravo",
    "Citation Ultra",
    "Cessna Citation CE560 Ultra",
  ];

  const midsizeJetModels = ["Gulfstream G150"];

  const getAllImages = (): CarouselImage[] => {
    if (!aircraftDetails) return [];
    
    const allImages = [
      ...aircraftDetails.exteriorImages,
      ...aircraftDetails.interiorImages,
      ...aircraftDetails.lifestyleImages,
      ...aircraftDetails.otherImages
    ];
    
    return allImages.map((url, index) => ({
      id: index,
      url: url,
      alt: `${aircraftDetails.aircraftName} - Image ${index + 1}`,
      thumbnail: url
    }));
  };

  const allImages = getAllImages();

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    setModalIndex(currentIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalSlide = () => {
    setModalIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevModalSlide = () => {
    setModalIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);
  
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
    if (turbopropModels.includes(aircraftName)) return "turboprop";
    if (lightJetModels.includes(aircraftName)) return "light";
    if (midsizeJetModels.includes(aircraftName)) return "midsize";
    return "unknown";
  };

  // Helper function to get category display name
  const getCategoryDisplayName = (aircraftName: string) => {
    const category = getAircraftCategory(aircraftName);
    switch (category) {
      case "turboprop":
        return "Turboprop";
      case "light":
        return "Light Jet";
      case "midsize":
        return "Midsize Jet";
      default:
        return "Aircraft";
    }
  };

  // Download PDF function
  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${aircraftDetails?.aircraftName}_${aircraftDetails?.registration}_Details.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
    const fetchAircraftDetails = async () => {
      try {
        const response = await apiService.fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        const aircraft = response.data?.find(
          (item: FleetItem) => item._id === id
        );

        // Initialize categories
        const imageCategories = {
          pdfUrls: [] as string[],
          configurationUrls: [] as string[],
          exteriorImages: [] as string[],
          interiorImages: [] as string[],
          lifestyleImages: [] as string[],
          otherImages: [] as string[],
        };

        // Categorize images if they exist
        if (aircraft?.imageUrls) {
          aircraft.imageUrls.forEach((item: string) => {
            if (item.includes("others/")) {
              if (item.includes(".pdf")) {
                imageCategories.pdfUrls.push(item);
              } else {
                imageCategories.configurationUrls.push(item);
              }
            } else if (item.includes("/exterior/")) {
              imageCategories.exteriorImages.push(item);
            } else if (item.includes("/interior/")) {
              imageCategories.interiorImages.push(item);
            } else if (item.includes("/lifestyle/")) {
              imageCategories.lifestyleImages.push(item);
            } else {
              imageCategories.otherImages.push(item);
            }
          });
        }

        if (response.data) {
          setAllFleet(response.data);
        }

        if (aircraft) {
          setConfigurationImageUrl(
            imageCategories.configurationUrls.length > 0
              ? imageCategories.configurationUrls[0]
              : null
          );
          setAircraftDetails({
            ...aircraft,
            ...imageCategories,
          });
          setPdfUrl(
            imageCategories.pdfUrls.length > 0
              ? imageCategories.pdfUrls[0]
              : null
          );
        } else {
          setError("Aircraft not found");
        }
      } catch (err) {
        console.error("Error fetching aircraft details:", err);
        setError("Failed to load aircraft details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAircraftDetails();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading aircraft details...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  if (!aircraftDetails) {
    return <div className="min-h-screen flex items-center justify-center">Aircraft not found</div>;
  }

  return (
    <section ref={mainRef} className="min-h-screen bg-white relative">
   
      <div className="mx-auto relative">
        <div className="flex flex-col justify-between items-center max-md:mt-10 mt-24 px-10 max-sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.p
              variants={childVariants}
              className="text-8xl max-lg:text-6xl mt-20 max-md:text-4xl font-bold text bg-gradient-to-r from-neutral-800 via-neutral-500 to-neutral-800 text-transparent bg-clip-text pb-4"
            >
              {aircraftDetails.aircraftName}
            </motion.p>
            {/* <motion.p
              variants={childVariants}
              className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl mb-6 bg-gradient-to-r from-neutral-800 via-neutral-500 to-neutral-800 text-transparent bg-clip-text"
            >
              {aircraftDetails.registration}
            </motion.p>
           */}
          </motion.div>
             <JetInsightComponent />
          {/* Specifications */}
          <div className="flex justify-evenly box-border w-full mt-10">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="flex flex-col items-center group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-dotted border-gray-500 rounded-full flex items-center justify-center transition-colors duration-300">
                    <Users className="w-6 h-6 md:w-10 md:h-10 text-black transition-colors duration-300" />
                  </div>
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
            >
              <div className="flex flex-col items-center group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-dotted border-gray-500 rounded-full flex items-center justify-center transition-colors duration-300">
                    <MapPin className="w-6 h-6 md:w-10 md:h-10 text-black transition-colors duration-300" />
                  </div>
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
            >
              <div className="flex flex-col items-center group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-dotted border-gray-500 rounded-full flex items-center justify-center transition-colors duration-300">
                    <GaugeIcon className="w-6 h-6 md:w-10 md:h-10 text-black transition-colors duration-300" />
                  </div>
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
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="relative group">
          {/* Main Image */}
          <div className="relative bg-stone-200 rounded-2xl overflow-hidden aspect-video shadow-2xl">
            {allImages.length > 0 ? (
              <>
                <Image
                  src={allImages[currentIndex].url}
                  alt={allImages[currentIndex].alt}
                  fill
                  className="w-full h-full object-cover transition-opacity duration-500"
                  loader={customLoader}
                />
                
                {/* Plus Icon Overlay */}
                <div className="absolute top-6 left-6">
                  <button
                    onClick={openModal}
                    className="bg-amber-600/20 backdrop-blur-sm rounded-full p-3 hover:bg-amber-600/30 transition-all duration-300 cursor-pointer transform hover:scale-110"
                    aria-label="View full size image"
                  >
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-amber-600/20 backdrop-blur-sm rounded-full p-3 hover:bg-amber-600/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                  disabled={allImages.length <= 1}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-amber-600/20 backdrop-blur-sm rounded-full p-3 hover:bg-amber-600/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                  disabled={allImages.length <= 1}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                No images available
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 0 && (
            <div className="mt-6 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`relative aspect-square rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    index === currentIndex
                      ? 'ring-2 ring-blue-600 shadow-lg'
                      : 'hover:ring-2 hover:ring-blue-400'
                  }`}
                >
                  <Image
                    src={image.thumbnail}
                    alt={image.alt}
                    fill
                    className="w-full h-full object-cover"
                    loader={customLoader}
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-blue-600/20"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={allImages[modalIndex].url}
                alt={allImages[modalIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />

              {/* Modal Navigation */}
              <button
                onClick={prevModalSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-4 hover:bg-white/20 transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={nextModalSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-4 hover:bg-white/20 transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                {modalIndex + 1} / {allImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Aircraft Details Tabs */}
      <div className="bg-[#f2f6fe] py-12 mt-10 px-6">
        <div className="w-full flex justify-center">
          <div className="uppercase text-black flex gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-xs md:text-sm ${
                activeTab === "overview"
                  ? "text-[#0c2f6a] bg-white p-4 rounded-3xl shadow-lg"
                  : "text-gray-600 p-4"
              } uppercase font-semibold transition-all duration-300`}
            >
              Capacity
            </button>
            <button
              onClick={() => setActiveTab("dimensions")}
              className={`text-xs md:text-sm ${
                activeTab === "dimensions"
                  ? "text-[#0c2f6a] bg-white p-4 rounded-3xl shadow-lg"
                  : "text-gray-600 p-4"
              } uppercase font-semibold transition-all duration-300`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab("cargo")}
              className={`text-xs md:text-sm ${
                activeTab === "cargo"
                  ? "text-[#0c2f6a] bg-white p-4 rounded-3xl shadow-lg"
                  : "text-gray-600 p-4"
              } uppercase font-semibold transition-all duration-300`}
            >
              Specs
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-10 flex px-6 justify-center">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-20">
              <div className="text-black flex flex-col w-full gap-6">
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
              <div className="text-black flex flex-col w-full gap-6">
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
            <div className="text-black flex flex-col w-full gap-6">
              <div className="w-full">
                <div className="flex gap-16 mt-8 justify-center">
                  <ul className="text-sm lg:text-lg space-y-2 font-bold text-gray-500">
                    <li>Wi-Fi:</li>
                    <li>Door Height:</li>
                    <li>Door Width:</li>
                    <li>YOR:</li>
                  </ul>
                  <ul className="text-sm lg:text-lg space-y-2 text-neutral-500">
                    <li>{aircraftDetails.wifi}</li>
                    <li>{aircraftDetails.doorHeight}</li>
                    <li>{aircraftDetails.doorWidth}</li>
                    <li>{aircraftDetails.yor}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Download PDF Button */}
        {pdfUrl && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={downloadPDF}
              className="bg-[#002040] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-3xl hover:bg-[#003060] transition-colors duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Aircraft Details
            </button>
          </div>
        )}
      </div>

      {/* Aircraft Amenities and Configuration */}
      <div className="flex justify-center p-10 text-black bg-[#002040] ">
        <div className="flex max-sm:flex-col justify-between w-full max-w-6xl gap-2">
          {/* Aircraft Amenities */}
          <section className="flex flex-col justify-center items-center">
            <h1 className="uppercase text-white lg:text-4xl">
              Aircraft Amenities
            </h1>
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
          
          {/* Cabin Configuration */}
          <div className="bg-[#002040] px-6">
            <h3 className="text-2xl md:mt-0 font-bold mb-4 text-white">
              Cabin Configuration
            </h3>
            <div className="w-full mt-5 h-1 bg-neutral-600"></div>
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
                <div className="text-white mt-10">No configuration image available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Aircraft */}
      <div className="remainingPlanes bg-[#002040] py-20 px-6">
        <h2 className="text-8xl max-lg:text-6xl max-md:text-4xl text-center flex flex-col gap-4 font-bold text bg-gradient-to-r from-neutral-500 via-neutral-200 to-neutral-500 text-transparent bg-clip-text pb-4">
          <span className="text-2xl">View More</span>
          <span className="text-2xl">
            {getCategoryDisplayName(aircraftDetails.aircraftName)}
          </span>
        </h2>
        <div className="relative">
          <Swiper
            cssMode={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
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
            {allFleet
              .filter((plane) => {
                // Exclude current plane
                if (plane._id === aircraftDetails._id) return false;

                // Get current aircraft category
                const currentCategory = getAircraftCategory(
                  aircraftDetails.aircraftName
                );
                const planeCategory = getAircraftCategory(plane.aircraftName);

                // Show only aircraft from the same category
                return currentCategory === planeCategory;
              })
              .map((plane, index) => {
                const validImages = plane.imageUrls?.filter(url =>
                  !url.includes('.DS_Store') &&
                  (url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg'))
                ) || [];
                const thumbnailSrc = validImages[0] || `/images/wheels_removed_fleet/${plane.registration}.png`;

                return (
                <SwiperSlide key={index} className="bg-transparent">
                  <div className="flex flex-col items-center p-6">
                    <div className="relative w-full h-64 mb-4">
                      <Image
                        src={thumbnailSrc}
                        alt={plane.aircraftName}
                        fill
                        className="object-contain"
                        loader={customLoader}
                      />
                    </div>
                    <div className="bg-gradient-to-r from-gray-500 via-gray-200 to-gray-500 p-4 rounded-3xl">
                      <h3 className="text-2xl font-bold text-black mb-2 text-center">
                        {plane.aircraftName}
                      </h3>
                      <div className="text-gray-700 text-center">
                        <p>Range: {plane.range}</p>
                        <p>Seats: {plane.seats}</p>
                      </div>
                    </div>
                    <Link
                      href={`/charter/fleet/${
                        plane._id
                      }?model=${encodeURIComponent(plane.aircraftName)}`}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </SwiperSlide>
                );
              })}
          </Swiper>

          <button className="custom-prev absolute left-0 top-1/2 z-10 text-white hover:text-blue-300 transition">
            <CircleArrowLeft size={40} />
          </button>
          <button className="custom-next absolute right-0 top-1/2 z-10 text-white hover:text-blue-300 transition">
            <CircleArrowRight size={40} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AircraftDetailPage;