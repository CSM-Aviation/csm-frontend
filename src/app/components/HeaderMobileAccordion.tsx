import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
const menuItems = [
  {
    label: "Charter",
    subLinks: [
      { label: "FLEET", href: "/charter/fleet" },
      { label: "CHARTER DESTINATIONS", href: "/destinations" },
    ],
  },
  {
    label: "MANAGEMENT",
    href: "/management",
  },
  {
    label: "MAINTENANCE",
    href: "/maintenance",
  },
  {
    label: "COMPANY",
    subLinks: [
      { label: "ABOUT US", href: "/company/about" },
      { label: "CONTACT", href: "/company/contact" },
      { label: "CAREERS", href: "/company/careers" },
    ],
  },


  {
    label: "LOGIN",
    href: "/admin/login",
  },
];

const HeaderMobileAccordion: React.FC = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setComplete(false);
    setOpenSubmenu(null); // Reset submenus on toggle
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // const handleLoginClick = () => {
  //   router.push("/admin/login");
  // };

  const handleLinkClick = (link: string) => {
    setIsOpen(false);
    router.push(link);
  };

  return (
    <>
      <div
        // style={{
        //   height: !isOpen ? (complete ? "fit-content" : "100vh") : "100vh",
        // }}
        className="w-full"
      >
        {/* Hamburger Button */}
        <button
          className=" relative z-[70] py-2"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex  flex-col ">
            <motion.span
              className={`h-1 rounded-full w-8 bg-white`}
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : -3 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`h-1 rounded-full w-8 bg-white`}
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`h-1 rounded-full w-8 bg-white`}
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -1 : 3 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>

        <AnimatePresence onExitComplete={() => setComplete(true)}>
          {isOpen && (
            <motion.div
              className="fixed top-0 left-0 h-screen w-screen z-[60] bg-[#002040]/95 backdrop-blur-xl overflow-y-auto pt-24"
              initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
              animate={{ clipPath: "circle(150% at 2rem 2rem)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
              transition={{ duration: 0.8, ease: [0.9, 1, 0.5, 0.8] }}
            >
              <motion.nav
                className="px-7 space-y-9 navbar md:px-9 py-10"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-white border-b border-white/10 pb-6 last:border-0"
                    variants={menuItemVariants}
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() =>
                        item.subLinks ? toggleSubmenu(item.label) : null
                      }
                    >
                      {item.subLinks ? (
                        <span className="font-semibold text-lg hover:text-[#23B2EE] uppercase tracking-[0.15em] transition-colors duration-300">
                          {item.label}
                        </span>
                      ) : (
                        <div
                          onClick={() => handleLinkClick(item.href)}
                          className="font-semibold text-lg hover:text-[#23B2EE] flex-1 uppercase tracking-[0.15em] transition-colors duration-300"
                        >
                          {item.label}
                        </div>
                      )}

                      {item.subLinks ? (
                        <FaChevronDown
                          className={`ml-2 text-white/70 group-hover:text-[#23B2EE] transition-all duration-300 ${
                            openSubmenu === item.label ? "rotate-180 text-[#23B2EE]" : ""
                          }`}
                        />
                      ) : (
                        <div
                        onClick={() => handleLinkClick(item.href)}
                        className="font-semibold hover:text-[#23B2EE] uppercase transition-colors duration-300"
                      >
                        <FaArrowRight className="ml-2 text-white/70 group-hover:translate-x-1 group-hover:text-[#23B2EE] transition-all duration-300" />
                      </div>
                      )}
                    </div>

                    {/* Animate Sub-links */}
                    <AnimatePresence>
                      {item.subLinks && openSubmenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="ml-2 mt-4 space-y-4 overflow-hidden border-l border-white/20 pl-6"
                        >
                          {item.subLinks.map((sub, i) => (
                            <div
                              key={i}
                              onClick={() => handleLinkClick(sub.href)}
                              className="flex items-center cursor-pointer justify-between text-sm md:text-base text-white/80 hover:text-[#23B2EE] hover:pl-2 uppercase tracking-widest transition-all duration-300"
                            >
                              <span>{sub.label}</span>
                              <FaArrowRight className="text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default HeaderMobileAccordion;