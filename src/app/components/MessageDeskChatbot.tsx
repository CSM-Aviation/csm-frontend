'use client';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

// Declare the global MessageDeskChatbot type
declare global {
  interface Window {
    MessageDeskChatbot?: {
      open: () => void;
    };
  }
}

interface MessageDeskControllerProps {
  shouldHide?: boolean;
}

const MessageDeskController: React.FC<MessageDeskControllerProps> = ({ shouldHide = false }) => {

  const pathname = usePathname();
  // Hide on homepage (when pathname is just '/')
  const isHomepage = pathname === '/';
  const shouldHideComponent = shouldHide || isHomepage;

  useEffect(() => {

    if (shouldHideComponent) {
      return
    }

    const script = document.createElement('script');
    script.src = "https://api.snapdesk.app/chatbot?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidGVuYW50X2lkIjoxOTc4MCwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMDVUMjM6MjQ6MjkuOTg4NDI2WiJ9.DAUXkHvLFzYsW-xcuoO6U2hEHUMplZTzYwyjc8Q-NVw";
    script.async = true;
    document.body.appendChild(script);



    return () => {
      document.body.removeChild(script);
    };
  }, [shouldHideComponent]);

  const openChatbot = () => {
    if (window.MessageDeskChatbot) {
      window.MessageDeskChatbot.open();
    }
  };

  if (shouldHideComponent) {
    return null
  }

  return (
    <button
      onClick={openChatbot}
      className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
      aria-label="Open chat"
    >
      <FontAwesomeIcon icon={faComments} />
    </button>
  );
};

export default MessageDeskController;