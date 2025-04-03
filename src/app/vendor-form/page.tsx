// src/app/vendor/submission/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';
const VendorSubmissionForm = dynamic(() => import('../components/VendorSubmissionForm'), {
  ssr: false
});

const VendorSubmissionPage = async () => {
  return (
    <>
      <VendorSubmissionForm />
    </>
  );
};

export default VendorSubmissionPage;