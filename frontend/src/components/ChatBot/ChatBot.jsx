import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatbotResponses } from './chatbotResponses';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! How can I help you learn about our gopexi platform?' }
  ]);
  const [input, setInput] = useState('');

  const findBestMatch = (input) => {
    const userQuery = input.toLowerCase();
    
    // Direct matches
    const directMatch = Object.keys(chatbotResponses).find(key => 
      userQuery.includes(key.toLowerCase())
    );
    
    if (directMatch) return directMatch;
    
    // Handle variations of "what is" questions
    if (userQuery.includes('what is') || userQuery.includes('what\'s')) {
      if (userQuery.includes('gopex')) return 'what is gopex';
    }
    
    // Handle questions about specific features
    if (userQuery.includes('wallet')) return 'wallet';
    if (userQuery.includes('card')) return 'card';
    if (userQuery.includes('exchange')) return 'platform';
    
    return null;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    // Find best matching response
    const matchingTopic = findBestMatch(input);

    // Add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: matchingTopic 
          ? chatbotResponses[matchingTopic]
          : "I'm not sure about that. Would you like to know about Gopex's exchange platform, multi-currency wallet, or our upcoming card feature? You can also ask about our rates, security, or supported currencies."
      }]);
    }, 500);

    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-96 bg-gray-800 rounded-xl shadow-xl z-50"
          >
            {/* Chat header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-white font-medium">gopexi Assistant</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Chat messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our services..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 