'use client'
import React, { useState, useEffect, FormEvent } from 'react';
import { apiService, SurveySubmission } from '../services/apiService';
import { Star } from 'lucide-react';


interface RatingField {
  name: keyof Pick<SurveySubmission, 'bookingEfficiency' | 
    'aircraftCleanliness' | 'cabinComfort' | 'crewProfessionalism' | 'overallSatisfaction'>;
  label: string;
}

const SurveyForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<SurveySubmission>({
    fullName: '',
    bookingEfficiency: 0,
    aircraftCleanliness: 0,
    cabinComfort: 0,
    crewProfessionalism: 0,
    overallSatisfaction: 0,
    willRecommend: 'Yes',
    email: '',
    comments: '',
    _id:'',
    approved:false,
    submittedAt:''
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
        fullName: '',
        bookingEfficiency: 0,
        aircraftCleanliness: 0,
        cabinComfort: 0,
        crewProfessionalism: 0,
        overallSatisfaction: 0,
        willRecommend: 'Yes',
        email: '',
        comments: '',
        _id:'',
        approved:false,
        submittedAt:''
      });
    } catch (error) {
      setMessage('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingFields: RatingField[] = [
    { name: 'bookingEfficiency', label: 'Booking Efficiency' },
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#004080] mb-4">Flight Experience Survey</h1>
          <p className="text-gray-600">We value your feedback to continuously improve our services</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg space-y-8">
          {/* Full Name Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

           {/* Email */}
           <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          {/* Rating Fields */}
          <div className="space-y-8">
            {ratingFields.map(field => (
              <div key={field.name} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-semibold">{field.label}</label>
                  {isClient && (
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(field.name, rating)}
                          className="p-2 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
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
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <label className="block text-gray-700 font-semibold mb-3">
            Would you recommend our services and would you be willing to share your experience on our website?
            </label>
            {isClient && (
              <div className="flex gap-4 justify-center text-black">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, willRecommend: option }))}
                    className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                      formData.willRecommend === option
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

         

          {/* Comments */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Testimonial</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Share your flight experience..."
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center ${
              message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#004080] text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;