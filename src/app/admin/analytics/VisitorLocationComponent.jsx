import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

const VisitorLocationComponent = ({ visitorData }) => {
  // Aggregate data by country
  const aggregatedData = visitorData.reduce((acc, item) => {
    const country = item.location.split(', ').pop(); // Get the country (last part after comma)
    acc[country] = (acc[country] || 0) + item.visitors;
    return acc;
  }, {});

  // Convert aggregated data to array and sort by visitor count
  const sortedData = Object.entries(aggregatedData)
    .map(([country, visitors]) => ({ location: country, visitors }))
    .sort((a, b) => b.visitors - a.visitors);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Countries</h2>
        <div className="text-xs text-gray-400">VISITORS</div>
      </div>
      <ul>
        {sortedData.map((item, index) => (
          <li key={index} className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <span>{item.location}</span>
            </div>
            <span>{item.visitors}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          View All
          <ChevronsUpDown className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VisitorLocationComponent;