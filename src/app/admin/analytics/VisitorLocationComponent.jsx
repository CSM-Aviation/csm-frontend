import React, { useMemo } from 'react';
import { ChevronsUpDown } from 'lucide-react';

const VisitorLocationComponent = ({ visitorData }) => {
  // Memoize the aggregated data to prevent unnecessary recalculations
  const sortedData = useMemo(() => {
    // Aggregate data by country
    const aggregatedData = Object.entries(visitorData || {}).reduce((acc, [location, count]) => {
      const locationParts = location.split(', ');
      const country = locationParts[locationParts.length - 1];
      if (country && country !== 'Unknown') {
        acc[country] = (acc[country] || 0) + count;
      }
      return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(aggregatedData)
      .map(([country, count]) => ({
        location: country,
        count: count
      }))
      .sort((a, b) => b.count - a.count);
  }, [visitorData]); // Only recalculate when visitorData changes

  const totalVisitors = useMemo(() => 
    sortedData.reduce((sum, item) => sum + item.count, 0),
    [sortedData]
  );

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Countries</h2>
        <div className="text-xs text-gray-400">
          Total: {totalVisitors.toLocaleString()}
        </div>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <ul className="space-y-2">
          {sortedData.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-2">
              <span className="text-sm">{item.location}</span>
              <span className="text-sm font-medium">
                {item.count.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          View All
          <ChevronsUpDown className="ml-1 w-4 h-4" />
        </button>
        <span className="text-sm text-gray-400">
          {sortedData.length} countries
        </span>
      </div>
    </div>
  );
};

export default VisitorLocationComponent;