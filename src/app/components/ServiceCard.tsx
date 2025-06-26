'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { motion } from "motion/react"
interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string | null;
  id: number;  // Changed from 'key' to 'id' to avoid conflicts
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description, link }) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <motion.div initial={{scale: 0.2}} whileInView={{scale:1}} transition={{duration: 0.5}} viewport={{once: true}}
      className="relative bg-emerald-400 overflow-hidden group rounded-lg shadow-lg h-[400px] cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="text-white text-center p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-3xl font-semibold mb-3">{title}</h3>
          <p className="text-base leading-relaxed">{description}</p>
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
      description: "Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations, including Las Vegas and Reno, Nevada. We offer the Luxury Travel Experience, with safety and overall trip experience as our primary focus.",
      link: null
    },
    {
      id: 2,
      image: "/images/medical.png",
      title: "Medical Charter",
      description: "We are proud to provide medavac air charter service to the Organ Donor community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.",
      link: "/donornetworkwest"
    },
    {
      id: 3,
      image: "/images/pilot.jpg",
      title: "Wholesale - Jet Brokers",
      description: "24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.",
      link: null
    }
  ];

  return (
    <section className="px-10 py-24">
      <div className="container mx-auto px-4 xl:px-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 text-[#004080]">
          Charter Services
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-400">
          24/7 On Demand Charter
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-14">
          {services.map(service => (
            <ServiceCard 
              key={service.id}  // Using id as key for React's mapping
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;