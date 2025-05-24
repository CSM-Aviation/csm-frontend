"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./Carousel.css";
import Image from "next/image";
import Aviation from "../../../public/images/service/services.jpg";
import Aviation2 from "../../../public/images/service/medical.png";
import Aviation3 from "../../../public/images/service/Aviation.jpg";

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState(["left", "center", "right"]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);

  // Card content data
  const cardData = [
    {
      label: "Direct Charter to Public",
      text: "Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations, including Las Vegas and Reno, Nevada. We offer the Luxury Travel Experience, with safety and overall trip experience as our primary focus.",
      image: Aviation,
    },
    {
      label: "Medical Charter",
      text: "We are proud to provide medavac air charter service to the Organ Donor community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.",
      image: Aviation2,
    },
    {
      label: "Wholesale - Jet Brokers",
      text: "24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.",
      image: Aviation3,
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
    if (position !== "center") {
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

  // Find the current active card data

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center py-8">
      <h1 className="text-[#143D4F] mt-10 text-4xl md:text-7xl text-center  font-bold">Our Services</h1>
      <div className="carousel-container flex flex-col md:flex-row-reverse">
        <div className="carousel" ref={carouselRef}>
          {cardData.map((card, index) => (
            <div
              key={index}
              className="item p-4 md:p-10 relative overflow-hidden"
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
                />
                {/* Black overlay with transparency */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
              </div>
              <div className="relative z-10">
                <h1 className="text-center text-lg md:text-[2rem] text-white mb-1 md:mb-2">{card.label}</h1>
                <p className="text-[8px] md:text-sm lg:text-base text-center font-normal text-white">
                  {card.text}
                </p>
              </div>
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