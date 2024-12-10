// types.ts
export interface CitySection {
  title: string;
  content: string;
}

export interface PopularRoutes {
  title: string;
  routes: string[];
}

export interface BestJets {
  title: string;
  jets: string[];
}

export interface ContactInfo {
  text: string;
}

export interface CityImages {
  hero: {
      desktop: string;
     
  };
  thumbnail: string;  // For smaller displays like cards or previews
}

export interface CityData {
  title: string;
  introText: string;
  contactInfo: ContactInfo;
  sections: CitySection[];
  popularRoutes: PopularRoutes;
  bestJets: BestJets;
  images: CityImages;
}

export interface CitiesData {
  [key: string]: CityData;
}

