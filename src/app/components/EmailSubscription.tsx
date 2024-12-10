import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { FiArrowRight } from 'react-icons/fi';

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
    <div className="text-center md:text-left   ">
      <h2 className="md:text-3xl font-bold mb-6 text-white">
        Subscribe to our CSM offers, special updates and much more ...
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md  flex items-center">
        <div className="relative w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full py-3 px-4 pr-14 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <button
            type="submit"
            className="absolute inset-y-1 right-1 flex items-center justify-center w-10 h-10 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition duration-300"
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-sm text-white">{message}</p>}
    </div>
  );
};

export default EmailSubscription;
