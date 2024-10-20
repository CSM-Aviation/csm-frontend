'use client'
import React, { useState } from 'react';
import { apiService } from '../../services/apiService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    phone: '',
    inquiryTopic: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

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
      const response = await apiService.post('/api/contact', formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setSubmitStatus('Thank you for your message. We will get back to you soon.');
      setFormData({ firstName: '', lastName: '', email: '', message: '', phone: '', inquiryTopic: '' });
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black";

  return (
    <div className="bg-white text-black py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-center mb-8">
          Central California&apos;s premier private aviation management and part 135 air
          charter service now opening new charter service locations nationwide.
          Complete the form below to begin a conversation with one of our experts.
        </p>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block mb-2">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2">Phone <span className="text-red-500">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="inquiryTopic" className="block mb-2">Inquire Topic <span className="text-red-500">*</span></label>
            <select
              id="inquiryTopic"
              name="inquiryTopic"
              value={formData.inquiryTopic}
              onChange={handleChange}
              required
              className={inputClasses}
            >
              <option value="">Please Select</option>
              <option value="Accounting & Finance">Accounting & Finance</option>
              <option value="Aircraft Cleaning & Disinfecting">Aircraft Cleaning & Disinfecting</option>
              <option value="Aircraft Management">Aircraft Management</option>
              <option value="Charter Services">Charter Services</option>
              <option value="Employment">Employment</option>
              <option value="FBO - Los Angeles, CA">FBO - Fresno, CA</option>
              <option value="FBO - Orange County, CA">FBO - Madera, CA</option>
              {/* <option value="FBO - Oxford, CT">FBO - Oxford, CT</option> */}
              <option value="Maintenance, Avionics & Cabin Entertainment">Maintenance, Avionics & Cabin Entertainment</option>
              <option value="Media Inquiry">Media Inquiry</option>
              <option value="Parts & Rotables">Parts & Rotables</option>
              <option value="PRIA Pilot Records">PRIA Pilot Records</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2">Message <span className="text-red-500">*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={inputClasses}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
          {submitStatus && <p className="mt-4 text-center">{submitStatus}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
