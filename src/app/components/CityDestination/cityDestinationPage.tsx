'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { cityData } from './cityData';
import { CitiesData } from './types';

interface CityDestinationPageProps {
  cityId: keyof CitiesData;
}

const CityDestinationPage: React.FC<CityDestinationPageProps> = ({ cityId }) => {
  const city = cityData[cityId];

  if (!city) {
    return null;
  }

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-neutral-700 mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="w-full">
      {/* Hero Image Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={city.images.hero.desktop}
          alt={`${cityId} Aerial View`}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side (2 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Title and Intro Section */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-[#004080] mb-4"
              >
                {city.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-neutral-700"
              >
                {city.introText}
              </motion.p>
              <p className="text-neutral-700">{city.contactInfo.text}</p>
            </div>

            {/* Sections Content */}
            {city.sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-2xl text-[#004080] font-bold">{section.title}</h2>
                <div className="space-y-4">
                  {formatContent(section.content)}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Sidebar - Right Side (1 column) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Sidebar Image */}
            <div className="relative w-full  h-64 rounded-lg overflow-hidden">
              <Image
                src={city.images.thumbnail}
                alt={`${cityId} Thumbnail`}
                fill
                className="object-contain"
              />
            </div>

            {/* Sidebar Content */}
            <div className="bg-[#004080] p-6 rounded-lg shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {city.popularRoutes.title}
                </h3>
                <ul className="space-y-3">
                  {city.popularRoutes.routes.map((route, index) => (
                    <li key={index} className="flex items-center text-white">
                      <span className="mr-2 font-semibold">{index + 1}.</span>
                      {route}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {city.bestJets.title}
                </h3>
                <ul className="space-y-3">
                  {city.bestJets.jets.map((jet, index) => (
                    <li key={index} className="flex items-center text-white">
                      <span className="mr-2 font-semibold">{index + 1}.</span>
                      {jet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CityDestinationPage;