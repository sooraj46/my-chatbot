import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    } else {
      const name = prompt("What's your name?");
      localStorage.setItem('userName', name);
      setUserName(name);
    }
  }, []);

  const handleSendMessage = async (newMessage) => {
    const userMessage = { text: newMessage, sender: 'user' };
    setMessages(messages => [...messages, userMessage]);

    try {
      const response = await fetch('http://127.0.0.1:5000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage, userName: userName })
        //credentials: 'include' // Include cookies with the request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { text: data.text, sender: 'bot' };
      setMessages(messages => [...messages, botMessage]);

    } catch (error) {
      console.error("Failed to send message to the API", error);
      setMessages(messages => [...messages, { text: "Failed to get response from the server.", sender: 'bot' }]);
    }
  };

  return (
    <div className="app-container">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
