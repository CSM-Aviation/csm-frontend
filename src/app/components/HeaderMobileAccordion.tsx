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
              className="fixed top-0 left-0 h-screen w-screen z-[60] bg-[#D7DAE3] overflow-y-auto pt-24"
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
                    className="text-gray-800"
                    variants={menuItemVariants}
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        item.subLinks ? toggleSubmenu(item.label) : null
                      }
                    >
                      {item.subLinks ? (
                        <span className="font-medium hover:text-blue-600 uppercase">
                          {item.label}
                        </span>
                      ) : (
                        <div
                          onClick={() => handleLinkClick(item.href)}
                          className="font-medium hover:text-blue-600 flex-1"
                        >
                          {item.label}
                        </div>
                      )}

                      {item.subLinks ? (
                        <FaChevronDown
                          className={`ml-2 transition-transform duration-300 ${
                            openSubmenu === item.label ? "rotate-180" : ""
                          }`}
                        />
                      ) : (
                        <div
                        onClick={() => handleLinkClick(item.href)}
                        className="font-medium hover:text-blue-600 uppercase"
                      >
                        <FaArrowRight className="ml-2" />
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
                          className="ml-4 mt-5 space-y-6 overflow-hidden"
                        >
                          {item.subLinks.map((sub, i) => (
                            <div
                              key={i}
                              onClick={() => handleLinkClick(sub.href)}
                              className="flex items-center cursor-pointer justify-between text-sm text-gray-700 hover:text-blue-500 uppercase"
                            >
                              <span>{sub.label}</span>
                              <FaArrowRight className="text-xs ml-1" />
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