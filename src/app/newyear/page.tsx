"use client";

import { motion } from "framer-motion";
import { Plane, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import JetInsightComponent from '../components/JetInsight/JetInsightComponent3';
import PopularDestinations from "../components/PopularDestinations";


export default function NewYearsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    { icon: <Clock className="w-6 h-6" />, text: "24/7 On-Demand Service" },
    { icon: <MapPin className="w-6 h-6" />, text: "Worldwide Destinations" },
    { icon: <Star className="w-6 h-6" />, text: "Luxury Experience" },
    { icon: <Plane className="w-6 h-6" />, text: "Private Terminal Access" }
  ];

  const galleryImages = [
    "/images/newyear/ny3.jpeg",
    "/images/newyear/ny4.jpeg",
    "/images/newyear/ny5.jpeg"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen"
      >
        <div className="absolute inset-0  z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/newyear/ny8.jpeg"
            alt="Private Jet New Year's Eve"
            fill
            priority
            className="object-fill"
            quality={100}
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.h1 
            {...fadeIn}
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-200"
          >
            New Years Eve
            <br />
            <span className="text-4xl md:text-6xl">Private Jet Charter</span>
          </motion.h1>
          
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl mx-auto md:text-2xl mt-32 mb-8 max-w-7xl"
          >
            Celebrate the arrival of the new year at your dream destination with CSM Aviation luxury private jet service.
          </motion.p>
          <div className="flex justify-center items-center w-full">
                <JetInsightComponent />
              </div>
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
           
          </motion.div>
        </div>
      </motion.div>

    
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors"
              >
                <div className="mb-4 inline-block p-3 bg-gold-500 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.text}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl text-[#004080] font-bold text-center mb-12"
          >
            Luxury at Every Destination
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative h-80 overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt={`Luxury Private Jet ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<div className="bg-white">
      <PopularDestinations />
      </div>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your New Years Eve?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us now to secure your private jet charter and make this New Years Eve truly unforgettable.
            </p>
            <Link href="/company/contact">
              <button className='bg-electric-blue  hover:translate-y-[-5px]  hover:duration-300 ease-in-out text-black rounded-lg px-1 py-1 md:px-6 md:py-3 text-lg font-semibold hover:bg-white transition'>
                CONTACT US
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}