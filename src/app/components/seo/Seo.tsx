import { SeoData } from '@/app/services/apiService';
import { Metadata } from 'next';

const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

// Valid OpenGraph types
const validOgTypes = ['website', 'article', 'book', 'profile', 'music.song', 'music.album', 'music.playlist', 'music.radio_station', 'video.movie', 'video.episode', 'video.tv_show', 'video.other'] as const;

type ValidOgType = typeof validOgTypes[number];

const isValidOgType = (type: string): type is ValidOgType => {
  return validOgTypes.includes(type as ValidOgType);
};

export function generateMetadata({
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    robots,
    author,
    language,
    siteName,
    type,
    twitterHandle,
    publishedTime,
    modifiedTime,
    section,
    tags,
}: SeoData): Metadata {
    // Ensure we have a valid OpenGraph type
    const ogType: ValidOgType = isValidOgType(type) ? type : 'website';

    return {
        title,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: author }],
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName,
            images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
            locale: language,
            type: ogType,
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
            ...(section && { section }),
            ...(tags && { tags }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: twitterHandle,
        },
        robots,
        alternates: {
            canonical: canonicalUrl,
        },
        other: {
            'og:site_name': siteName,
            'twitter:site': twitterHandle,
            'twitter:domain': getHostname(canonicalUrl),
        },
    };
}

const Seo: React.FC<SeoData> = (props) => {
    // This component doesn't render anything visible
    // It's used for its side effect of generating metadata
    return null;
};

export default Seo;