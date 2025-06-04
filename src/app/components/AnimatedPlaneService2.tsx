"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./Carousel.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState(["left", "center", "right"]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const router = useRouter();

  // Card content data
  const cardData = [
    {
      label: "Direct Charter to Public",
      text: "Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations, including Las Vegas and Reno, Nevada. We offer the Luxury Travel Experience, with safety and overall trip experience as our primary focus.",
      image: "/images/service/Aviation.jpg",
      redirectUrl: null,
    },
    {
      label: "Medical Charter",
      text: "We are proud to provide medavac air charter service to the Organ Donor community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.",
      image: "/images/service/medical.png",
      redirectUrl: "/donornetworkwest",
    },
    {
      label: "Wholesale - Jet Brokers",
      text: "24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.",
      image: "/images/service/services.jpg",
      redirectUrl: null,
    },
  ];

  // Initialize item references
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, 3);
  }, []);

  const animateCarousel = (
    direction: "next" | "prev" | "toCenter" = "next",
    clickedIndex?: number
  ) => {
    if (!carouselRef.current || isAnimating.current) return;
    isAnimating.current = true;

    // Clear and restart auto-rotation timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    const timeline = gsap.timeline();

    // Determine new positions
    let newPositions: string[];
    if (direction === "toCenter" && clickedIndex !== undefined) {
      // When clicking an item, bring it to center
      const clickedPos = positions[clickedIndex];
      if (clickedPos === "center") return; // Already centered

      newPositions = [...positions];
      const centerIndex = positions.indexOf("center");
      const leftIndex = positions.indexOf("left");
      const rightIndex = positions.indexOf("right");

      if (clickedPos === "left") {
        newPositions[centerIndex] = "right";
        newPositions[leftIndex] = "center";
        newPositions[rightIndex] = "left";
      } else if (clickedPos === "right") {
        newPositions[centerIndex] = "left";
        newPositions[leftIndex] = "right";
        newPositions[rightIndex] = "center";
      }
    } else {
      // Normal rotation
      newPositions =
        direction === "next"
          ? [positions[2], positions[0], positions[1]]
          : [positions[1], positions[2], positions[0]];
    }

    // Animate all items to their new positions
    items.forEach((item, index) => {
      const newPosition = newPositions[index];

      timeline.to(
        item,
        {
          duration: 1.5,
          x: getXPosition(newPosition),
          scale: getScale(newPosition),
          zIndex: getZIndex(newPosition),
          opacity: getOpacity(newPosition),
          ease: "power2.out",
          onComplete: () => {
            if (index === items.length - 1) {
              isAnimating.current = false;
              setPositions(newPositions);
            }
          },
        },
        0
      );
    });
  };

  const handleItemClick = (index: number) => {
    const position = positions[index];
    const card = cardData[index];
    
    if (position === "center" && card.redirectUrl) {
      // If the card is centered and has a redirect URL, navigate to it
      router.push(card.redirectUrl);
    } else if (position !== "center") {
      // If not centered, bring it to center
      animateCarousel("toCenter", index);
    }
  };

  const handleDotClick = (targetPosition: "left" | "center" | "right") => {
    const index = positions.indexOf(targetPosition);
    if (targetPosition !== "center" && index !== -1) {
      animateCarousel("toCenter", index);
    }
  };

  const getXPosition = (position: string) => {
    switch (position) {
      case "left":
        return -200;
      case "right":
        return 200;
      default:
        return 0;
    }
  };

  const getScale = (position: string) => {
    return position === "center" ? 1 : 0.8;
  };

  const getZIndex = (position: string) => {
    return position === "center"
      ? 3
      : position === "left" || position === "right"
      ? 2
      : 1;
  };

  const getOpacity = (position: string) => {
    return position === "center" ? 1 : 0.7;
  };

  // Set up auto-rotation
  useEffect(() => {
    const startAutoRotation = () => {
      intervalRef.current = setInterval(() => {
        if (!isAnimating.current) {
          animateCarousel("next");
        }
      }, 3000);
    };

    startAutoRotation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [positions]);

  // Set initial positions
  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    items.forEach((item, index) => {
      gsap.set(item, {
        x: getXPosition(positions[index]),
        scale: getScale(positions[index]),
        zIndex: getZIndex(positions[index]),
        opacity: getOpacity(positions[index]),
      });
    });
  }, [positions]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center py-8 lg:py-12">
      <h1 className="text-[#143D4F] text-4xl md:text-7xl text-center font-bold">Our Services</h1>
      <div className="carousel-container flex flex-col md:flex-row-reverse">
        <div className="carousel" ref={carouselRef}>
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`item p-6 md:p-10 relative overflow-hidden cursor-pointer ${
                positions[index] === "center" && card.redirectUrl 
                  ? "hover:scale-105 transition-transform duration-200" 
                  : ""
              }`}
              ref={(el: HTMLDivElement | null) => {
                itemsRef.current[index] = el;
              }}
              onClick={() => handleItemClick(index)}
            >
              <div className="absolute inset-0">
                <Image
                  className="w-full h-full object-cover rounded-2xl"
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Black overlay with transparency */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
              </div>
              <div className="relative z-10 md:flex md:flex-col md:justify-center md:h-full">
                {/* Keep original sizing for mobile/tablet, only fix larger screens */}
                <h1 className="text-center text-[1.3rem] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white mb-1 md:mb-4 leading-7 md:leading-tight font-bold md:px-2">
                  {card.label}
                </h1>
                <p className="text-[10px] md:text-base lg:text-lg text-center font-normal text-white md:px-2 md:leading-relaxed">
                  {card.text}
                </p>
              </div>
              {/* Optional: Add a visual indicator for clickable cards when centered */}
              {positions[index] === "center" && card.redirectUrl && (
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-20 rounded-full p-2">
                  <svg 
                    className="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Pagination Dots */}
        <div className="pagination-dots flex md:flex-col flex-row justify-center mx-4 gap-2">
          {cardData.map((card, index) => {
            const isActive = positions[index] === "center";

            return (
              <div
                key={index}
                className={`dot-${index} rounded-full bg-center bg-cover cursor-pointer transition-all duration-300 border-2 relative overflow-hidden ${
                  isActive
                    ? "w-16 h-8 md:w-8 md:h-16 border-black"
                    : "w-8 h-8 border-transparent"
                }`}
                onClick={() => handleDotClick(positions[index] as "left" | "center" | "right")}
              >
                {/* Add overlay to the dots as well */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Carousel;