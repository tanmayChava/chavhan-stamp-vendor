import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Scale, Sparkles } from 'lucide-react';
import { chatWithLegalAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your AI Legal Assistant. Ask me about documents, stamp duty, or requirements.\n\nनमस्कार! मी तुमचा AI कायदेशीर मदतनीस आहे. मला कागदपत्रांबद्दल किंवा स्टॅम्प ड्युटीबद्दल विचारा.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
        const historyForApi = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const resultStream = await chatWithLegalAssistant(historyForApi, userMsg);
        
        let responseText = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);
        
        for await (const chunk of resultStream) {
             const text = chunk.text;
             if (text) {
                responseText += text;
                setMessages(prev => {
                    const newArr = [...prev];
                    newArr[newArr.length - 1].text = responseText;
                    return newArr;
                });
             }
        }
    } catch (error) {
        console.error("Chat error", error);
        setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I encountered a temporary issue. Please try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 group z-50 transition-all duration-300 ease-out ${
          isOpen ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
        }`}
      >
        <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity rounded-full animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:-translate-y-1 transition-transform">
           <MessageSquare className="w-7 h-7" />
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-100 animate-fade-in-up overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                  <h3 className="font-bold text-sm">AI Legal Assistant</h3>
                  <div className="flex items-center text-[10px] text-indigo-100 opacity-90">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                      Online
                  </div>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about a document / प्रश्न विचारा..."
                className="w-full pl-4 pr-12 py-3 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl transition-all outline-none text-slate-800 placeholder-slate-400 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-indigo-600 hover:text-indigo-800 disabled:opacity-30 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
             <div className="text-[10px] text-slate-400 mt-2 text-center">
                AI information is for reference. Contact us for legal drafts.
             </div>
          </div>
        </div>
      )}
    </>
  );
};