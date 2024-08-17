'use client';
import ChatInterface from './chat-interface';

export default function Chat() {
  const initialMessage = `test chat interface`;
  const apiEndpoint = '/api/openai';
  const messageColors = {
    user: 'bg-green-700',
    assistant: 'bg-gray-700',
  };

  return (
    <ChatInterface
      initialMessage={initialMessage}
      apiEndpoint={apiEndpoint}
      messageColors={messageColors}
    />
  );
}
