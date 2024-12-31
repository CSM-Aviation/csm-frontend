'use client'
import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { apiService, SurveySubmission } from '../services/apiService'

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<SurveySubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiService.getSurveys()
        if (response.error) {
          throw new Error(response.error)
        }
        
        // Filter for approved testimonials with comments
        const approvedTestimonials = response.data?.filter(survey => 
          survey.approved && survey.comments.trim().length > 0
        ) || []

        setTestimonials(approvedTestimonials)
      } catch (err) {
        setError('Failed to load testimonials')
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (loading) {
    return <div className="text-center py-20">Loading testimonials...</div>
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-center pb-5 text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-[#004080]">
            Client Testimonials
          </h2>
          <p className="text-sm md:text-xl lg:text-2xl font-bold text-center text-gray-400">
            Hear what our clients have to say about their experience
          </p>
        </div>
        
        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ translateX: '-50%' }}
            animate={{ translateX: '0' }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
            className="flex gap-5 pr-5 flex-none"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial._id}-${index}`}
                className="border border-[#004080]/20 p-6 md:p-10 rounded-xl bg-gradient-to-bl from-[#004080]/30 to-[#004080]/5 max-w-xs md:max-w-md flex-none backdrop-blur-sm"
              >
                <div className="flex flex-col mb-4">
                  <div className="text-lg font-medium text-[#004080]">
                    {testimonial.fullName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(testimonial.submittedAt).toLocaleDateString()}
                  </div>
                </div>
                <blockquote>
                <p className="text-gray-700 text-lg italic leading-relaxed mb-4">
                    &ldquo;{testimonial.comments}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= testimonial.overallSatisfaction
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {testimonial.overallSatisfaction}/5
                    </span>
                  </div>
                </blockquote>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials