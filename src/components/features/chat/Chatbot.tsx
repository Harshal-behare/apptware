import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isDark: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Chatbot = ({ isDark, isOpen, setIsOpen }: ChatbotProps) => {
  const chatbotRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AgroCare assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatbotRef.current && 
        !chatbotRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button')?.classList.contains('chatbot-toggle')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      text: input,
      isBot: false,
      timestamp: new Date()
    }]);

    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand your concern. Based on the symptoms you described, it could be a fungal infection. I recommend checking the leaves for any discoloration and applying an organic fungicide as a first step. Would you like more specific advice?",
        isBot: true,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg chatbot-toggle ${
          isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors z-50`}
      >
        <Bot size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          ref={chatbotRef}
          className={`fixed bottom-20 right-4 w-96 h-[500px] rounded-2xl shadow-2xl z-50 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } flex flex-col overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
        >
          {/* Header */}
          <div className={`p-4 ${isDark ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-500 to-blue-600'} rounded-t-2xl`}>
            <div className="flex items-center space-x-3">
              <Bot className="text-white" size={24} />
              <div>
                <h3 className="text-white font-medium">AgroCare Assistant</h3>
                <p className="text-blue-100 text-sm">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 ${
                  message.isBot
                    ? isDark 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-100 text-gray-800'
                    : 'bg-blue-600 text-white'
                } shadow-md`}>
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={`flex-1 p-3 rounded-xl border ${
                  isDark
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
              />
              <button
                onClick={handleSend}
                className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;