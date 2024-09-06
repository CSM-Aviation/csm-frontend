'use client';
import React, { useState } from 'react';
import { submitTripRequest, TripRequest } from '../../services/apiService';

const RedStar = () => <span className="text-red-500 ml-1">*</span>;

const TripRequestForm = () => {
  const [tripType, setTripType] = useState('One-Way');
  const [aircraftType, setAircraftType] = useState('Turbo Prop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    aircraftType: 'Turbo Prop',
    tripType: 'One-Way',
    departureLocation: '',
    startDate: '',
    departureTime: '',
    destinationLocation: '',
    returnDate: '',
    returnTime: '',
    tripDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await submitTripRequest(formData as TripRequest);
      if (response.error) {
        throw new Error(response.error);
      }
      setSubmitStatus('Thank you for your trip request. We will get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        aircraftType: 'Turbo Prop',
        tripType: 'One-Way',
        departureLocation: '',
        startDate: '',
        departureTime: '',
        destinationLocation: '',
        returnDate: '',
        returnTime: '',
        tripDetails: ''
      });
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black";
  const dateTimeClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black bg-white";

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Trip Request</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First name<RedStar /></label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g., John" className={inputClasses} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last name<RedStar /></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g., Johnson" className={inputClasses} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email<RedStar /></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., name@email.com" className={inputClasses} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone<RedStar /></label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., 555-555-5555" className={inputClasses} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aircraft Selection</label>
            <select
              name="aircraftType"
              value={formData.aircraftType}
              onChange={handleChange}
              className={inputClasses}
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
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="One-Way">One-Way</option>
              <option value="Round Trip">Round Trip</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Location</label>
            <input type="text" name="departureLocation" value={formData.departureLocation} onChange={handleChange} placeholder="e.g., Fresno, CA" className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={dateTimeClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
            <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} className={dateTimeClasses} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Location</label>
            <input type="text" name="destinationLocation" value={formData.destinationLocation} onChange={handleChange} placeholder="e.g., Santa Ana, CA" className={inputClasses} />
          </div>
          {formData.tripType === 'Round Trip' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} className={dateTimeClasses} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Time</label>
                <input type="time" name="returnTime" value={formData.returnTime} onChange={handleChange} className={dateTimeClasses} />
              </div>
            </>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Details<RedStar /></label>
          <textarea
            name="tripDetails"
            value={formData.tripDetails}
            onChange={handleChange}
            placeholder="Please add any special requests here, please list any multi-destination info here."
            rows={4}
            className={inputClasses}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Request a Private Jet'}
        </button>
        {submitStatus && <p className="mt-4 text-center text-green-600">{submitStatus}</p>}
      </form>
    </div>
  );
};

export default TripRequestForm;