"use client";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const ThanksgivingCharter = () => {
  return (
    <div className="overflow-x-hidden w-full">
      <div className="relative h-screen w-full">
        {/* Existing Image Handling Code Remains the Same */}
        <div className="absolute inset-0">
          <div className="hidden md:block w-full h-full">
            <Image
              src="/images/thanksgiving/b1.png"
              layout="fill"
              objectFit=""
              alt="CSM Aviation charter services"
              priority
              className="transition-opacity duration-300"
            />
          </div>
          <div className="block md:hidden w-full h-full">
            <Image
              src="/images/thanksgiving/a1.png"
              layout="fill"
              objectFit=""
              alt="CSM Aviation charter services"
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
            Home for the Holidays
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white max-w-2xl text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
          >
            Let us fly you home this Thanksgiving for cherished moments with family
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
              <h2 className="text-3xl text-black font-bold mb-4">Skip the Holiday Rush</h2>
              <p className="mb-6 text-gray-600">
                Avoid crowded airports and delayed flights this Thanksgiving season. Our private charter services ensure you arrive at your family gathering relaxed and on time. With flexible scheduling and direct flights to your destination, you'll have more time to spend with loved ones.
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
                  src="/images/thanksgiving/d1.png"
                  fill
                
                  alt="Luxury charter aircraft"
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
              <h2 className="text-3xl text-black font-bold mb-4">Comfort & Convenience</h2>
              <p className="mb-6 text-gray-600">
                Travel in style with our luxurious aircraft fleet. From spacious cabins to personalized service, we ensure your holiday journey is as comfortable as being home. Perfect for families or groups, our charter services accommodate your entire party with ease.
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
                  src="/images/thanksgiving/c1.png"
                  fill
               
                  alt="Comfortable charter interior"
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
              <h2 className="text-3xl font-bold mb-4 text-white">Flexible Holiday Schedule</h2>
              <p className="mb-6 text-gray-300">
                Whether you're planning an extended Thanksgiving weekend or a quick visit home, our flexible scheduling adapts to your needs. We operate around your timeline, ensuring you never miss a moment of family celebration. Book now to secure your preferred travel dates.
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
                  src="/images/aboutlatest.png"
                  fill
               
                  alt="Charter flight experience"
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
              <h2 className="text-3xl font-bold mb-4 text-white">Creating Family Memories</h2>
              <p className="mb-6 text-gray-300">
                Make this Thanksgiving unforgettable with a seamless travel experience. Our charter services have helped countless families reunite for the holidays, creating precious memories that last a lifetime. Let us be part of your family tradition this year.
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
                  src="/images/thanksgiving/tg1.png"
                  fill
            
                  alt="Family holiday travel"
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

export default ThanksgivingCharter;