'use client'
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Building, DollarSign, Users, Plane, ChevronRight, Search, ChevronDown, X, ExternalLink } from 'lucide-react';

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
  workLocation: string;
  workFlexibility: string;
  skills: string[];
}

interface FilterState {
  team: string;
  workLocation: string;
  workFlexibility: string;
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
    workLocation: 'Remote',
    workFlexibility: 'Part-time',
    skills: ['Adobe Creative Suite', 'Social Media', 'Video Editing', 'Graphic Design'],
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
    posted: '2025-01-20'
  },
  {
    id: '2',
    title: 'Flight Coordinator',
    company: 'CSM Aviation',
    location: 'Fresno, CA',
    type: 'Full-time',
    salary: 'Competitive salary',
    department: 'Operations',
    workLocation: 'On-site',
    workFlexibility: 'Full-time',
    skills: ['Office 365', 'Customer Service', 'Aviation Operations', 'Communication'],
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
    posted: '2025-01-20'
  },
  {
    id: '3',
    title: 'Private Jet Pilot (Captain/First Officer)',
    company: 'CSM Aviation',
    location: 'Fresno, CA',
    type: 'Full-time',
    salary: 'Competitive salary',
    department: 'Operations',
    workLocation: 'Travel',
    workFlexibility: 'Full-time',
    skills: ['ATP Certificate', 'Aviation', 'Safety', 'Customer Service'],
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
      'Comprehensive health insurance',
      '401(k) retirement plan with company matching',
      'Paid time off and holiday pay (double pay for holiday work)',
      'Company-provided uniforms and travel equipment',
      'Professional development opportunities and career advancement',
      'Exposure to luxury aviation industry and networking opportunities'
    ],
    posted: '2025-01-20'
  }
];

export default function CareersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = {
    team: ['All', 'Marketing', 'Operations'],
    workLocation: ['All', 'Remote', 'On-site', 'Travel'],
    workFlexibility: ['All', 'Full-time', 'Part-time', 'Hybrid']
  };

  const [filters, setFilters] = useState<FilterState>({
    team: 'All',
    workLocation: 'All',
    workFlexibility: 'All'
  });

  const [dropdownStates, setDropdownStates] = useState({
    team: false,
    workLocation: false,
    workFlexibility: false
  });

  // Enhanced search and filter logic
  const filteredJobs = useMemo(() => {
    return jobListings.filter(job => {
      // Text search logic
      const searchLower = searchQuery.toLowerCase();
      const textMatch = !searchQuery || 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.overview.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        job.responsibilities.some(resp => resp.toLowerCase().includes(searchLower)) ||
        job.requirements.some(req => req.toLowerCase().includes(searchLower));

      // Filter logic
      const teamMatch = filters.team === 'All' || job.department === filters.team;
      const locationMatch = filters.workLocation === 'All' || job.workLocation === filters.workLocation;
      const flexibilityMatch = filters.workFlexibility === 'All' || job.workFlexibility === filters.workFlexibility;

      return textMatch && teamMatch && locationMatch && flexibilityMatch;
    });
  }, [searchQuery, filters]);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setDropdownStates({
        team: false,
        workLocation: false,
        workFlexibility: false
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setDropdownStates(prev => ({
      ...prev,
      [filterType]: false
    }));
  };

  const toggleDropdown = (dropdown: keyof typeof dropdownStates, event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownStates(prev => ({
      team: false,
      workLocation: false,
      workFlexibility: false,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleJobClick = (jobId: string) => {
    router.push(`/company/careers/${jobId}`);
  };

  const handleApplyClick = (e: React.MouseEvent, jobId?: string) => {
    e.stopPropagation();
    window.open("https://form.jotform.com/252066358425156", "_blank");
  };

  const clearFilters = () => {
    setFilters({
      team: 'All',
      workLocation: 'All',
      workFlexibility: 'All'
    });
    setSearchQuery('');
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== 'All').length;

  // CSM Blue color
  const csmBlue = '#2563eb';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-gray-900 text-white overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2484&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              CSM Aviation Career Center
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8">
              Shape the future of luxury aviation with innovative solutions and exceptional service
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by job title, skills, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-12 flex items-center pr-3"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button 
                  style={{ backgroundColor: csmBlue }}
                  className="hover:opacity-90 text-white p-3 rounded-full transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown('team', e)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full transition-colors"
              >
                <span>Team{filters.team !== 'All' && `: ${filters.team}`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownStates.team ? 'rotate-180' : ''}`} />
              </button>

              {dropdownStates.team && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-50">
                  {filterOptions.team.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange('team', option)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${filters.team === option ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={(e) => toggleDropdown('workLocation', e)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full transition-colors"
              >
                <span>Where You Work{filters.workLocation !== 'All' && `: ${filters.workLocation}`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownStates.workLocation ? 'rotate-180' : ''}`} />
              </button>

              {dropdownStates.workLocation && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-50">
                  {filterOptions.workLocation.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange('workLocation', option)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${filters.workLocation === option ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={(e) => toggleDropdown('workFlexibility', e)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full transition-colors"
              >
                <span>Work Flexibility{filters.workFlexibility !== 'All' && `: ${filters.workFlexibility}`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownStates.workFlexibility ? 'rotate-180' : ''}`} />
              </button>

              {dropdownStates.workFlexibility && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-50">
                  {filterOptions.workFlexibility.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange('workFlexibility', option)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${filters.workFlexibility === option ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {(activeFiltersCount > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm border border-red-300/20 text-red-200 px-6 py-3 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-gray-300">
              {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found
              {(searchQuery || activeFiltersCount > 0) && ` matching your criteria`}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or clearing filters
            </p>
            <button
              onClick={clearFilters}
              style={{ backgroundColor: csmBlue }}
              className="hover:opacity-90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredJobs.length} Position{filteredJobs.length !== 1 ? 's' : ''} Available
              </h2>
            </div>

            <div className="grid gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job.id)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg lg:text-xl flex-1 hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span 
                            style={{ backgroundColor: `${csmBlue}20`, color: csmBlue }}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {job.workFlexibility}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {job.department}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
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
                      </div>

                      <p className="text-sm lg:text-base text-gray-600 mb-3 line-clamp-2">
                        {job.overview}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-700 border">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-700 border">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        Posted {new Date(job.posted).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[150px]">
                      <button
                        onClick={() => handleJobClick(job.id)}
                        className="flex-1 lg:w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                      <button
                        onClick={(e) => handleApplyClick(e, job.id)}
                        style={{ backgroundColor: csmBlue }}
                        className="flex-1 lg:w-full hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}