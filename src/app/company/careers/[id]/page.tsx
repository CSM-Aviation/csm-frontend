'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Clock, Building, DollarSign, Users, Plane, CheckCircle, ChevronLeft, Share2, Bookmark, Calendar } from 'lucide-react';

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

// This would typically come from your API/database
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

export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const csmBlue = '#2563eb';

    useEffect(() => {
        // In a real application, you would fetch job data from an API
        const jobId = params.id as string;
        const foundJob = jobListings.find(j => j.id === jobId);

        if (foundJob) {
            setJob(foundJob);
        }
        setLoading(false);
    }, [params.id]);

    const handleApplyClick = () => {
        window.open("https://form.jotform.com/252066358425156", "_blank");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${job?.title} - CSM Aviation`,
                    text: `Check out this job opportunity: ${job?.title} at CSM Aviation`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Job link copied to clipboard!');
        }
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        // In a real app, you would save this to user's saved jobs
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
                    <p className="text-gray-600 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <button
                        onClick={() => router.push('/company/careers')}
                        style={{ backgroundColor: csmBlue }}
                        className="hover:opacity-90 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        // give extra space above header
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <button
                            onClick={() => router.push('/company/careers')}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Back to Careers
                        </button>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleSave}
                                className={`p-2 rounded-lg transition-colors ${isSaved
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>

                            <button
                                onClick={handleShare}
                                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleApplyClick}
                                style={{ backgroundColor: csmBlue }}
                                className="hover:opacity-90 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
                            {/* Job Header */}
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {job.workLocation}
                                    </span>
                                    <span
                                        style={{ backgroundColor: `${csmBlue}20`, color: csmBlue }}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {job.workFlexibility}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                        {job.department}
                                    </span>
                                </div>

                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    {job.title}
                                </h1>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <Building className="w-5 h-5 mr-2" />
                                        <span className="font-medium">{job.company}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-5 h-5 mr-2" />
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center text-green-600 font-semibold">
                                        <DollarSign className="w-5 h-5 mr-1" />
                                        <span>{job.salary}</span>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Posted on {new Date(job.posted).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>

                            {/* Job Overview */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Overview</h2>
                                <div className="prose prose-lg text-gray-700">
                                    <p className="mb-4">{job.overview}</p>
                                    <p>{job.description}</p>
                                </div>
                            </section>

                            {/* Key Skills */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {job.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 border"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Responsibilities */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((responsibility, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{responsibility}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Requirements */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
                                <ul className="space-y-3">
                                    {job.requirements.map((requirement, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle style={{ color: csmBlue }} className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Preferred Qualifications */}
                            {job.preferredQualifications.length > 0 && (
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Preferred Qualifications</h2>
                                    <ul className="space-y-3">
                                        {job.preferredQualifications.map((qualification, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{qualification}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Benefits */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
                                <ul className="space-y-3">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Apply Section */}
                            <div className="border-t border-gray-200 pt-8">
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Apply?</h3>
                                    <p className="text-gray-600 mb-4">
                                        Join our team and be part of the luxury aviation industry.
                                    </p>
                                    <button
                                        onClick={handleApplyClick}
                                        style={{ backgroundColor: csmBlue }}
                                        className="hover:opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                                    >
                                        Apply for this Position
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 mt-8 lg:mt-0">
                        <div className="space-y-6">
                            {/* Quick Apply Card */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Apply</h3>
                                <div className="space-y-4">
                                    <button
                                        onClick={handleApplyClick}
                                        style={{ backgroundColor: csmBlue }}
                                        className="w-full hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                                    >
                                        Apply Now
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className={`w-full border font-medium py-3 px-4 rounded-lg transition-colors ${isSaved
                                                ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {isSaved ? 'Saved' : 'Save Job'}
                                    </button>
                                </div>
                            </div>

                            {/* Job Summary */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Summary</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Department</dt>
                                        <dd className="text-sm text-gray-900">{job.department}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Work Location</dt>
                                        <dd className="text-sm text-gray-900">{job.workLocation}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Work Type</dt>
                                        <dd className="text-sm text-gray-900">{job.workFlexibility}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Employment Type</dt>
                                        <dd className="text-sm text-gray-900">{job.type}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Posted Date</dt>
                                        <dd className="text-sm text-gray-900">
                                            {new Date(job.posted).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Company Info */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">About CSM Aviation</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    CSM Aviation is a premier private jet charter company specializing in luxury aviation services.
                                    We provide exceptional flight experiences for high-net-worth individuals and corporate clients.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>Fresno, California</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>Aviation & Aerospace</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Plane className="w-4 h-4 mr-2" />
                                        <span>Private Jet Charter</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}