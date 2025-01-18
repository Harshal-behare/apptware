import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your agricultural assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm processing your question. Our AI assistant will provide guidance on crop management and disease prevention.",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <section id="chat-assistant" className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Agricultural Chat Assistant</h2>

      <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
        <div className="flex items-center p-4 border-b">
          <Bot className="h-6 w-6 text-green-600 mr-2" />
          <span className="font-medium text-gray-800">AgroBot</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crop management, diseases, or best practices..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChatAssistant;