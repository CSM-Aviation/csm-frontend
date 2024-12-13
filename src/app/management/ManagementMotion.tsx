// src/components/ManagementMotion.tsx
"use client";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const ManagementMotion = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/company/contact');
  };
  const JetInsightComponent = dynamic(() => import('../components/JetInsight/JetInsightComponent2'), {
    ssr: false,
  });

  return (
    <div className="overflow-x-hidden w-full">
      <div className="relative h-screen w-full">
        {/* Responsive Image Handling */}
        <div className="absolute inset-0">
          {/* Desktop Image */}
          <div className="hidden md:block w-full h-full">
            <Image
              src="/images/private_desktop.jpg"
              layout="fill"
              objectFit="cover"
              alt="Aircraft management services"
              priority
              className="transition-opacity duration-300"
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden w-full h-full">
            <Image
              src="/images/private_mobile.jpg"
              layout="fill"
              objectFit="cover"
              alt="Aircraft management services"
              priority
              className="transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
          >
            AIRCRAFT MANAGEMENT SERVICES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white max-w-2xl text-center [text-shadow:5px_5px_8px_rgba(0,0,0,0.5)]"
          >
            Creating and curating an unmatched aircraft ownership experience every day.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ translateY: -15 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            onClick={handleClick}
            className='bg-electric-blue mt-6 flex items-center justify-center rounded-xl hover:duration-300 ease-in-out text-black px-5 py-2 md:px-6 md:py-3 text-lg font-semibold hover:bg-white transition'
          >
            MANAGEMENT INQUIRY
          </motion.button>
        </div>
      </div>

      {/* Alternating Two-Column Sections */}
      <div className="w-full py-16">
        <div className="container mx-auto px-4 max-w-7xl"> {/* Added max-w-7xl */}
          {/* First Row: Left Text, Right Image */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl text-black font-bold mb-4">Charter Revenue Potential</h2>
              <p className="mb-6 text-gray-600">
                Every hour that your jet spends on the ground it could be generating revenue. If your aircraft is less than fully utilized, we may be able to offer you more charter opportunities, because our demand is greater!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/revenue.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Private jet in hangar"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Second Row: Left Image, Right Text */}
          <div className="flex flex-col md:flex-row-reverse gap-8 mb-16"> {/* Removed extra space */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl text-black font-bold mb-4">Exclusive Cost Efficiencies</h2>
              <p className="mb-6 text-gray-600">
                Fuel discounts, alone, can save the owner of a midsize aircraft $20,000 to $25,000 per year. We also monitor the maintenance needs of your aircraft so maintenance and repairs are done on time and in the most cost effective manner.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/cost.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Private jet charter"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dark Background Section */}
      <div className="w-full bg-slate-900 py-16">
        <div className="container mx-auto px-4 max-w-7xl"> {/* Added max-w-7xl */}
          {/* Third Row: Left Text, Right Image */}
          <div className="flex flex-col md:flex-row gap-8 mb-16"> {/* Removed extra space */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Personal Approach</h2>
              <p className="mb-6 text-gray-300">
                Our clients work with a single point of contact, with a dedicated customer service specialist available 24/7. Our team also includes technical experts from fleet maintenance, operations and accounting -- all working in unison with your interests in mind.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/client.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Aircraft management"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Fourth Row: Left Image, Right Text */}
          <div className="flex flex-col md:flex-row-reverse gap-8"> {/* Removed extra space */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Your Asset Maintained at Peak Level</h2>
              <p className="mb-6 text-gray-300">
                Under our management program, your aircraft will be maintained to its utmost, peak performance level. All aircraft must pass annual, safety audits by our professional and accredited mechanics so you will be confident that your aircraft is always flying at its peak performance level.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/images/img.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Aircraft maintenance"
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

export default ManagementMotion;