import Image from "next/image";
import Link from "next/link";
import React from "react";

const Charter = () => {
  const charterServices = [
    {
      heading: "Our Fleet",
      name: "Fleet",
      link: "/charter/fleet",
      para: "Discover our extensive fleet of private jets designed to provide the highest level of comfort, safety, and performance. Choose the right aircraft tailored to your travel needs.",
      img: "/images/wheels_removed_fleet/30GT.png",
    },
    {
      heading: "Charter Destinations",
      name: "Destinations",
       link: "/destinations",
      para: "Explore our wide range of charter destinations across the country and around the world. Whether for business or leisure, we'll get you there in luxury and style.",
      img: "/images/goldengate.jpg",
    },
  ];

  return (
    <section className="w-full overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative w-full h-screen"
      >
        <Image
          src="/images/maintenance.png"
          alt="Charter Services"
          fill
          priority
          sizes="100vw"
          style={{ 
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="z-20 text-center text-white px-4">
            <h1 className="md:text-7xl text-3xl font-bold">Charter Services</h1>
            <p className="my-3 text-lg">
              Fly whenever you want on one of Americas largest and most diverse
              private jet charter fleets.
            </p>
          </div>
        </div>
      </div>

      {/* Charter Services Mapping */}
      <div className="py-16 px-4 md:px-20">
        {charterServices.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center my-12 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Block */}
            <div className="md:w-1/2 p-4">
              <h2 className="text-3xl text-black font-semibold mb-4">
                {service.heading}
              </h2>
              <p className="text-gray-700 mb-4">{service.para}</p>
              <Link href={service.link}>
                <span className="inline-block bg-transparent text-black border border-black px-6 py-2 rounded-lg hover:bg-[#002040] hover:text-white transition duration-300">
                  {service.name}
                </span>
              </Link>
            </div>

            {/* Image Block */}
            <div className="w-full md:w-1/2 p-4 ">
              <div className="w-full relative rounded-lg overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.name}
                  width={500}
                  height={500}  
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Charter;