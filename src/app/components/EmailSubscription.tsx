'use client'

import React, { useState, useEffect } from 'react';

const EmailSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log('Subscribing email:', email);
  };

  if (!isMounted) {
    return null; // Prevent server-side render mismatch by skipping until mounted
  }

  return (
    <div className="text-center md:text-left">
      <h2 className="md:text-3xl font-bold mb-4">
        Subscribe to our CSM offers, special updates<br />and much more ...
      </h2>
      <form onSubmit={handleSubmit} className='flex gap-2'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-grow py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Join now
        </button>
      </form>
    </div>
  );
};

export default EmailSubscription;
