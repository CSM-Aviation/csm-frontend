import { notFound } from 'next/navigation';
import CityDestinationPage from '@/app/components/CityDestination/cityDestinationPage';
import { cityData } from '@/app/components/CityDestination/cityData';

interface Props {
  params: {
    cityId: string;
  }
}

export default function CityPage({ params }: Props) {
  const { cityId } = params;

  // Validate city exists
  if (!cityId || !(cityId in cityData)) {
    notFound();
  }

  return <CityDestinationPage cityId={cityId} />;
}