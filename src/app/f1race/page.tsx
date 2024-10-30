'use client'
import React, { useRef } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import Hero1 from '../components/Hero1';
import Image from 'next/image';
import img1 from "../../../public/images/F1/f1img1.jpeg";
import img2 from "../../../public/images/F1/f1img2.jpeg";
import { useRouter } from "next/navigation";
import Countdown from '../components/Countdown';
import starsBg from '../../../public/images/stars.png'
import VideoPlayer from '../components/VideoPlayer';
import dynamic from 'next/dynamic';
const TuvoliWidget = dynamic(() => import('../components/TuvoliWidget'), {
    ssr: false,
});

export default function F1Race() {
    const tuvoliWidgetRef = useRef<HTMLDivElement>(null);

    const scrollToTuvoliWidget = () => {
        tuvoliWidgetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const { config, error } = useConfig();
    const router = useRouter();
    const handleClick = () => {
        router.push('/company/contact');
    };

    if (error) {
        return <div className="text-red-600 text-center p-4">Error: {error}</div>;
    }

    if (!config) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="bg-white">
            <div className="relative w-full">
                <VideoPlayer videoUrl={config.f1_video1} />
            </div>

            <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl  font-bold text-center mb-8 text-gray-800">
                    Indulge in the Thrill: F1 Vegas Grand Prix with Our Luxury Charter
                </h1>
                <p className="text-xl text-center mb-12 text-gray-600">
                    Experience the pinnacle of luxury travel as you embark on a journey to the Las Vegas F1 Grand Prix.
                </p>
                <div className="flex flex-col max-lg:p-2 items-center justify-center min-h-screen bg-black">
                    <Countdown />
                    <p className="text-xl w-3/4 mt-10 text-center mb-12 text-gray-400">
                        F1® RETURNS TO LAS VEGAS
                        NOVEMBER 21-23, 2024
                        Formula 1® makes its return to the Sports and Entertainment Capital of the World on November 21-23, 2024 for the can’t-miss race of the year.



                        The Las Vegas Grand Prix’s 3.8-mile track weaves past world-famous landmarks, casinos and hotels, cutting right through the neon heart of The Strip as drivers hit top speeds of up to 217 mph.
                    </p>
                </div>
                {/* <section className='h-[492px]  mt-10 relative bg-black/80 flex items-center'
                 style={{
                    backgroundImage: `url(${starsBg.src})`,
                }}
                >
<div className="absolute top-1/2 left-1/2 h-96 w-96 bg-purple-500 rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"></div>
<div className='container relative' >
                        <h1 className="text-8xl text-white  font-semibold tracking-tighter text-center mt-10 bg-[radial-gradient(120%_120%,white,rgba(255,255,255,0.5))] text-transparent bg-clip-text">
                            24/7 JET CHARTER SERVICE
                        </h1>
                        <div className='flex justify-center mt-5 '> </div>
                        <p className='  text-lg  text-white/70 mt-5 text-center '>With CSM we can help you book your charter anywhere in the world and help you fly with safety and luxury</p>
                    </div>
                </section> */}
                <div className="grid mt-10  md:grid-cols-2 gap-8 items-center mb-12">
                    <Image src={img2} alt="Luxurious private jet" className="rounded-lg shadow-lg" />
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Exclusive Charter Service</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Enjoy the comfort and privacy of a private jet, tailored to your specific needs.</li>
                            <li>• Indulge in gourmet cuisine, premium beverages, and personalized in-flight entertainment.</li>
                            <li>• Travel in style and arrive refreshed, ready to immerse yourself in the excitement of the Grand Prix.</li>
                            <li>• Our 24/7 availability ensures seamless booking and travel arrangements.</li>
                            <li>• Customize your itinerary to include pre- or post-event activities, such as exploring the vibrant city of Las Vegas.</li>
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                    <div className="order-2 md:order-1">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Luxurious Cabin Interiors</h2>
                        <p className="mb-4 text-gray-600">Step into a world of opulence with our luxurious cabin interiors.</p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Relax in spacious seating, enjoy the latest in-flight technology, and experience the epitome of comfort.</li>
                        </ul>
                    </div>
                    <Image src={img1} alt="Luxurious private jet interior" className="rounded-lg shadow-lg order-1 md:order-2" />
                </div>
            </div>
{/* 
            <div ref={tuvoliWidgetRef} className='py-20 bg-white'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-center text-4xl mb-4'>JET CHARTER QUOTE</h2>
                    <p className='text-center text-xl mb-10'>
                        Explore our Dynamic map for immediate private aircraft rental pricing.
                    </p>
                    <TuvoliWidget />
                </div>
            </div> */}
            {/* <div className=" bg-gray-200 p-6 text-center ">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Book your luxury charter today and secure your spot at the Las Vegas F1 Grand Prix.
                </h3>
                <p className="mb-8 text-gray-600">Contact our dedicated team for personalized assistance and a tailored quote.</p>
                <button onClick={handleClick} className='bg-electric-blue  hover:translate-y-[-5px]  hover:duration-300 ease-in-out text-black rounded-lg px-1 py-1 md:px-6 md:py-3 text-lg font-semibold hover:bg-white transition'>
                    CONTACT US
                </button>
            </div> */}


        </div>
    );
}