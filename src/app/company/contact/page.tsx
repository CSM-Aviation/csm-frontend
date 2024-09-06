import React from 'react';
import { NextPage } from 'next';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactPage: NextPage = () => {
  return (
    <div className="w-full">
      <ContactForm />
      <ContactInfo />
    </div>
  );
};

export default ContactPage;