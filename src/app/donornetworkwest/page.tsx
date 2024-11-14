"use client";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const DonorNetworkWest = () => {
  return (
    <div className="overflow-x-hidden w-full">
      <div className="relative h-screen w-full">
        {/* Existing Image Handling Code Remains the Same */}
        <div className="absolute inset-0">
          <div className="hidden md:block w-full h-full">
            <Image
              src="/images/dnw/JHM00063.jpg"
              layout="fill"
              objectFit="cover"
              alt="CSM Aviation supporting organ donation"
              priority
              className="transition-opacity duration-300"
            />
          </div>
          <div className="block md:hidden w-full h-full">
            <Image
              src="/images/dnw/JHM00063.jpg"
              layout="fill"
              objectFit="cover"
              alt="CSM Aviation supporting organ donation"
              priority
              className="transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
          >
            Flying to Save Lives
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white max-w-2xl text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
          >
            Partnering with Donor Network West to deliver hope across the skies
          </motion.p>
        </div>
      </div>

      <div className="w-full py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl text-black font-bold mb-4">Time-Critical Transportation</h2>
              <p className="mb-6 text-gray-600">
                In partnership with Donor Network West, our fleet stands ready 24/7 to transport life-saving organs across Northern California and Nevada. Every minute counts in organ donation, and our dedicated aircraft and crews ensure precious cargo reaches its destination swiftly and safely.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/dnw/JHM00281.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Medical transport aircraft"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl text-black font-bold mb-4">Specialized Medical Transport</h2>
              <p className="mb-6 text-gray-600">
                Our aircraft are specially equipped to maintain the integrity of medical cargo. Working with Donor Network West, we have implemented precise protocols to ensure organ transportation meets the highest standards of safety and efficiency, serving over 13 million people in our coverage area.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/dnw/JHM00268.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Medical transport capabilities"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-900 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">24/7 Emergency Response</h2>
              <p className="mb-6 text-gray-300">
                Our dedicated team works around the clock to support Donor Network West mission. With just minutes to respond, our crews are always prepared to launch, connecting life-saving organs with those who need them most across our extensive network of 175 hospitals and 5 transplant centers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/dnw/JHM00507.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Emergency medical response"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-8">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Community Impact</h2>
              <p className="mb-6 text-gray-300">
                Every flight we conduct with Donor Network West represents hope for families across our region. In 2022, we helped facilitate the transportation of organs from 416 donors, contributing to the network mission of saving and healing lives through organ and tissue donation.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/dnw/JHM00858.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Community impact"
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

export default DonorNetworkWest;