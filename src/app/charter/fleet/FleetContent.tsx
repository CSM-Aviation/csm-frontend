"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import TurboProps from "./TurboProps";
import Light_Midsize from "./Light_Midsize";
import { motion } from "framer-motion";
import JetInsightComponent from "@/app/components/JetInsight/JetInsightComponent2";
import Light from "./Light";

const FleetContent: React.FC = () => {
  const [selected, setSelected] = useState("turbo props");
  const tabs = ["turbo props", "light jets", "midsize jets"];

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/image_jetcenter_gi_205.jpg"
            fill
            style={{ objectFit: "cover" }}
            alt="CSM Aviation Fleet"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-csm-navy via-csm-navy/50 to-csm-navy/10" />
        </div>
        <div className="relative z-10 text-center pb-16 md:pb-20 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Our Fleet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-white/70"
          >
            Premium aircraft for every mission
          </motion.p>
        </div>
      </div>

      {/* Fleet Content Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* JetInsight CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center mb-10 md:mb-12"
          >
            <JetInsightComponent />
          </motion.div>

          {/* Underline Tabs */}
          <div className="flex flex-row justify-center border-b border-neutral-200 mb-10 md:mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelected(tab)}
                className={`px-4 sm:px-6 md:px-8 py-2.5 font-medium text-sm md:text-base lg:text-lg transition-all duration-300 capitalize ${
                  selected === tab
                    ? "text-csm-navy border-b-2 border-csm-blue -mb-[1px] font-semibold"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Aircraft Content */}
          <div className="w-full">
            {selected === "turbo props" && <TurboProps />}
            {selected === "light jets" && <Light />}
            {selected === "midsize jets" && <Light_Midsize />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FleetContent;
