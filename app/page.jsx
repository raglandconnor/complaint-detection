'use client'; // This directive enables client-side rendering for the component

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, type: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');

    // Mock API call
    const responseMessage = await mockApiCall(input);
    setMessages([...messages, userMessage, responseMessage]);
  };

  const mockApiCall = async (userInput) => {
    // Simulate an API call to OpenAI
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ text: `Echo: ${userInput}`, type: 'bot' }), 1000)
    );
    return response;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[70%] ${
                message.type === 'user'
                  ? 'bg-blue-600 self-end'
                  : 'bg-gray-700 self-start'
              }`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </div>
      </div>
      <div className="flex border-t border-gray-700 bg-gray-800 p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
