"use client";

import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const MaintenanceMotion = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/company/contact');
    };

    return (
        <div className=" overflow-hidden  w-full"> {/* Removed overflow-x-hidden */}
            {/* Hero Section */}
            <div className="relative h-screen w-full">
                <Image
                    src="/images/maintenance.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Aircraft on runway"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-4 md:px-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-bold text-red-700 mb-4"
                    >
                        AIRCRAFT MAINTENANCE
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white"
                    >
                        Fresno - Madera - Visalia
                    </motion.p>
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
                    <h2 className='text-3xl font-bold mb-4'>Request a Quote</h2>
                    <p className='mb-6 text-gray-600'>
                        Discover our exceptional approach to aircraft management, where we provide superior safety standards, outstanding service, and maximized value for your aviation asset.
                    </p>
                    <button 
                        onClick={handleClick} 
                        className='bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg'
                    >
                        MAINTENANCE INQUIRY
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default MaintenanceMotion;



// src/components/MaintenanceMotion.tsx
// "use client";

// import { motion } from "framer-motion";
// import Image from 'next/image';
// import { useRouter } from "next/navigation";

// const MaintenanceMotion = () => {
//     const router = useRouter();
//     const handleClick = () => {
//         router.push('/company/contact');
//     };

//     return (
//         <div className="w-full">
//             {/* Hero Section */}
//             <div className="relative h-screen w-full">
//                 <Image
//                     src="/images/maintenance.jpg"
//                     layout="fill"
//                     objectFit="cover"
//                     alt="Aircraft on runway"
//                     priority
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-4 md:px-16">
//                     <motion.h1 
//                         initial={{ opacity: 0, y: -50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="text-5xl md:text-6xl font-bold text-red-700 mb-4"
//                     >
//                         AIRCRAFT MAINTENANCE
//                     </motion.h1>
//                     <motion.p 
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                         className="text-xl md:text-2xl text-white"
//                     >
//                         Fresno - Madera - Visalia
//                     </motion.p>
//                 </div>
//             </div>

//             {/* FAA Certified Section */}
//             <motion.div 
//                 whileInView={{ opacity: 1, y: 0 }}
//                 initial={{ opacity: 0, y: -100 }}
//                 transition={{ duration: 0.8 }} 
//                 className='w-full bg-gray-400 py-12'
//             >
//                 <div className='container mx-auto px-4'>
//                     <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>FAA Certified Part 145 Repair Station</h2>
//                     <p className='text-white text-lg'>
//                         CSM Aviation specializes in Aircraft Management and part 91/135 operations, our Maintenance operations are provided by our partner organization Madera Jet Center, which operates all Aircraft Maintenance and Aircraft Parts business operations. We offer a certified part 145 repair station to the Central Valley of California. We have experienced aircraft mechanics and a comprehensive aircraft mechanics training program that ensures your aircraft will be serviced to the highest industry standards. We have a zero-incident record with Safety and Client Satisfaction as our primary focus. We service single-engine, turbo-props, light to heavy jets, and provide Mobile AOG services as well as keeping one of the largest aircraft parts stock supporting the Central Valley. See below for more information and how to get in touch.
//                     </p>
//                 </div>
//             </motion.div>

//             {/* Alternating Two-Column Sections */}
//             <div className="w-full py-16">
//                 <div className="container mx-auto px-4 max-w-7xl">
//                     {/* MRO Service */}
//                     <div className="flex flex-col md:flex-row gap-8 mb-16">
//                         <motion.div 
//                             initial={{ opacity: 0, x: -100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <h2 className="text-3xl text-black font-bold mb-4">MRO SERVICE</h2>
//                             <p className="mb-6 text-gray-600">
//                                 Our highly experienced, factory-trained, airplane and maintenance teams offer both scheduled and unscheduled aircraft maintenance. Periodic servicing, annual inspections, airframe structural repairs, engine overhaul, engine replacements, electrical repairs, avionics installations, and repairs.
//                             </p>
//                         </motion.div>
//                         <motion.div 
//                             initial={{ opacity: 0, x: 100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <div className="relative w-full aspect-video">
//                                 <Image
//                                     src="/images/maintenance_027.jpg"
//                                     layout="fill"
//                                     objectFit="cover"
//                                     alt="MRO Service"
//                                     className="rounded-3xl"
//                                 />
//                             </div>
//                         </motion.div>
//                     </div>

//                     {/* Aircraft & Engines */}
//                     <div className="flex flex-col md:flex-row-reverse gap-8 mb-16">
//                         <motion.div 
//                             initial={{ opacity: 0, x: 100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <h2 className="text-3xl text-black font-bold mb-4">AIRCRAFT & ENGINES</h2>
//                             <p className="mb-6 text-gray-600">
//                                 Specializing in maintenance, servicing, repairs, and overhaul of all models of Cessna aircraft, Piper aircraft, Beechcraft, Cirrus, Mooney, Aero Commander, Diamond, Learjet, Bombardier, Canadair, Cessna Citation, Falcon, Eclipse aircraft and many more.
//                             </p>
//                         </motion.div>
//                         <motion.div 
//                             initial={{ opacity: 0, x: -100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <div className="relative w-full aspect-video">
//                                 <Image
//                                     src="/images/repair.png"
//                                     layout="fill"
//                                     objectFit="cover"
//                                     alt="Aircraft & Engines"
//                                     className="rounded-3xl"
//                                 />
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>

//             {/* Dark Background Section */}
//             <div className='w-full bg-slate-900 py-16'>
//                 <div className="container mx-auto px-4 max-w-7xl">
//                     {/* AOG Services */}
//                     <div className="flex flex-col md:flex-row gap-8 mb-16">
//                         <motion.div 
//                             initial={{ opacity: 0, x: -100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <h2 className="text-3xl font-bold mb-4 text-white">AOG SERVICES</h2>
//                             <p className="mb-6 text-gray-300">
//                                 We offer quick-response mobile AOG services. We have a well-equipped and stocked mobile aircraft recovery vehicle, to provide you services at any airport in the Central California region. Our AOG team is trained to conduct quick and efficient offsite assistance and repairs.
//                             </p>
//                         </motion.div>
//                         <motion.div 
//                             initial={{ opacity: 0, x: 100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <div className="relative w-full aspect-video">
//                                 <Image
//                                     src="/images/maintenance_043.jpg"
//                                     layout="fill"
//                                     objectFit="cover"
//                                     alt="AOG Services"
//                                     className="rounded-3xl"
//                                 />
//                             </div>
//                         </motion.div>
//                     </div>

//                     {/* Aircraft Parts */}
//                     <div className="flex flex-col md:flex-row-reverse gap-8">
//                         <motion.div 
//                             initial={{ opacity: 0, x: 100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <h2 className="text-3xl font-bold mb-4 text-white">AIRCRAFT PARTS</h2>
//                             <p className="mb-6 text-gray-300">
//                                 We stock only high-quality, genuine aircraft parts, and an extensive inventory of tires, tubes, batteries, gaskets, filters, oils, lubes, and more. 24/7 call center to support your emergency needs.
//                             </p>
//                         </motion.div>
//                         <motion.div 
//                             initial={{ opacity: 0, x: -100 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="md:w-1/2"
//                         >
//                             <div className="relative w-full aspect-video">
//                                 <Image
//                                     src="/images/aircraftparts.jpg"
//                                     layout="fill"
//                                     objectFit="cover"
//                                     alt="Aircraft Parts"
//                                     className="rounded-3xl"
//                                 />
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>

//             {/* Request a Quote Section */}
//             <motion.div
//                 initial={{ opacity: 0, y: 100 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className='w-full py-16 bg-gray-100'
//             >
//                 <div className='container mx-auto px-4 flex flex-col items-center justify-center text-center max-w-2xl'>
//                     <h2 className='text-3xl font-bold mb-4'>Request a Quote</h2>
//                     <p className='mb-6 text-gray-600'>
//                         Discover our exceptional approach to aircraft management, where we provide superior safety standards, outstanding service, and maximized value for your aviation asset.
//                     </p>
//                     <button 
//                         onClick={handleClick} 
//                         className='bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg'
//                     >
//                         MAINTENANCE INQUIRY
//                     </button>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default MaintenanceMotion;