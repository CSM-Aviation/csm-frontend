'use client'
import React, { useState, useEffect, FormEvent } from 'react';
import { apiService } from '../services/apiService';
import { Star } from 'lucide-react';

// Define the form data structure
interface FormData {
  bookingEfficiency: number;
  fboLocating: number;
  fboStaffCourtesy: number;
  aircraftCleanliness: number;
  cabinComfort: number;
  crewProfessionalism: number;
  overallSatisfaction: number;
  willRecommend: string;
  email: string;
  comments: string;
}

// Define the rating field structure
interface RatingField {
  name: keyof Pick<FormData, 'bookingEfficiency' | 'fboLocating' | 'fboStaffCourtesy' | 
    'aircraftCleanliness' | 'cabinComfort' | 'crewProfessionalism' | 'overallSatisfaction'>;
  label: string;
}

const SurveyForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    bookingEfficiency: 0,
    fboLocating: 0,
    fboStaffCourtesy: 0,
    aircraftCleanliness: 0,
    cabinComfort: 0,
    crewProfessionalism: 0,
    overallSatisfaction: 0,
    willRecommend: '',
    email: '',
    comments: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      const response = await apiService.submitSurvey(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setMessage('Thank you for your feedback!');
      setFormData({
        bookingEfficiency: 0,
        fboLocating: 0,
        fboStaffCourtesy: 0,
        aircraftCleanliness: 0,
        cabinComfort: 0,
        crewProfessionalism: 0,
        overallSatisfaction: 0,
        willRecommend: '',
        email: '',
        comments: ''
      });
    } catch (error) {
      setMessage('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingFields: RatingField[] = [
    { name: 'bookingEfficiency', label: 'Booking Efficiency' },
    { name: 'fboLocating', label: 'FBO Locating Experience' },
    { name: 'fboStaffCourtesy', label: 'FBO Staff Courtesy' },
    { name: 'aircraftCleanliness', label: 'Aircraft Cleanliness' },
    { name: 'cabinComfort', label: 'Cabin Comfort' },
    { name: 'crewProfessionalism', label: 'Crew Professionalism' },
    { name: 'overallSatisfaction', label: 'Overall Satisfaction' }
  ];

  const handleRatingChange = (fieldName: RatingField['name'], rating: number) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: rating
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl text-[#004080] font-bold text-center mb-6">Flight Experience Survey</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow space-y-6">
        {/* Rating Fields */}
        {ratingFields.map(field => (
          <div key={field.name} className="mb-4">
            <label className="block text-gray-700 mb-2">{field.label}</label>
            {isClient && (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingChange(field.name, rating)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= formData[field.name]
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Recommendation */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Would you recommend our services?</label>
          {isClient && (
            <div className="flex gap-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, willRecommend: option }))}
                  className={`px-4 py-2 rounded border ${
                    formData.willRecommend === option
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email (Optional)</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border rounded"
            placeholder="your@email.com"
          />
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Additional Comments</label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
            className="w-full px-3 py-2 border rounded"
            rows={4}
            placeholder="Share your thoughts..."
          />
        </div>

        {message && (
          <div className={`p-3 rounded text-center ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Survey'}
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;