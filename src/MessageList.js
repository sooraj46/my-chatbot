import React from 'react';
import './Message.css'; // Make sure you create this CSS file for message styling.

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
          {message.text} {/* Render the text of the message */}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
