import { SeoData } from '@/app/services/apiService';
import { Metadata } from 'next';

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
            type: type, // This should now match the allowed types
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
            'twitter:domain': new URL(canonicalUrl).hostname,
        },
    };
}

const Seo: React.FC<SeoData> = (props) => {
    // This component doesn't render anything visible
    // It's used for its side effect of generating metadata
    return null;
};

export default Seo;