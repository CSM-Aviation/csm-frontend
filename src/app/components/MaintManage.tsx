"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    image: string;
    content: string[];
    link: string;
    index: number;
}

// Desktop/Laptop ServiceCard (Enhanced Version)
const DesktopServiceCard: React.FC<ServiceCardProps> = ({ title, image, content, link, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`transition-all duration-700 ease-in-out ${
                isHovered ? 'md:w-[70%]' : 'md:w-1/2'
            } w-full h-[70vh] relative group overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={link} className="block w-full h-full">
                <div className="relative w-full h-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90 transition-all duration-500"></div>
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-500"></div>
                    
                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-white z-10">
                        {/* Title with Enhanced Styling */}
                        <motion.h2 
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-center transition-all duration-500 group-hover:scale-105 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                        >
                            {title}
                        </motion.h2>
                        
                        {/* Content List with Smooth Animation */}
                        <motion.div
                            className={`flex-grow flex flex-col justify-center items-center transition-all duration-500 ${
                                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            } max-w-md`}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                y: isHovered ? 0 : 16
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul className="space-y-2 sm:space-y-3 w-full">
                                {content.map((item, itemIndex) => (
                                    <motion.li 
                                        key={itemIndex} 
                                        className="flex items-start text-sm sm:text-base lg:text-lg xl:text-xl text-center justify-center"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ 
                                            opacity: isHovered ? 1 : 0,
                                            x: isHovered ? 0 : -20
                                        }}
                                        transition={{ 
                                            duration: 0.3,
                                            delay: itemIndex * 0.1
                                        }}
                                    >
                                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-left leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                            
                            {/* Call to Action Button */}
                            <motion.div
                                className="mt-6 sm:mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ 
                                    opacity: isHovered ? 1 : 0,
                                    y: isHovered ? 0 : 20
                                }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <div className="group/btn inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
                                    Learn More
                                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    
                    {/* Subtle Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>
            </Link>
        </motion.div>
    );
};

// Mobile ServiceCard (Simple Version)
const MobileServiceCard: React.FC<ServiceCardProps> = ({ title, image, content, link }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            href={link} 
            className="block w-full h-[70vh] relative group overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white z-10">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center transition-all duration-300 group-hover:scale-105">
                        {title}
                    </h2>
                    <ul className={`flex-grow flex flex-col justify-center items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        {content.map((item, index) => (
                            <li key={index} className="text-base sm:text-xl mb-2 text-center">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Link>
    );
};

const MaintManage: React.FC = () => {
    const services = [
        {
            title: "MANAGEMENT",
            image: "/images/aircraft_managment.png",
            content: [
                "On-Demand Flight Department",
                "Lower Cost of Ownership",
                "Transparent Monthly Reporting",
                "Maintenance Program"
            ],
            link: "/management"
        },
        {
            title: "MAINTENANCE",
            image: "/images/image_jetcenter_maintenance_014.jpeg",
            content: [
                "FAA Certified Part 145 Repair Station",
                "MRO Services",
                "Aircraft Engine Repair",
                "AOG Services",
                "Aircraft Parts"
            ],
            link: "/maintenance"
        }
    ];

    return (
        <div className="w-full bg-gradient-to-b from-slate-50 to-white">
            {/* Desktop/Laptop Version (md and above) */}
            <div className="hidden md:block">
              
                
                {/* Service Cards Container */}
                <div className="flex flex-row w-full min-h-[65vh] lg:h-[70vh] shadow-2xl rounded-t-lg overflow-hidden">
                    {services.map((service, index) => (
                        <DesktopServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
                
                {/* Bottom Spacing */}
                <div className="h-8 sm:h-12 lg:h-16"></div>
            </div>

            {/* Mobile Version (below md) */}
            <div className="block md:hidden">
                <div className="flex flex-col w-full h-[65vh]">
                    {services.map((service, index) => (
                        <MobileServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MaintManage;