"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TurboProps from "./TurboProps";
import Light_Midsize from "./Light_Midsize";
import AllAircrafts from "./All_Aircrafts";
import { motion } from "motion/react";
import JetInsightComponent from "@/app/components/JetInsight/JetInsightComponent2";

const FleetContent: React.FC = () => {
  const [selected, setSelected] = useState("all aircraft");
  const headRef = useRef<HTMLDivElement>(null);
  const tabs = ["all aircraft", "turbo props", "light/midsize jets"];
  return (
    <section id="fleetdetails" className="min-h-screen relative inset-0 flex justify-center items-center py-[120px] max-md:py-[80px]">
      <div className="px-6 w-full flex flex-col justify-center items-center text-black gap-10 max-sm:gap-6 ">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          ref={headRef}
          className="text-center"
        >
          <h1 className="uppercase text-6xl max-sm:text-3xl max-md:text-6xl leading-[100%] font-bold text-[#00254a]">
            explore your options
          </h1>
        
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <JetInsightComponent/>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
          className="flex  justify-center items-center gap-6 max-sm:gap-2"
        >
          {tabs.map((tab) => (
            <motion.h1
              key={tab}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.1 }}
              onClick={() => setSelected(tab)}
              className={`max-md:text-[12px] text-[14px] py-4 px-6 max-sm:p-2 text-center uppercase w-fit cursor-pointer transition-all 
    rounded-[120px] max-sm:rounded-md border-4 ${
      selected === tab
        ? "border-none bg-white text-[#1d7eb3] font-bold"
        : "border-none hover:border-white hover:scale-105 shiny-button text-white"
    }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {tab}
            </motion.h1>
          ))}
        </motion.div>

        <div className="w-full">
          {selected === "all aircraft" && <AllAircrafts />}
          {selected === "turbo props" && <TurboProps />}
          {selected === "light/midsize jets" && <Light_Midsize />}
        </div>
      </div>
    </section>
  );
};

export default FleetContent;