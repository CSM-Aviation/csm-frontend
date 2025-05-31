import Image from "next/image";
import Link from "next/link";
import React from "react";

const Company = () => {
  const companyServices = [
    {
      heading: "About Us",
      name: "Learn More",
      link: "/company/about",
      para: "Learn more about our company, our mission, values, and the passionate team behind our success. We are dedicated to delivering exceptional services tailored to your needs.",
      img: "/images/contactus/csm-team.jpg", // Placeholder image for About Us
    },
    {
      heading: "Contact",
      name: "Get in Touch",
      link: "/company/contact",
      para: "Have questions or ready to connect? Reach out to us through our contact page. We're here to assist you with prompt and professional support.",
      img: "/images/contactus/contactus.png", // Placeholder image for Contact
    },
  ];

  return (
    <section>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: "url(/images/contactus/contactusdesktop.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        
        }}
        className="w-screen  min-h-[87.3vh] flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <div className="z-20 text-center text-white px-4">
          <h1 className="md:text-7xl text-3xl font-bold">Company</h1>
          <p className="my-3 text-lg">
            Get to know more about us and connect with our team for your unique
            needs.
          </p>
        </div>
      </div>

      {/* Company Services Mapping */}
      <div className="py-16 px-4 md:px-20">
        {companyServices.map((service, index) => (
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
                <h1 className="inline-block bg-transparent text-black border border-black px-6 py-2 rounded-lg hover:bg-[#002040] hover:text-white transition duration-300">
                  {service.name}
                </h1>
              </Link>
            </div>

            {/* Image Block */}
           <div className="w-full md:w-1/2 p-4">
              <div className=" w-full relative rounded-lg overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.heading}
                  width={500}
                  height={500}
                  objectFit="cover"
                
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Company;