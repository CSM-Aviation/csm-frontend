"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string | null;
  id: number;
  bgColor: string;
}

const ServiceCard: React.FC<ServiceCardProps & { index: number }> = ({
  image,
  title,
  description,
  link,
  bgColor,
  index,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ backgroundColor: bgColor }}
      className={`relative overflow-hidden group rounded-2xl shadow-md ${link ? "cursor-pointer" : ""}`}
      onClick={handleClick}
    >
      <div className="h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="text-white p-5 sm:p-6 flex-grow flex flex-col">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            {description}
          </p>
          {link && (
            <div className="mt-4 pt-2">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-csm-gold group-hover:gap-3 transition-all duration-300">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          )}
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
      bgColor: "#0C3C60",
    },
    {
      id: 2,
      image: "/images/medical.png",
      title: "Medical Charter",
      description:
        "We are proud to provide medavac air charter service to the Organ Donor community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.",
      link: null,
      bgColor: "#1A4B6E",
    },
    {
      id: 3,
      image: "/images/pilot.jpg",
      title: "Wholesale - Jet Brokers",
      description:
        "24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.",
      link: null,
      bgColor: "#002449",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-20 md:py-28 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
            Charter Services
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3 mb-14 md:mb-16">
            24/7 On Demand Charter
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
