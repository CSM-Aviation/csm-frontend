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
          className={`shiny-button px-6 py-4 max-sm:p-3 max-sm:rounded-md text-white`}
        >
           REQUEST QUOTE
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