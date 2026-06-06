/**
 * Sales & Acquisitions copy. Owners weigh guidance and outcomes — lead with the
 * relationship and the long-term ownership view, not a transactional pitch.
 * Editorial bands, mirroring the Aircraft Management page.
 */
export const salesAcquisitions = {
  hero: {
    eyebrow: "Sales & Acquisitions",
    title: "Trusted guidance from a team that understands aircraft ownership.",
    lead: "CSM Aviation supports clients through aircraft acquisitions and sales with a focus on market insight, mission, and long-term ownership success. Whether purchasing your first aircraft, upgrading your current aircraft, or preparing to sell, our team provides the expertise and resources needed to navigate each step with confidence.",
    cta: { label: "Talk to our team", href: "/company/contact?inquiry=sales-acquisitions" },
  },

  acquisition: {
    eyebrow: "Aircraft Acquisition",
    heading: "Finding the right aircraft for your mission.",
    body: [
      "Selecting an aircraft begins with understanding and how you fly. Our team works with clients to evaluate mission requirements, aircraft capabilities, operating costs, and ownership goals before identifying the right opportunities in the market.",
      "From aircraft sourcing and evaluation to inspections and closing coordination, we help simplify the acquisition process and ensure every decision supports your long-term aviation needs.",
    ],
  },

  sales: {
    eyebrow: "Aircraft Sales",
    heading: "Representing your aircraft with experience and care.",
    body: [
      "Selling an aircraft requires thoughtful positioning, accurate market insight, and a deep understanding of prospective buyers. We support aircraft owners through the sales process with strategic guidance designed to maximize value while creating an efficient transaction.",
      "Our network, operational knowledge, and industry relationships help connect aircraft owners with qualified buyers.",
    ],
  },

  beyond: {
    eyebrow: "Beyond the Transaction",
    heading: "Qualified to support the full ownership experience",
    body: [
      "Our relationship does not end when an aircraft changes hands. Through our integrated capabilities, CSM Aviation can support owners beyond acquisition with aircraft management, maintenance coordination, charter solutions, detailing, and ownership administration.",
      "The same team helping evaluate your aircraft understands what it takes to operate and care for it.",
    ],
  },
} as const;
