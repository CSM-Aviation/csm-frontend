import React from 'react';
import AdminAnalyticsDashboard from './AdminAnalyticsDashboard';

const AnalyticsTab: React.FC = () => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6 text-black" >
        <h3 className="text-lg leading-6 font-medium">Analytics</h3>
        <div className="mt-5">
          {/* <p>Analytics data will be displayed here. This is a placeholder for future implementation.</p> */}
          <AdminAnalyticsDashboard/>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;