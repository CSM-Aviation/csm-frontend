"use client";
import React, { useState } from 'react';
import { MapPin, Clock, Building, DollarSign, Users, Plane, CheckCircle, Link, ChevronLeft, Menu } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  benefits: string[];
  posted: string;
  department: string;
}

const jobListings: Job[] = [
  {
    id: '1',
    title: 'Graphic Designer and Social Media Manager',
    company: 'CSM Aviation',
    location: 'Remote/Hybrid',
    type: 'Part-time',
    salary: 'Competitive salary',
    department: 'Marketing',
    overview: 'Join our marketing team and help promote exclusive private jet charter services. Create compelling visual content that captures the sophistication and premium nature of luxury aviation.',
    description: 'Work independently under our Marketing Manager while bringing fresh creative solutions to showcase our fleet across multiple channels.',
    responsibilities: [
      'Design promotional materials including posters, brochures, flyers, and business cards',
      'Create digital advertisements and social media content for luxury aviation services',
      'Edit and produce marketing videos showcasing aircraft, destinations, and services',
      'Develop animated graphics and motion content for social platforms',
      'Design email templates, newsletters, and website graphics',
      'Ensure all materials align with brand guidelines and luxury positioning',
      'Maintain consistent visual identity across print and digital applications'
    ],
    requirements: [
      '1-2 years graphic design experience (internships and freelance work count)',
      'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign required)',
      'Video editing experience with Adobe Premiere Pro, After Effects, or similar',
      'Strong portfolio demonstrating creative design skills and versatility',
      'Understanding of design principles, typography, and color theory',
      'Knowledge of social media platform specifications and best practices',
      "Bachelor's degree in Graphic Design, Visual Arts, or related field preferred",
      'Strong attention to detail and ability to meet deadlines',
      'Understanding of luxury brand aesthetics'
    ],
    preferredQualifications: [
      'Experience with social media management and content creation',
      'Familiarity with luxury brands or high-end service industries',
      'Basic photography skills for content creation',
      'Knowledge of current design trends and digital marketing practices'
    ],
    benefits: [
      'Flexible part-time schedule perfect for work-life balance',
      'Creative freedom to contribute innovative ideas',
      'Professional development in luxury aviation industry',
      'Portfolio-building opportunities with high-end marketing materials',
      'Collaborative work environment with supportive team',
      'Exposure to luxury travel industry and networking opportunities'
    ],
    posted: '2025-07-20'
  },
  {
    id: '2',
    title: 'Flight Coordinator',
    company: 'CSM Aviation',
    location: 'Fresno, CA',
    type: 'Part-time/Full-time',
    salary: 'Competitive salary',
    department: 'Operations',
    overview: 'CSM Aviation seeks a Private Air Charter Coordinator to join our operations team. Serve as logistics and scheduling representative for part 91 and part 135 flight operations.',
    description: 'Act as primary contact for crew coordination and assist with private charter bookings while handling various administrative duties in a fast-paced aviation environment.',
    responsibilities: [
      'Coordinate flight crew rotations and travel logistics for assignments',
      'Handle phone reception and provide customer service to high-net-worth clients',
      'Process flight documents and perform data entry tasks',
      'Schedule and coordinate private charter and owner part 91 bookings',
      'Manage email correspondence and client communications',
      'Assist operations team with administrative tasks and documentation',
      'Ensure seamless coordination of travel experiences for crew and clients',
      'Meet tight deadlines in fast-paced work environment'
    ],
    requirements: [
      'Proficiency in Office 365 and Google Workspace/Suite/Drive required',
      'Exceptional verbal and written communication skills',
      'Strong organizational skills with ability to prioritize and multitask',
      'Ability to work with minimal supervision',
      'Comfortable working with high-net-worth clients',
      'Valid driver\'s license and reliable transportation',
      'Bachelor\'s degree preferred, will consider equivalent work experience'
    ],
    preferredQualifications: [
      'Knowledge of Jet Insight, Schedaro, or Avinode software',
      'Familiarity with aircraft operations',
      'Previous experience in aviation or luxury service industry',
      'Customer service experience with high-end clientele'
    ],
    benefits: [
      'Competitive salary and benefits package',
      'Professional development opportunities in aviation industry',
      'Dynamic work environment with growth potential',
      'Opportunity to work with luxury aviation services'
    ],
    posted: '2025-07-20'
  },
  {
    id: '3',
    title: 'Private Jet Pilot (Captain/First Officer)',
    company: 'CSM Aviation',
    location: 'Fresno, CA',
    type: 'Full-time',
    salary: 'Competitive salary',
    department: 'Operations',
    overview: 'CSM Aviation seeks experienced and professional pilots to join our elite flight operations team. Operate state-of-the-art private aircraft for high-net-worth individuals and corporate clients.',
    description: 'Maintain the highest standards of safety, service, and professionalism. Serve as both Part 91 and Part 135 operations pilot providing exceptional luxury aviation experiences across domestic and international destinations.',
    responsibilities: [
      'Safely operate private aircraft in accordance with FAA regulations and company procedures',
      'Conduct thorough pre-flight planning including weather analysis, flight planning, and fuel calculations',
      'Execute flights under Part 91 (private) and Part 135 (charter) operations as assigned',
      'Maintain professional demeanor and provide white-glove service to high-profile clientele',
      'Coordinate with operations team for scheduling, crew assignments, and flight logistics',
      'Ensure compliance with all regulatory requirements including duty time limitations',
      'Perform aircraft inspections and maintain accurate flight records and logbooks',
      'Communicate effectively with air traffic control and ground personnel',
      'Handle unexpected situations with professionalism and sound judgment',
      'Maintain aircraft security and confidentiality standards for VIP passengers',
      'Coordinate with maintenance personnel for aircraft airworthiness requirements',
      'Participate in recurrent training and maintain all required certifications'
    ],
    requirements: [
      'Airline Transport Pilot (ATP) certificate with appropriate category and class ratings',
      'Current First Class Medical Certificate',
      'Type rating on company aircraft (training provided for qualified candidates)',
      'Instrument rating and multi-engine rating required',
      'Valid passport and ability to travel internationally',
      'Clean driving record and ability to pass comprehensive background check',
      'Professional appearance and excellent communication skills',
      'Flexibility for irregular schedules and on-call availability',
      'Bachelor\'s degree preferred or equivalent aviation experience'
    ],
    preferredQualifications: [
      'Part 135 experience with charter or corporate aviation background',
      'Experience with high-net-worth clientele and luxury service standards',
      'Familiarity with international flight operations and customs procedures',
      'Knowledge of advanced avionics systems (Garmin G1000/G5000, Collins Pro Line, etc.)',
      'Previous corporate flight department experience',
      'Additional type ratings on business jets',
      'Flight instructor experience or check airman qualifications',
      'Crew Resource Management (CRM) training'
    ],
    benefits: [
      'Flexible scheduling with rotation options (8 days on/6 days off or 15 days on/13 days off)',
      'Home-based position with company-provided positioning flights',
      'Comprehensive health, dental, and vision insurance',
      '401(k) retirement plan with company matching',
      'Paid time off and holiday pay (double pay for holiday work)',
      'Per diem allowances: $75/day domestic, $120/day international',
      'Company-provided uniforms and travel equipment',
      'Type rating training and recurrent training fully paid',
      'Known Crewmember (KCM) badge and medical exam reimbursement',
      'Professional development opportunities and career advancement',
      'Exposure to luxury aviation industry and networking opportunities'
    ],
    posted: '2025-07-20'
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job>(jobListings[0]);
  const [showJobList, setShowJobList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on component mount and window resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowJobList(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setShowJobList(false);
  };

  const handleApplyClick = () => {
    window.open("https://form.jotform.com/252066358425156", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#002040] to-[#004080] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4">
              CSM Aviation Career Center
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto px-2">
              Shape the future of luxury aviation with innovative solutions and exceptional service
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Job Selector Button */}
        {isMobile && (
          <div className="mb-4">
            <button
              onClick={() => setShowJobList(!showJobList)}
              className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between"
            >
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  {selectedJob.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {selectedJob.location} • {selectedJob.type}
                </p>
              </div>
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        )}

        {/* Mobile Job List Overlay */}
        {isMobile && showJobList && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Available Positions ({jobListings.length})
                </h2>
                <button
                  onClick={() => setShowJobList(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {jobListings.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobSelect(job)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedJob.id === job.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                      {job.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                        {job.location}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.department}
                        </span>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {job.overview}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Desktop Job Listings Sidebar */}
          <div className="hidden lg:block w-1/3 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {jobListings.length} Jobs Available
              </h2>
              
              <div className="space-y-3">
                {jobListings.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedJob.id === job.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                        {job.company}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        {job.location}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                        {job.salary}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.department}
                        </span>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                      {job.overview}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
              {/* Job Header */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {selectedJob.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
                  <div className="flex items-center text-gray-600 text-sm sm:text-base">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {selectedJob.type}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center text-base sm:text-lg font-semibold text-green-600">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                    {selectedJob.salary}
                  </div>
                  <button 
                    className="bg-[#002040] hover:bg-[#004080] text-white font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded-lg transition-colors duration-300 text-sm sm:text-base"
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Job Overview */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Job Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  {selectedJob.overview}
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {selectedJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Responsibilities</h2>
                <ul className="space-y-2 sm:space-y-3">
                  {selectedJob.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Requirements</h2>
                <ul className="space-y-2 sm:space-y-3">
                  {selectedJob.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preferred Qualifications */}
              {selectedJob.preferredQualifications.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Preferred Qualifications</h2>
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedJob.preferredQualifications.map((qualification, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Benefits</h2>
                <ul className="space-y-2 sm:space-y-3">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <button 
                  className="w-full bg-[#002040] hover:bg-[#004080] text-white font-semibold py-3 sm:py-4 px-4 sm:px-8 rounded-lg transition-colors duration-300 text-base sm:text-lg"
                  onClick= {handleApplyClick}
                >
                  Apply for this Position
                </button>
                <p className="text-center text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm">
                  Posted on {new Date(selectedJob.posted).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}