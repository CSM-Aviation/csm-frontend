'use client'
import React, { useEffect, useRef } from 'react';
import styles from './JetInsight1.module.scss';

const JetInsightComponent: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://client.jetinsight.com/embed/126d130e-be91-4071-a8dc-2f94b609c239/Web-Request.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (buttonRef.current && modalRef.current && iframeRef.current) {
        buttonRef.current.addEventListener('click', () => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'cta_button_click',
            category: 'conversion',
            label: 'REQUEST_QUOTE'
          });
          iframeRef.current!.src = "https://client.jetinsight.com/embed/csm-aviation/Web-Request?";
          modalRef.current!.style.display = "block";
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const closeModal = () => {
    if (iframeRef.current) iframeRef.current.src = "";
    if (modalRef.current) modalRef.current.style.display = "none";
  };

  return (
    <>
      <div className={styles.jetInsightOut}>
        <button
          ref={buttonRef}
          id="jetinsight-embedded-request-open-button"
          className={styles.jetinsightEmbeddedRequestButton}
        >
          SCHEDULE TRIP
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="currentColor"
            style={{ 
              marginLeft: '8px',
              transition: 'transform 0.3s ease'
            }}
            className={styles.buttonArrow}
          >
            <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.44 8.5H2.75a.75.75 0 0 1 0-1.5h8.69L8.22 4.03a.75.75 0 0 1 0-1.06Z"/>
          </svg>
        </button>
      </div>
      <div id="jetinsight-embedded-request-modal" ref={modalRef} className={styles.jetinsightEmbeddedRequestModal}>
        <button
          id="jetinsight-embedded-request-close-button"
          className={styles.closeButton}
          onClick={closeModal}
        >
          Close
        </button>
        <iframe
          ref={iframeRef}
          id="jetinsight-embedded-request-iframe"
          className={styles.modalIframe}
        ></iframe>
      </div>
    </>
  );
};

export default JetInsightComponent;