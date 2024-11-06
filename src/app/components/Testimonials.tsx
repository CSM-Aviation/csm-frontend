'use client'
import avatar1 from "../../../public/images/ClientTestimonials/avatar-1.png"
import avatar2 from "../../../public/images/ClientTestimonials/avatar-2.png"
import avatar3 from "../../../public/images/ClientTestimonials/avatar-3.png"
import avatar4 from "../../../public/images/ClientTestimonials/avatar-4.png"
import Image from "next/image"
import {motion} from "framer-motion"
const testimonials = [
  {
    text: "“The level of luxury and attention to detail in their charter service exceededed all our expectations. Every journey with them felt like a VIP experience”",
    name: "Sophia Perez",
 
    avatarImg: avatar1,
  },
  {
    text: "“Their 24/7 availability and immediate response time make them our go-to choice for all executive transportation needs. Reliability at its finest”",
    name: "Jamie Lee",
  
    avatarImg: avatar2,
  },
  {
    text: "“The safety protocols and professional chauffeurs give us complete peace of mind. Perfect for our family”",
    name: "Alisa Hester",
  
    avatarImg: avatar3,
  },
  {
    text: "“From last-minute bookings to complex multi-city arrangements, their service is consistently impeccable and truly world-class”",
    name: "Alec Whitten",
   
    avatarImg: avatar4,
  },
];

export const Testimonials = () => {
    return (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl text-center tracking-tighter font-medium">
                Trusted by Industry Leaders
              </h2>
              <p className="mt-5 text-lg md:text-xl  text-black/70 text-center tracking-tight max-w-sm mx-auto">
                Discover why executives and luxury clients choose our charter services
              </p>
            </div>
            <div className=" flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
            initial={{
              translateX:'-50%'
            }}
            animate={{
              translateX:'0',
            }} 
            transition={{
              repeat:Infinity,
              ease:"linear",
              duration:30,
            }}
            className="flex gap-5 pr-5 flex-none ">
              {[...testimonials,... testimonials].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="border border-[#004080]/20 p-6 md:p-10 rounded-xl bg-gradient-to-bl from-[#004080]/30 to-[#004080]/5 max-w-xs md:max-w-md flex-none backdrop-blur-sm"
                >
                  <div className="flex items-center mb-6">
                    <Image
                      className="h-12 w-12 rounded-full border border-[#004080]/20 object-cover"
                      src={testimonial.avatarImg}
                      alt={`${testimonial.name}'s avatar`}
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-[#004080]">{testimonial.name}</div>
                      {/* <div className="text-sm text-gray-600">{testimonial.title}</div> */}
                    </div>
                  </div>
                  <blockquote>
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                      {testimonial.text}
                    </p>
                  </blockquote>
                </div>
              ))}
            </motion.div>
            </div>
          </div>
        </section>
      );
    };
    
    export default Testimonials;
