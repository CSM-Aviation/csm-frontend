import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

// Declare the global MessageDeskChatbot type
declare global {
  interface Window {
    MessageDeskChatbot?: {
      open: () => void;
    };
  }
}

const MessageDeskChatbot: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://api.snapdesk.app/chatbot?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidGVuYW50X2lkIjoxOTc4MCwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMDVUMjM6MjQ6MjkuOTg4NDI2WiJ9.DAUXkHvLFzYsW-xcuoO6U2hEHUMplZTzYwyjc8Q-NVw";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openChatbot = () => {
    if (window.MessageDeskChatbot) {
      window.MessageDeskChatbot.open();
    }
  };

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

export default MessageDeskChatbot;