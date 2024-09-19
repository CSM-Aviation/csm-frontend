"use client"

import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { motion } from "framer-motion";

const ManagementPage: NextPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-screen">
        <Image
          src="/images/man1.png"
          fill
          style={{ objectFit: "fill" }}
          alt="Aircraft on runway"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl"
          >
            LEGENDARY AIRCRAFT MANAGEMENT SERVICES
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white max-w-2xl"
          >
            Creating and curating an unmatched aircraft ownership experience every day.
          </motion.p>
        </div>
      </div>

      {/* Alternating Two-Column Sections */}
      <div className="w-full py-16">
        <div className="container mx-auto px-4">
          {/* First Row: Left Text, Right Image */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl text-black font-bold mb-4">Charter Revenue Potential</h2>
              <p className="mb-6 text-gray-600">
                Every hour that your jet spends on the ground it could be generating revenue. If your aircraft is less than fully utilized, we may be able to offer you more charter opportunities, because our demand is greater!
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/revenue.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Private jet in hangar"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Second Row: Left Image, Right Text */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl text-black font-bold mb-4">Exclusive Cost Efficiencies</h2>
              <p className="mb-6 text-gray-600">
                Fuel discounts, alone, can save the owner of a midsize aircraft $20,000 to $25,000 per year. We also monitor the maintenance needs of your aircraft so maintenance and repairs are done on time and in the most cost effective manner.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/charter.png"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Private jet charter"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dark Background Section */}
      <div className="w-full bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          {/* Third Row: Left Text, Right Image */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Personal Approach</h2>
              <p className="mb-6 text-gray-300">
                Our clients work with a single point of contact, with a dedicated customer service specialist available 24/7. Our team also includes technical experts from fleet maintenance, operations and accounting -- all working in unison with your interests in mind.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/client.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Aircraft management"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Fourth Row: Left Image, Right Text */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Your Asset Maintained at Peak Level</h2>
              <p className="mb-6 text-gray-300">
                Under our management program, your aircraft will be maintained to its utmost, peak performance level. All aircraft must pass annual, safety audits by our professional and accredited mechanics so you will be confident that your aircraft is always flying at its peak performance level.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/img.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Aircraft maintenance"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;