import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const EmailSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await apiService.post('/api/subscribe', { email });
      if (response.error) {
        throw new Error(response.error);
      }
      setEmail('');
      setMessage('Thank you for subscribing!');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  if (!isMounted) {
    return null;
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
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Join now
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-green-500">{message}</p>}
    </div>
  );
};

export default EmailSubscription;