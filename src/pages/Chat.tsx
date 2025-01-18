import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Bot, Send, Image as ImageIcon, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useDropzone } from 'react-dropzone';

interface ChatPageProps {
  isDark: boolean;
}

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
  image?: string;
}

const Chat: React.FC<ChatPageProps> = ({ isDark }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hello! I'm your AgroCare assistant. I can help you with farming queries and analyze crop images. How can I assist you today?",
    isBot: true,
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response: string;

      if (selectedImage) {
        // Handle image analysis with Gemini Vision
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        
        // Convert base64 to ImagePart
        const imageData = selectedImage.split(',')[1];
        const imageBytes = Uint8Array.from(atob(imageData), c => c.charCodeAt(0));
        
        const result = await model.generateContent([
          input || "Analyze this crop image and provide detailed information about any visible issues, diseases, or health conditions.",
          {
            inlineData: {
              data: imageBytes,
              mimeType: "image/jpeg"
            }
          }
        ]);
        
        response = result.response.text();
        setSelectedImage(null);
      } else {
        // Handle text-only queries with Gemini Pro
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are an agricultural expert assistant. Please help with this farming query: ${input}`;
        const result = await model.generateContent(prompt);
        response = result.response.text();
      }

      setMessages(prev => [...prev, {
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "I apologize, but I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className={`rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} min-h-[80vh] flex flex-col`}>
        {/* Header */}
        <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-t-lg`}>
          <div className="flex items-center space-x-3">
            <Bot className={`${isDark ? 'text-white' : 'text-gray-800'}`} size={24} />
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                AgroCare Assistant
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {isLoading ? 'Thinking...' : 'Online'}
              </p>
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
                  : 'bg-green-600 text-white'
              }`}>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="Uploaded crop"
                    className="max-w-full h-auto rounded-lg mb-2"
                  />
                )}
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="px-4 pb-2">
            <div className="relative inline-block">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="h-20 w-auto rounded"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-b-lg`}>
          <div className="flex space-x-2">
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <button
                type="button"
                className={`p-3 rounded-xl ${
                  isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'
                } hover:opacity-80 transition-opacity`}
              >
                <ImageIcon size={20} />
              </button>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className={`flex-1 p-3 rounded-xl border ${
                isDark
                  ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 placeholder-gray-500'
              } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none`}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`p-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 