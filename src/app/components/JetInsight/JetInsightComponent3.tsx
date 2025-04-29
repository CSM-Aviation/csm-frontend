'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './JetInsight2.module.scss';

const JetInsightComponent: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const script = document.createElement('script');
    script.src =
      'https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/Web-Request.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Set iframe src when modal is shown
  useEffect(() => {
    if (showModal && iframeRef.current) {
      // Small delay to ensure the modal is rendered before setting src
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = 'https://client.jetinsight.com/embed/csm-aviation/Web-Request?';
        }
      }, 100);
    }
  }, [showModal]);

  const openModal = () => {
    // Push custom event to dataLayer for Schedule Trip
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cta_button_click',
      category: 'conversion',
      label: 'SCHEDULE_TRIP',
    });
    setShowModal(true);
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 120);
  };

  const closeModal = () => {
    if (iframeRef.current) {
      iframeRef.current.src = '';
    }
    setShowModal(false);
    document.body.style.overflow = '';
  };

  // Modal component that will be portaled
  const ModalPortal = () => {
    if (!showModal) return null;
    
    return (
      <div className={styles.jetinsightEmbeddedRequestModal}>
        <div className={styles.modalOverlay} onClick={closeModal}></div>
        <div className={styles.modalContent}>
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
            title="JetInsight Request Form"
            allow="geolocation"
          ></iframe>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`${styles.jetInsightOut} flex md:translate-y-0 translate-y-6 flex-row flex-nowrap w-full gap-1 p-3 md:p-none`}
      >
        <button
          ref={buttonRef}
          id='jetinsight-embedded-request-open-button'
          onClick={openModal}
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

      {/* Use createPortal to render the modal outside the current component hierarchy */}
      {mounted && createPortal(<ModalPortal />, document.body)}
    </>
  );
};

export default JetInsightComponent;