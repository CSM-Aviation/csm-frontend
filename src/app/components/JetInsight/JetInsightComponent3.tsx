'use client';

import React, { useEffect, useRef } from 'react';
import styles from './JetInsight2.module.scss';

const JetInsightComponent: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/Web-Request.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (buttonRef.current && modalRef.current && iframeRef.current) {
        buttonRef.current.addEventListener('click', () => {
          // Push custom event to dataLayer for Schedule Trip
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'cta_button_click',
            category: 'conversion',
            label: 'SCHEDULE_TRIP',
          });
          iframeRef.current!.src =
            'https://client.jetinsight.com/embed/csm-aviation/Web-Request?';
          modalRef.current!.style.display = 'block';
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const closeModal = () => {
    if (iframeRef.current) iframeRef.current.src = '';
    if (modalRef.current) modalRef.current.style.display = 'none';
  };

  return (
    <>
      <div
        className={`${styles.jetInsightOut} flex flex-row flex-nowrap w-full gap-1 p-3 md:p-none`}
      >
        <button
          ref={buttonRef}
          id='jetinsight-embedded-request-open-button'
          onClick={() => window.scrollTo(0, 120)}
          className={styles.jetinsightEmbeddedRequestButton}
        >
          SCHEDULE TRIP
          <div>
            <svg
              className='ml-2 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z' />
            </svg>
          </div>
        </button>
        <button className={`ml-1 ${styles.jetinsightEmbeddedRequestButton}`}>
          <a href='tel:+18884359276'>Call Now</a>
        </button>
      </div>

      <div
        id='jetinsight-embedded-request-modal'
        ref={modalRef}
        className={styles.jetinsightEmbeddedRequestModal}
      >
        <button
          id='jetinsight-embedded-request-close-button'
          className={styles.closeButton}
          onClick={closeModal}
        >
          Close
        </button>
        <iframe
          ref={iframeRef}
          id='jetinsight-embedded-request-iframe'
          className={styles.modalIframe}
        ></iframe>
      </div>
    </>
  );
};

export default JetInsightComponent;
