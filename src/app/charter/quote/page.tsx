import React from 'react';
import { NextPage } from 'next';

const QuotePage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Private Charter Quote</h1>
      <p>All final pricing is subject to crew availability and any flight restrictions that may be applicable given the requested route(s).  Custom quotes available.  </p>
    </div>
  );
};

export default QuotePage;