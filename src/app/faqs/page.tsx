'use client'

import { NextPage } from 'next';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, FileText, Plane, DollarSign, LucideIcon, MapPin, Calendar, Users, Clock, Shield, Briefcase, Phone } from 'lucide-react';

interface FAQItemData {
  icon: LucideIcon;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItemData[] = [
    {
      icon: Globe,
      question: "What services does CSM Aviation offer?",
      answer: "CSM Aviation specializes in private jet charter and aircraft management services throughout the western U.S., Canada, and Mexico. We offer a diverse fleet of aircraft to suit various travel needs, from light jets to large cabin aircraft.",
      category: "About CSM Aviation"
    },
    {
      icon: FileText,
      question: "What is the difference between aircraft charter and aircraft management?",
      answer: "Aircraft charter allows you to rent an aircraft for a specific trip, while aircraft management involves us overseeing all aspects of owning and operating your aircraft, including maintenance, crew management, and flight scheduling.",
      category: "About CSM Aviation"
    },
    {
      icon: MapPin,
      question: "Where is CSM Aviation based?",
      answer: "While we serve the western U.S., Canada, and Mexico, our headquarters is located in Fresno, CA, USA.",
      category: "About CSM Aviation"
    },
    {
      icon: Plane,
      question: "How do I book a private jet charter?",
      answer: "You can request a quote online through our website or contact our charter team directly by phone or email. Our team will assist you in selecting the right aircraft for your needs and planning your itinerary.",
      category: "Private Jet Charter"
    },
    {
      icon: Calendar,
      question: "What information do I need to provide for a charter quote?",
      answer: "To provide an accurate quote, we'll need to know your departure and arrival airports, travel dates, number of passengers, and any special requests you may have.",
      category: "Private Jet Charter"
    },
    {
      icon: Clock,
      question: "What are the benefits of flying private?",
      answer: "Flying private offers numerous advantages, including time savings, increased flexibility, enhanced privacy, and personalized service. You can avoid the hassles of commercial travel and enjoy a more comfortable and efficient travel experience.",
      category: "Private Jet Charter"
    },
    {
      icon: Users,
      question: "Can I travel with my pet?",
      answer: "Yes, pets are welcome on most of our charter flights. Please inform us in advance so we can make the necessary arrangements.",
      category: "Private Jet Charter"
    },
    {
      icon: DollarSign,
      question: "What is your cancellation policy?",
      answer: "Our cancellation policy varies depending on the aircraft and itinerary. Please review the specific terms and conditions in your charter agreement.",
      category: "Private Jet Charter"
    },
    {
      icon: Plane,
      question: "What types of aircraft do you manage?",
      answer: "We manage a wide range of aircraft, from turboprops to large cabin jets.",
      category: "Aircraft Management"
    },
    {
      icon: Briefcase,
      question: "What are the benefits of aircraft management?",
      answer: "Aircraft management services can help you reduce operating costs, maximize aircraft utilization, and ensure the highest safety standards for your aircraft.",
      category: "Aircraft Management"
    },
    {
      icon: FileText,
      question: "How can I learn more about your aircraft management services?",
      answer: "You can find detailed information on our website or contact our aircraft management team directly.",
      category: "Aircraft Management"
    },
    {
      icon: Shield,
      question: "What safety measures do you have in place?",
      answer: "Safety is our top priority. We adhere to rigorous safety standards and maintain our aircraft to the highest industry standards. Our flight crews are experienced professionals with extensive training.",
      category: "Safety"
    },
    {
        icon: Phone,
        question: "How can I contact CSM Aviation?",
        answer: "You can reach us by phone at <a href='tel:+18884359276' class='text-blue-600 hover:underline'>(888) I-FLY-CSM</a>, by email at <a href='mailto:charter@csmaviation.com' class='text-blue-600 hover:underline'>charter@csmaviation.com</a>, or through the contact form on our website.",
        category: "Contact Information"
      }
  ];

interface FAQItemProps {
  icon: LucideIcon;
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ icon: Icon, question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <Icon className="w-6 h-6 mr-4 text-blue-600 flex-shrink-0" />
            <span className="text-lg font-medium text-gray-700">{question}</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-6 h-6 text-blue-600 flex-shrink-0" />
          )}
        </button>
        {isOpen && (
          <div className="mt-2 pl-10 pr-4 text-gray-600">
            {question === "How can I contact CSM Aviation?" ? (
              <div dangerouslySetInnerHTML={{ __html: answer }} />
            ) : (
              answer
            )}
          </div>
        )}
      </div>
    );
  };

const FAQ: NextPage = () => {
  const categories = Array.from(new Set(faqData.map(item => item.category)));
  const midpoint = Math.floor(categories.length / 2);
  const leftColumnCategories = categories.slice(0, midpoint);
  const rightColumnCategories = categories.slice(midpoint);

  const renderColumn = (columnCategories: string[]) => (
    <div className="space-y-8">
      {columnCategories.map(category => (
        <div key={category}>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">{category}</h2>
          <div className="space-y-4">
            {faqData.filter(item => item.category === category).map((item, index) => (
              <FAQItem key={index} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Frequently Asked Questions</h1>
      <div className="grid text-xl text-black grid-cols-1 md:grid-cols-2 gap-20">
        {renderColumn(leftColumnCategories)}
        {renderColumn(rightColumnCategories)}
      </div>
    </div>
  );
};

export default FAQ;