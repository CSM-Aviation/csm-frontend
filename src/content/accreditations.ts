/**
 * Accreditation marks — core trust currency (design doc §02/§08). Rendered as
 * a dedicated AccreditationStrip band, never as footer fine print. Assets
 * already in public/images/logos (reuse, don't re-source — build spec §3.4).
 */
export interface Accreditation {
  name: string;
  /** Full name for the image alt / title. */
  full: string;
  src: string;
  /** Intrinsic-ish display width in px; height auto-scales. */
  href: string;
}

export const accreditations: Accreditation[] = [
  {
    name: "ARGUS Gold",
    full: "ARGUS Gold Rated",
    src: "/images/logos/CSM_Aviation_Argus_Gold_150x150.png",
    href: "https://www.argus.aero/",
  },
  {
    name: "NBAA",
    full: "National Business Aviation Association member",
    src: "/images/logos/NBAA_logo_4_24.png",
    href: "https://nbaa.org/",
  },
  {
    name: "NATA",
    full: "National Air Transportation Association member",
    src: "/images/logos/NATA_logo.png",
    href: "https://www.nata.aero/",
  },
  {
    name: "ACSF",
    full: "Air Charter Safety Foundation member",
    src: "/images/logos/acsf_logo.png",
    href: "https://www.acsf.aero/",
  },
  {
    name: "Wyvern",
    full: "Wyvern registered operator",
    src: "/images/logos/CSM_Aviation_Wyvern_150x150.png",
    href: "https://wyvernltd.com/",
  },
];
