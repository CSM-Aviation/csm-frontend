'use client'

import React, { useEffect } from 'react';
import Script from 'next/script';

const JetInsightLink: React.FC = () => {
  useEffect(() => {
    if (window.JetInsight && typeof window.JetInsight.init === 'function') {
      window.JetInsight.init();
    }
  }, []);

  return (
    <>
      <Script
        src="https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/Web-Request.js"
        strategy="lazyOnload"
      />
      <div>
        <a
          href="https://www.jetinsight.com/"
          id="jetinsight-embedded-request-link"
          className="p-0 m-0"
        >
          {/* <button
            id="jetinsight-embedded-request-open-button"
            className="jetinsight-embedded-request-button items-center appearance-none bg-[#d2d25122] rounded px-4 py-2 text-gray-800 font-bold shadow-md hover:shadow-lg transition duration-300 ease-in-out text-lg lg:text-xl"
          >
            Request a quote
          </button> */}
          <img
            className="p-0 m-0 h-0 w-0"
            src="https://cdn.jetinsight.com/images/jetinsight_powered.svg"
            title="Aircraft charter quoting and fleet management software"
            alt="Aircraft charter quoting and fleet management software"
          />
        </a>
      </div>
    </>
  );
};

export default JetInsightLink;