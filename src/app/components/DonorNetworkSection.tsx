"use client";
import Image from 'next/image';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dnw from '../../../public/images/dnw/dnw.svg'

const DonorNetworkSection = () => {
  const router = useRouter();

  return (
    <div className="w-full py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[#004080]"/>
      
      {/* Content Container */}
      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Logo and Title Section */}
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.8, once: true }}
            transition={{ duration: 0.8 }}
            className="w-48 h-24 relative mb-6 bg-white rounded-lg p-10"
          >
            <Image
              src="/images/dnw/dnw.svg"
              alt="Donor Network West Logo"
              fill
              style={{ objectFit: "contain" }}
              className="object-contain p-2"
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.8, once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          >
            Partners in Saving Lives
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.8, once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-blue-100 text-center max-w-2xl mb-8"
          >
            CSM Aviation proudly supports Donor Network West in their mission to save and heal lives through organ and tissue donation
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.8, once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
            <h3 className="text-3xl font-bold text-white mb-2">8876</h3>
            <p className="text-blue-100">Life-Saving Flights in history of CSM</p>
          </div>
          <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
            <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
            <p className="text-blue-100">Emergency Response</p>
          </div>
          <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
            <h3 className="text-3xl font-bold text-white mb-2">13M+</h3>
            <p className="text-blue-100">Lives Impacted</p>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.8, once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[
            'JHM00019.jpg',
            'JHM00090.jpg',
            'JHM00473.jpg',
          ].map((img, index) => (
            <div key={index} className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src={`/images/dnw/${img}`}
                alt={`Donor Network West Partnership ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.8, once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={() => router.push('/donornetworkwest')}
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold 
                     hover:bg-blue-100 transition-colors duration-300 
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Learn More About Our Partnership
          </button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700 rounded-full filter blur-3xl opacity-20 -z-10"/>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 rounded-full filter blur-3xl opacity-20 -z-10"/>
    </div>
  );
};

export default DonorNetworkSection;