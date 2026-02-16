"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { apiService, SurveySubmission } from "../services/apiService";

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<SurveySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiService.getSurveys();
        if (response.error) {
          throw new Error(response.error);
        }

        const approvedTestimonials =
          response.data?.filter(
            (survey) => survey.approved && survey.comments.trim().length > 0
          ) || [];

        setTestimonials(approvedTestimonials);
      } catch (err) {
        setError("Failed to load testimonials");
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-10">
            <div className="h-10 bg-neutral-200 rounded-lg w-64 mx-auto" />
            <div className="flex gap-6 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex-none w-72 md:w-96 bg-neutral-100 rounded-2xl p-6 space-y-4"
                >
                  <div className="h-4 bg-neutral-200 rounded w-1/2" />
                  <div className="h-3 bg-neutral-200 rounded w-1/3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-200 rounded w-full" />
                    <div className="h-3 bg-neutral-200 rounded w-5/6" />
                    <div className="h-3 bg-neutral-200 rounded w-4/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-csm-navy">
            Client Testimonials
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-normal text-center mt-3">
            Hear what our clients have to say about their experience
          </p>
        </motion.div>
      </div>

      {/* Marquee - full width for edge-to-edge effect */}
      <Marquee
        pauseOnHover={true}
        speed={40}
        gradient={true}
        gradientColor="white"
        gradientWidth={80}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white border border-neutral-200 p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm max-w-[280px] sm:max-w-xs md:max-w-sm flex-none mx-3"
          >
            {/* Header */}
            <div className="flex flex-col mb-3">
              <div className="text-base sm:text-lg font-semibold text-csm-navy">
                {testimonial.fullName}
              </div>
              <div className="text-xs sm:text-sm text-neutral-400">
                {new Date(testimonial.submittedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Quote */}
            <blockquote>
              <p className="text-sm sm:text-base text-neutral-600 italic leading-relaxed mb-4 line-clamp-4">
                &ldquo;{testimonial.comments}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= testimonial.overallSatisfaction
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-neutral-200 fill-neutral-200"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-neutral-400">
                  {testimonial.overallSatisfaction}/5
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Testimonials;
