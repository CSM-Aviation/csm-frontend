"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceItem {
  title: string;
  image: string;
  content: string[];
  link: string;
}

const MaintManage: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: "Management",
      image: "/images/aircraft_managment.png",
      content: [
        "On-Demand Flight Department",
        "Lower Cost of Ownership",
        "Transparent Monthly Reporting",
        "Maintenance Program",
      ],
      link: "/management",
    },
    {
      title: "Maintenance",
      image: "/images/image_jetcenter_maintenance_014.jpeg",
      content: [
        "FAA Certified Part 145 Repair Station",
        "MRO Services",
        "Aircraft Engine Repair",
        "AOG Services",
        "Aircraft Parts",
      ],
      link: "/maintenance",
    },
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
            Beyond Charter
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3 mb-14 md:mb-16">
            Complete aviation solutions for owners and operators
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={service.link} className="group block">
                <div className="relative rounded-2xl overflow-hidden h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-csm-navy/90 via-csm-navy/40 to-transparent" />

                  {/* Content - always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                      {service.title}
                    </h3>
                    <ul className="space-y-2 mb-5 sm:mb-6">
                      {service.content.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2.5 text-sm sm:text-base text-white/90"
                        >
                          <CheckCircle className="w-4 h-4 text-csm-gold flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-csm-gold group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaintManage;
