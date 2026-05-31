/**
 * Destination city data (ported from the old cityData.ts but rewritten in the
 * calm-command voice — the old copy leaned on "luxury / premium / world-class",
 * which the brand voice forbids, §16). Images already live under
 * public/images/PopularDestinations. OPEN CONTENT GAP (§10): final destination
 * list is stakeholder-owned; these four have owned imagery today.
 */
export interface DestinationSection {
  title: string;
  body: string;
}

export interface Destination {
  slug: string;
  city: string;
  state: string;
  tagline: string;
  intro: string;
  heroImage: string;
  thumbnail: string;
  sections: DestinationSection[];
  popularRoutes: string[];
}

export const destinations: Destination[] = [
  {
    slug: "miami",
    city: "Miami",
    state: "Florida",
    tagline: "Coast-to-coast, on your schedule",
    intro:
      "From the Central Valley to South Florida without the connections. We position the right aircraft for the range, then keep you informed from intake to wheels-down.",
    heroImage: "/images/PopularDestinations/Miami/Miami.jpg",
    thumbnail: "/images/PopularDestinations/Miami/miamii.jpg",
    sections: [
      {
        title: "Flying private to Miami",
        body: "Miami is a long leg from the West Coast — the kind of trip where range and crew rest matter. We match the aircraft to the distance so you fly direct and arrive ready, not routed through a hub.",
      },
      {
        title: "Arrival without the airport",
        body: "Private terminals at Miami-area fields mean you step from the ramp to your car in minutes. We coordinate ground ahead of time, so the transition is quiet and handled.",
      },
    ],
    popularRoutes: [
      "Sacramento to Miami",
      "Los Angeles to Miami",
      "Las Vegas to Miami",
      "New York to Miami",
    ],
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    state: "California",
    tagline: "A short hop from home base",
    intro:
      "Los Angeles is in our backyard. Light jets and turboprops make the run efficient, with Van Nuys and the basin's executive fields keeping you close to where you're headed.",
    heroImage: "/images/PopularDestinations/Los%20Angeles/LosAngeles.jpg",
    thumbnail: "/images/PopularDestinations/Los%20Angeles/griffith.png",
    sections: [
      {
        title: "Flying private to Los Angeles",
        body: "From the Central Valley, LA is a quick, efficient leg. We pick the aircraft that fits the trip rather than the brochure, and we hold to the same standard whether it's an hour or a coast-to-coast.",
      },
      {
        title: "The right field for the day",
        body: "Van Nuys, Burbank, and the basin's executive airports put you nearer your destination than a commercial terminal ever could. We choose the field around your schedule.",
      },
    ],
    popularRoutes: [
      "Sacramento to Los Angeles",
      "Fresno to Los Angeles",
      "Las Vegas to Los Angeles",
      "San Francisco to Los Angeles",
    ],
  },
  {
    slug: "new-york",
    city: "New York",
    state: "New York",
    tagline: "Transcontinental, handled end to end",
    intro:
      "A coast-to-coast trip is a planning exercise as much as a flight. We handle the range, the crew, and the ground — so the only thing you track is your own schedule.",
    heroImage: "/images/PopularDestinations/New%20York/NewYork.jpg",
    thumbnail: "/images/PopularDestinations/New%20York/statue.jpg",
    sections: [
      {
        title: "Flying private to New York",
        body: "The transcontinental leg rewards the right aircraft and a crew briefed on the weather both ends. We plan it as one continuous trip, with constant communication throughout.",
      },
      {
        title: "Teterboro and the metro fields",
        body: "Teterboro, Westchester, and Long Island's executive airports keep you out of the commercial crush and closer to the city. We confirm the field and the ground before you leave.",
      },
    ],
    popularRoutes: [
      "Los Angeles to New York",
      "Sacramento to New York",
      "Las Vegas to New York",
      "Miami to New York",
    ],
  },
  {
    slug: "las-vegas",
    city: "Las Vegas",
    state: "Nevada",
    tagline: "Nevada reach from a California base",
    intro:
      "Las Vegas is a routine run for us — close enough for a same-day turn, with the responsiveness brokers and repeat clients count on.",
    heroImage: "/images/PopularDestinations/Las%20Vegas/LasVegas.jpeg",
    thumbnail: "/images/PopularDestinations/Las%20Vegas/lasvegas.jpg",
    sections: [
      {
        title: "Flying private to Las Vegas",
        body: "Positioned to serve all of California and Nevada from one base, we can move quickly on a Vegas trip — including the short-notice ones. The aircraft is matched to the group and the day.",
      },
      {
        title: "Same-day turns",
        body: "Henderson and Harry Reid's private terminals make a fly-in, fly-out day straightforward. We hold the schedule and keep you posted at every step.",
      },
    ],
    popularRoutes: [
      "Sacramento to Las Vegas",
      "Los Angeles to Las Vegas",
      "Fresno to Las Vegas",
      "San Francisco to Las Vegas",
    ],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
