import { SeoData } from '../services/apiService';

export function generateStructuredData(seoData: SeoData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoData.siteName,
    "url": seoData.canonicalUrl,
    "logo": "https://www.csmaviation.com/images/CSM-Logo-WHITE-01-web300.jpg",
    "description": seoData.description,
    "sameAs": [
      "https://www.facebook.com/CSMaviation/",
      "https://linkedin.com/company/csm-aviation"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "", // Add your contact number
      "contactType": "customer service"
    }
  };
} 