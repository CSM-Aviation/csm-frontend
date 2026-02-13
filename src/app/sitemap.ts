import { MetadataRoute } from 'next'
import { apiService } from './services/apiService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch dynamic routes from your API or database
    const fleetResponse = await apiService.fetchFleet();
    const fleetPages = fleetResponse.data ? fleetResponse.data.map(item => ({
        url: `https://www.csmaviation.com/charter/fleet/${item._id}?model=${item.aircraftName}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7
    })) : [];

    // Define your static routes
    const routes = [
        '',
        '/charter/quote',
        '/charter/trip',
        '/charter/fleet',
        '/management',
        '/maintenance',
        '/company/about',
        '/company/contact'
    ].map((route) => ({
        url: `https://www.csmaviation.com${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8
    }));

    return [
        {
            url: 'https://www.csmaviation.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...routes,
        ...fleetPages,
    ]
}