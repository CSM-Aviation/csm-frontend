// app/sitemap/page.tsx
import Link from 'next/link';
import { apiService } from '@/app/services/apiService';
import { ChevronRight } from 'lucide-react';

export default async function SitemapPage() {
  const fleetResponse = await apiService.fetchFleet();

  const staticRoutes = [
    { title: 'Home', href: '/' },
    { title: 'Quote', href: '/charter/quote' },
    { title: 'Trip Planner', href: '/charter/trip' },
    { title: 'Fleet Overview', href: '/charter/fleet' },
    { title: 'Management', href: '/management' },
    { title: 'Maintenance', href: '/maintenance' },
    { title: 'About', href: '/company/about' },
    { title: 'Contact', href: '/company/contact' },
  ];

  const fleetLinks = fleetResponse.data
    ? fleetResponse.data.map((item: any) => ({
        title: `${item.aircraftName} (${item.registration})`,
        href: `/charter/fleet/${item.registration}?model=${encodeURIComponent(item.aircraftName)}`,
      }))
    : [];

  return (
    <main className="max-xl:py-20 py-[120px] flex flex-col gap-4 max-md:px-6 px-10">
      <h1 className="text-6xl max-lg:text-5xl max-md:text-4xl font-bold text-black text-center">Sitemap</h1>
      <div className='flex justify-center'>
      <p className='text-neutral-500 text-[18px] max-md:text-[16px]  max-w-lg text-center '>Navigate through our comprehensive directory of services, fleet options, and resources designed to enhance your private aviation experience.</p>
      </div>
      <div className='flex flex-col gap-4'>
      <h1 className='text-black text-3xl max-md:text-2xl font-semibold text-center'>Main Navigation</h1>
      <ul className="text-lg  grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {staticRoutes.map((route, index) => (
          <li key={index} className='p-4 shadow-md'>
            <Link href={route.href} className="text-black text-md flex items-center gap-4 max-sm:gap-2 max-sm:text-[14px]">
            <span><ChevronRight color='#ba9154' size={20}/></span>{route.title}
            </Link>
          </li>
        ))}
      </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-3xl max-md:text-2xl font-semibold mb-4 text-black text-center">Fleet Pages</h2>
        <ul className="text-lg  grid grid-cols-3 max-sm:grid-cols-1 gap-4">
          {fleetLinks.map((fleet, index) => (
            <li key={index} className='p-4 shadow-md'>
              <Link href={fleet.href} className="text-black text-md flex items-center gap-4 max-sm:gap-2 max-sm:text-[14px]">
              <span><ChevronRight color='#ba9154' size={20}/></span>{fleet.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}