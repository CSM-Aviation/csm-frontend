"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string | null;
  id: number;
  bgColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
  link,
  bgColor,
}) => {
  const router = useRouter();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };
  
  const lightenColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
  };

  return (
    <motion.div
      initial={{
        scale: 0.9,
        y: 20,
        rotateX: 60,
        rotateY: 20,
        perspective: 1000,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        damping: 15,
        stiffness: 80,
      }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      style={{
        background: `radial-gradient(ellipse 60% 90% at 50% 50%, ${bgColor} 80%,  ${lightenColor(
          bgColor,
          30
        )})`,
        backgroundColor: bgColor,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden group rounded-3xl shadow-lg cursor-pointer p-6 py-10`}
      onClick={handleClick}
    >
      <div
        className="h-full flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="text-white mb-4 flex-grow">
          <h3 className="text-3xl font-semibold mb-3 text-left">
            {title}
          </h3>

          <Tippy 
            content={description}
            placement="bottom-start"
            delay={[300, 0]}
            reference={descriptionRef}
            className="!bg-white font-bold p-4 !rounded-3xl !text-black !max-w-sm"
          >
            <p 
              ref={descriptionRef}
              className="leading lg:line-clamp-3 text-left text-sm text-neutral-300 font-semibold"
            >
              {description}
            </p>
          </Tippy>
        </div>

        <div className="relative w-full h-48 md:h-64 lg:h-96 mt-6 rounded-3xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-[inherit]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </motion.div>
  );
};

const ServicesCards: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      id: 1,
      image: "/images/image_jetcenter_gi_205.jpg",
      title: "Direct Charter to Public",
      description:
        "Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations, including Las Vegas and Reno, Nevada. We offer the Luxury Travel Experience, with safety and overall trip experience as our primary focus.",
      link: null,
      bgColor: "#173761",
    },
    {
      id: 2,
      image: "/images/medical.png",
      title: "Medical Charter",
      description:
        "We are proud to provide medavac air charter service to the Organ Donor community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.",
      link: "/donornetworkwest",
      bgColor: "#173761",
    },
    {
      id: 3,
      image: "/images/pilot.jpg",
      title: "Wholesale - Jet Brokers",
      description:
        "24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.",
      link: null,
      bgColor: "#173761",
    },
  ];

  return (
    <section className="px-10 py-24">
      <div className="container mx-auto px-4 xl:px-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 text-[#004080]">
          Charter Services
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-400">
          24/7 On Demand Charter
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-14">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;