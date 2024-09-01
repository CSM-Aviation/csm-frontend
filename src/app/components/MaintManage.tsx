"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    image: string;
    content: string[];
    link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, content, link }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={link} className={`block transition-all duration-500 ease-in-out ${isHovered ? 'w-[70%]' : 'w-1/2'} h-[70vh] relative group overflow-hidden`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white z-10">
                    <h2 className="text-4xl font-bold mb-4 text-center transition-all duration-300 group-hover:scale-105">{title}</h2>
                    <ul className={`flex-grow flex flex-col justify-center items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        {content.map((item, index) => (
                            <li key={index} className="text-lg mb-2 text-center">{item}</li>
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
            image: "/images/aircraft_maintenance.png",
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
        <div className="flex flex-row w-full h-[70vh]">
            {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
            ))}
        </div>
    );
};

export default MaintManage;