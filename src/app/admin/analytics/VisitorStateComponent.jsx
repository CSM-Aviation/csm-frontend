import React, { useMemo } from 'react';
import { ChevronsUpDown } from 'lucide-react';

const VisitorStateComponent = ({ visitorData }) => {
  // Memoize the aggregated data
  const sortedData = useMemo(() => {
    // Aggregate data by state/region
    const aggregatedData = Object.entries(visitorData || {}).reduce((acc, [location, count]) => {
      const locationParts = location.split(', ');
      const state = locationParts.length > 1 ? locationParts[1] : locationParts[0];
      if (state && state !== 'Unknown') {
        acc[state] = (acc[state] || 0) + count;
      }
      return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(aggregatedData)
      .map(([state, count]) => ({
        location: state,
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
        <h2 className="text-lg font-semibold">States/Regions</h2>
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
          {sortedData.length} states/regions
        </span>
      </div>
    </div>
  );
};

export default VisitorStateComponent;