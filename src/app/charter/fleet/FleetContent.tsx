"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TurboProps from "./TurboProps";
import Light_Midsize from "./Light_Midsize";
import AllAircrafts from "./All_Aircrafts";
import { motion } from "motion/react";
import JetInsightComponent from "@/app/components/JetInsight/JetInsightComponent2";
import Light from "./Light";

const FleetContent: React.FC = () => {
  const [selected, setSelected] = useState("turbo props");
  const headRef = useRef<HTMLDivElement>(null);
  const tabs = ["turbo props", "light jets", "midsize jets"];
  return (
    <section
      id="fleetdetails"
      className="min-h-screen relative inset-0 flex justify-center items-center py-[120px] max-md:py-[80px]"
    >
      <div className="px-6 w-full flex flex-col justify-center items-center text-black gap-10 max-sm:gap-6 ">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          ref={headRef}
          className="text-center"
        >
          <h1 className="uppercase text-6xl max-sm:text-3xl max-md:text-6xl leading-[100%] font-bold text-[#00254a]">
            Our Fleet
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <JetInsightComponent />
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
          className="flex justify-center items-center gap-6 max-sm:gap-2"
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
              className={`max-md:text-[12px] text-[14px] py-4 px-6 max-sm:p-2 text-center uppercase w-fit cursor-pointer transition-all duration-300 ease-in-out
    rounded-[120px] max-sm:rounded-md font-semibold ${
      selected === tab
        ? "bg-[#00254a] text-white shadow-lg shadow-[#00254a]/30 border-2 border-[#00254a]"
        : "bg-white/80 backdrop-blur-sm text-[#00254a] border-2 border-[#00254a]/20 hover:border-[#00254a] hover:bg-white hover:shadow-md"
    }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.h1>
          ))}
        </motion.div>

        <div className="w-full">
          {/* {selected === "all aircraft" && <AllAircrafts />} */}
          {selected === "turbo props" && <TurboProps />}
          {selected === "light jets" && <Light />}
          {selected === "midsize jets" && <Light_Midsize />}
        </div>
      </div>
    </section>
  );
};

export default FleetContent;
