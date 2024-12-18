import React, { useState, useEffect } from 'react';
import { apiService, SurveySubmission } from '@/app/services/apiService';
import { Loader2, Star, CheckCircle, XCircle, Filter } from 'lucide-react';

const TestimonialsTab = () => {
  const [testimonials, setTestimonials] = useState<SurveySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'approved', 'pending'
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await apiService.get<SurveySubmission[]>('/api/surveys/all');
      if (response.data) {
        setTestimonials(response.data);
      }
    } catch (error) {
      setMessage('Error fetching testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalToggle = async (id: string, newStatus: boolean) => {
    try {
      const response = await apiService.put(`/api/surveys/${id}/approval`, {
        approved: newStatus
      });
      if (response.data) {
        setTestimonials(prev =>
          prev.map(testimonial =>
            testimonial._id === id
              ? { ...testimonial, approved: newStatus }
              : testimonial
          )
        );
        setMessage(`Testimonial ${newStatus ? 'approved' : 'rejected'} successfully`);
      }
    } catch (error) {
      setMessage('Error updating testimonial status');
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (filter === 'approved') return testimonial.approved === true;
    if (filter === 'pending') return testimonial.approved === null;
    if (filter === 'rejected') return testimonial.approved === false;
    return true;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Testimonial Management</h2>
        <div className="flex items-center gap-4">
          <Filter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Testimonials</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-700">{message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {testimonial.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(testimonial.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprovalToggle(testimonial._id, true)}
                  className={`p-2 rounded-full ${
                    testimonial.approved === true
                      ? 'bg-green-100 text-green-600'
                      : 'hover:bg-green-100 text-gray-400'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleApprovalToggle(testimonial._id, false)}
                  className={`p-2 rounded-full ${
                    testimonial.approved === false
                      ? 'bg-red-100 text-red-600'
                      : 'hover:bg-red-100 text-gray-400'
                  }`}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 font-medium">Booking Efficiency</p>
                {renderStars(testimonial.bookingEfficiency)}
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Aircraft Cleanliness</p>
                {renderStars(testimonial.aircraftCleanliness)}
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Cabin Comfort</p>
                {renderStars(testimonial.cabinComfort)}
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Crew Professionalism</p>
                {renderStars(testimonial.crewProfessionalism)}
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Overall Satisfaction</p>
                {renderStars(testimonial.overallSatisfaction)}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 font-medium">Comments</p>
              <p className="text-sm text-gray-700 mt-1">{testimonial.comments}</p>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Will Recommend: {testimonial.willRecommend}
              </span>
              <span className={`px-3 py-1 rounded-full ${
                testimonial.approved === true
                  ? 'bg-green-100 text-green-700'
                  : testimonial.approved === false
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {testimonial.approved === true
                  ? 'Approved'
                  : testimonial.approved === false
                  ? 'Rejected'
                  : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No testimonials found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default TestimonialsTab;