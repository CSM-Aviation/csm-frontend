import React from 'react';
import { Metadata } from 'next';
import { generateMetadata as seoGenerateMetadata } from '../components/seo/Seo';
import StructuredData from '../components/seo/StructuredData';
import { generateStructuredData } from '../utils/structuredData';
import Donor5KPage from './Donor5KPage';

// SEO metadata for the page
const seoData = {
  title: 'Donor Network West 5K Run/Walk - CSM Aviation',
  description: 'Join CSM Aviation in supporting the Donor Network West 5K Run/Walk. Help us raise awareness and funds for organ, eye, and tissue donation to save lives.',
  keywords: ['donor network west', '5k run walk', 'organ donation', 'CSM Aviation', 'charity event', 'fundraising'],
  ogImage: '/images/donor-5k-hero.jpg',
  canonicalUrl: 'https://www.csmaviation.com/donor-5k',
  robots: 'index, follow',
  author: 'CSM Aviation',
  language: 'en',
  siteName: 'CSM Aviation',
  type: 'website' as const,
  twitterHandle: '@CSMAviation',
};

export async function generateMetadata(): Promise<Metadata> {
  return seoGenerateMetadata(seoData);
}

export default function Page() {
  const structuredData = generateStructuredData(seoData);

  return (
    <>
      <StructuredData data={structuredData} />
      <Donor5KPage />
    </>
  );
}