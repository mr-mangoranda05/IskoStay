import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageSquare, X, Send, Bot, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: 'Maayong adlaw! 🌸 Welcome to IskoStay Support. I am Aliyah, your student helper. Are you looking for a secure bed space or cottage near MSU Main Gate, or are you a landlord needing NBI verification?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputText,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Dynamic Simulated Support Agent replies based on keywords
    setTimeout(() => {
      let replyText = "That's great! Our Al-Noor Cottage is highly recommended. It has high-speed Wi-Fi, CCTV, and is a simple 3-minute walk to the Main Gate. Would you like me to book a quick site visit with landlord Haji Ahmad Ali?";
      
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('price') || lower.includes('cheap') || lower.includes('how much') || lower.includes('rent')) {
        replyText = "Our bed spaces start as low as ₱800/month (like Al-Noor Cottage A). We also have spacious single rooms with private bathrooms starting at ₱1,800/month! All rates are fully protected by our escrow guarantee.";
      } else if (lower.includes('landlord') || lower.includes('verify') || lower.includes('nbi') || lower.includes('register')) {
        replyText = "To register, head over to the 'List Accommodation' tab! Upload your NBI clearance and our team will perform an on-site audit within 48 hours to grant your 'IskoVerified' badge!";
      } else if (lower.includes('room') || lower.includes('roommate') || lower.includes('match') || lower.includes('find')) {
        replyText = "Try out our RoomieMatch tab! You can fill out your student habits and Major (e.g., Computer Science, Engineering), and find compatible co-living partners near campus instantly.";
      } else if (lower.includes('safety') || lower.includes('safe') || lower.includes('secure')) {
        replyText = "Safety is our absolute #1 priority. Every listed cottage undergoes physical inspections, has strict landlord NBI clearance checks, and we encourage dorms with 24/7 CCTV surveillance.";
      }

      const agentReply: Message = {
        sender: 'agent',
        text: replyText,
        time: 'Just now'
      };

      setMessages((prev) => [...prev, agentReply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end" id="chat-support-widget">
      {/* Expanded Chatbox Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] max-w-[380px] sm:w-96 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[480px] sm:h-[500px]">
          
          {/* Header of Chatbox */}
          <div className="bg-violet-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-left">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-violet-800 flex items-center justify-center font-bold border border-violet-700">
                  A
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-violet-950" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-wider uppercase">Aliyah (IskoStay Support)</h4>
                <p className="text-[10px] text-violet-300 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span>Verified Agent • Online</span>
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-violet-900/40 p-1 text-violet-200 hover:text-white cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50"
            id="chat-messages"
          >
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed text-left ${
                    msg.sender === 'user' 
                      ? 'bg-violet-800 text-white rounded-br-none shadow-xs' 
                      : 'bg-white text-gray-700 rounded-bl-none shadow-sm border border-gray-100'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-violet-300' : 'text-gray-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none p-3 border border-gray-100 shadow-sm flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-100" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input
              type="text"
              required
              placeholder="Ask about pricing, safety, or verification..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
            />
            <button
              type="submit"
              className="rounded-xl bg-violet-800 p-2 text-white hover:bg-violet-700 transition-colors flex items-center justify-center cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Trigger Button exactly matching image color */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 rounded-full bg-[#D97706] hover:bg-[#B45309] px-5 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
        id="chat-toggle-btn"
      >
        <MessageSquare className="h-5 w-5 fill-white text-transparent stroke-white" />
        <span className="text-sm font-extrabold tracking-wide">Chat Support</span>
      </button>
    </div>
  );
}
