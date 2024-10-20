import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHeartPulse, faCog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface ServiceCardProps {
    image: string;
    title: string;
    description: string;
    icon: IconDefinition;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description, icon }) => (
    <div className="relative bg-emerald-400 overflow-hidden group bg-white rounded-lg shadow-lg h-[400px]">
        <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="text-white text-center p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <FontAwesomeIcon icon={icon} className="text-5xl mb-4" />
                <h3 className="text-3xl font-semibold mb-3">{title}</h3>
                <p className="text-base leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);

const ServicesCards = () => {
    const services: ServiceCardProps[] = [
        {
            image: "/images/charter.png",
            title: "Direct Charter to Public",
            description: "Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations, including Las Vegas and Reno, Nevada. We offer the Luxury Travel Experience, with safety and overall trip experience as our primary focus.",
            icon: faPlane,
        },
        {
            image: "/images/medical.png",
            title: "Medical Charter",
            description: "We are proud to provide fixed-wing air charter service to the United Network for Organ Sharing community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.",
            icon: faHeartPulse,
        },
        {
            image: "/images/maintenance.png",
            title: "Wholesale - Jet Brokers",
            description: "24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.",
            icon: faCog,
        }
    ];

    return (
        <section className=" px-10 py-24 ">
            <div className="container mx-auto px-4 xl:px-0">
                <h2 className="text-4xl font-bold text-center mb-3 text-black">Our Services</h2>
                <h3 className="text-5xl font-bold text-center mb-16 text-black">Find The Best Service For You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesCards;