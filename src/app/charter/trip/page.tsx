'use client';
import React, { useState } from 'react';
const RedStar = () => <span className="text-red-500 ml-1">*</span>;
const TripRequestForm = () => {
  const [tripType, setTripType] = useState('One-Way');
  const [aircraftType, setAircraftType] = useState('Turbo Prop');

  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-5xl font-bold text-center mb-10">Trip Request</h1>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First name<RedStar/></label>
            <input type="text" placeholder="e.g., John" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last name<RedStar/></label>
            <input type="text" placeholder="e.g., Johnson" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email<RedStar/></label>
            <input type="email" placeholder="e.g., name@email.com" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone<RedStar/></label>
            <input type="tel" placeholder="e.g., 555-555-555" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required/>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aircraft Selection</label>
            <select 
              value={aircraftType}
              onChange={(e) => setAircraftType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300  text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Turbo Prop">Turbo Prop</option>
              <option value="Light Jet">Light Jet</option>
              <option value="Midsize Jet">Midsize Jet</option>
              <option value="Super Midsize/Heavy Jet">Super Midsize/Heavy Jet</option>
              <option value="Best Available Option">Best Available Option</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
            <select 
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="One-Way">One-Way</option>
              <option value="Round Trip">Round Trip</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Location</label>
            <input type="text" placeholder="e.g., Fresno, CA" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
            <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Location</label>
            <input type="text" placeholder="e.g., Santa Ana, CA" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          {tripType === 'Round Trip' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Time</label>
                <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Details<RedStar/></label>
          <textarea 
            placeholder="Please add any special requests here, please list any multi-destination info here."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"required
          ></textarea>
        </div>
        
        <button type="submit" className="w-full bg-blue-900 rounded-xl text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          Request a Private Jet
        </button>
      </form>
    </div>
  );
};

export default TripRequestForm;