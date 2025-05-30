"use client";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const MaintenanceMotion = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/company/contact');
    };
    const JetInsightComponent = dynamic(() => import('../components/JetInsight/JetInsightComponent2'), {
        ssr: false,
    });

    return (
        <div className="overflow-hidden w-full">
            <div className="relative h-screen w-full">
                {/* Responsive Image Handling */}
                <div className="absolute inset-0">
                    {/* Desktop Image */}
                    <div className="hidden md:block w-full h-full">
                        <Image
                            src="/images/maintenance_desktop.jpg"
                            layout="fill"
                            objectFit="cover"
                            alt="Aircraft maintenance facility"
                            priority
                            className="transition-opacity duration-300"
                        />
                    </div>

                    {/* Mobile Image */}
                    <div className="block md:hidden w-full h-full">
                        <Image
                            src="/images/maintenance_mobile.jpg"
                            layout="fill"
                            objectFit="cover"
                            alt="Aircraft maintenance facility"
                            priority
                            className="transition-opacity duration-300"
                        />
                    </div>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 md:px-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl text-white md:text-6xl font-bold text-white-700 mb-4 [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
                    >
                        AIRCRAFT MAINTENANCE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white mb-6 text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
                    >
                        Fresno - Madera - Visalia
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ translateY: -15 }}
                        transition={{ duration: 0.1, delay: 0.1 }}
                        onClick={handleClick}
                        className='bg-electric-blue flex items-center justify-center rounded-xl hover:duration-300 ease-in-out text-black px-1 py-2 md:px-6 md:py-3 text-lg font-semibold hover:bg-white transition'
                    >
                        MAINTENANCE INQUIRY
                    </motion.button>
                </div>
            </div>


            {/* Rest of the sections... */}
            {/* Make sure to remove any fixed heights or widths that might cause overflow */}

            {/* Example of adjusted section */}
            <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.8 }}
                className='w-full bg-gray-400 py-12'
            >
                <div className='container mx-auto px-4'>
                    <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>FAA Certified Part 145 Repair Station</h2>
                    <p className='text-white text-lg'>

                        CSM Aviation specializes in Aircraft Management and part 91/135 operations, our Maintenance operations are provided by our partner organization Madera Jet Center, which operates all Aircraft Maintenance and Aircraft Parts business operations. We offer a certified part 145 repair station to the Central Valley of California. We have experienced aircraft mechanics and a comprehensive aircraft mechanics training program that ensures your aircraft will be serviced to the highest industry standards. We have a zero-incident record with Safety and Client Satisfaction as our primary focus. We service single-engine, turbo-props, light to heavy jets, and provide Mobile AOG services as well as keeping one of the largest aircraft parts stock supporting the Central Valley. See below for more information and how to get in touch.

                    </p>
                </div>
            </motion.div>

            {/* Alternating Two-Column Sections */}
            <div className="w-full py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* MRO Service */}
                    <div className="flex flex-col md:flex-row gap-8 mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl text-black font-bold mb-4">MRO SERVICE</h2>
                            <p className="mb-6 text-gray-600">
                                Our highly experienced, factory-trained, airplane and maintenance teams offer both scheduled and unscheduled aircraft maintenance. Periodic servicing, annual inspections, airframe structural repairs, engine overhaul, engine replacements, electrical repairs, avionics installations, and repairs.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2"
                        >
                            <div className="relative w-full aspect-video">
                                <Image
                                    src="/images/maintenance_027.jpg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="MRO Service"
                                    className="rounded-3xl"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Aircraft & Engines */}
                    <div className="flex flex-col md:flex-row-reverse gap-8 mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl text-black font-bold mb-4">AIRCRAFT & ENGINES</h2>
                            <p className="mb-6 text-gray-600">
                                Specializing in maintenance, servicing, repairs, and overhaul of all models of Cessna aircraft, Piper aircraft, Beechcraft, Cirrus, Mooney, Aero Commander, Diamond, Learjet, Bombardier, Canadair, Cessna Citation, Falcon, Eclipse aircraft and many more.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2"
                        >
                            <div className="relative w-full aspect-video">
                                <Image
                                    src="/images/repair.png"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Aircraft & Engines"
                                    className="rounded-3xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Request a Quote Section */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='w-full py-16 bg-gray-100'
            >
                <div className='container mx-auto px-4 flex flex-col items-center justify-center text-center max-w-2xl'>
                    {/* <h2 className='text-3xl font-bold mb-4'>Request a Quote</h2> */}
                    <JetInsightComponent />
                    <p className='mb-6 mt-6 text-lg text-gray-600'>
                        Discover our exceptional approach to aircraft management, where we provide superior safety standards, outstanding service, and maximized value for your aviation asset.
                    </p>

                </div>
            </motion.div>
        </div>
    );
};

export default MaintenanceMotion;



