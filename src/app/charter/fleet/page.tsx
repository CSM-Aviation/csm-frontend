"use client"

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { fetchFleet, FleetItem } from '@/app/services/apiService';

const FleetPage: NextPage = () => {
  const [fleet, setFleet] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFleet = async () => {
      try {
        const response = await fetchFleet();
        if (response.error) {
          throw new Error(response.error);
        }
        setFleet(response.data || []);
      } catch (err) {
        setError('Failed to load fleet data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFleet();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">CSM FLEET</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((item) => (
          <div key={item._id} className="bg-white text-black shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{item.aircraftName}</h2>
            <p><strong>Registration:</strong> {item.registration}</p>
            <p><strong>Seats:</strong> {item.seats}</p>
            <p><strong>Range:</strong> {item.range}</p>
            <p><strong>Speed:</strong> {item.speed}</p>
            <p><strong>Amenities:</strong> {item.amenities}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetPage;