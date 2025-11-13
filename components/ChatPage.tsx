import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Message, MessageRole } from '../types';
import { generateText, generateTextWithImage, generateImage } from '../services/geminiService';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import Logo from './Logo';
import type { GenerateContentResponse } from "@google/genai";

const ChatPage: React.FC = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // New state for search
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to bottom when new messages arrive, but not when searching
      if(!searchTerm) {
          chatContainerRef.current.scrollTop = 0;
      }
    }
  }, [messages, searchTerm]);

  const handleSendMessage = useCallback(async (text: string, image: File | null) => {
    if (!text.trim() && !image) return;

    setIsChatStarted(true);
    setSearchTerm(''); // Clear search on new message

    const userMessage: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: text,
      imageUrl: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages(prev => [userMessage, ...prev]);
    setIsLoading(true);
    
    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [{ id: aiMessageId, role: MessageRole.AI, text: '', isGenerating: true }, ...prev]);

    try {
      let response: GenerateContentResponse | null = null;
      let imageUrl: string | null = null;
      let responseText: string = "";

      if (text.toLowerCase().startsWith('/imagine ')) {
        const prompt = text.substring(8).trim();
        if (prompt) {
          imageUrl = await generateImage(prompt);
          responseText = `Image generated for: "${prompt}"`;
        } else {
            responseText = "Please provide a prompt after /imagine.";
        }
      } else if (image) {
        response = await generateTextWithImage(text, image);
        responseText = response.text;
      } else {
        response = await generateText(text);
        responseText = response.text;
      }

      const finalAiMessage: Message = {
        id: aiMessageId,
        role: MessageRole.AI,
        text: responseText,
        imageUrl: imageUrl || undefined,
      };
      
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? finalAiMessage : msg));

    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage: Message = {
        id: aiMessageId,
        role: MessageRole.AI,
        text: "Sorry, I encountered an error. Please try again.",
      };
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? errorMessage : msg));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openContact = (type: 'email' | 'whatsapp') => {
    if (type === 'email') {
      window.open('mailto:pantane254@gmail.com', '_blank');
    } else {
      const message = encodeURIComponent("Hi Pantane, I discovered GP and love your work!");
      window.open(`https://wa.me/254740312402?text=${message}`, '_blank');
    }
  };

  const displayedMessages = useMemo(() => {
    if (!searchTerm) {
      return messages;
    }
    return messages.filter(msg => 
      msg.text && msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none [box-shadow:inset_0_0_120px_60px_black,0_0_80px_rgba(0,255,255,0.3)]"></div>
      
       {isChatStarted && (
        <header className="flex items-center justify-between p-4 border-b border-cyan-500/20 z-20 flex-shrink-0 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Logo small />
            <h1 className="font-orbitron text-xl text-white">GP</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => openContact('email')} className="text-gray-400 hover:text-cyan-300 transition-colors text-sm hidden md:block">Email Creator</button>
            <button onClick={() => openContact('whatsapp')} className="text-gray-400 hover:text-cyan-300 transition-colors text-sm hidden md:block">WhatsApp</button>
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)} 
              className="p-2 text-gray-400 hover:text-cyan-300 transition-colors rounded-full"
              aria-label="Search conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </header>
      )}

      <main className="flex flex-col flex-1 w-full max-w-4xl mx-auto p-4 z-10 overflow-hidden">
        {!isChatStarted ? (
          <div className="flex flex-col items-center justify-center flex-1 h-full animate-fade-in">
            <Logo />
            <h1 className="text-6xl font-orbitron font-bold text-white mt-4">GP</h1>
            <p className="text-cyan-300 text-lg mt-2 tracking-widest">Think. Create. See.</p>
          </div>
        ) : (
          <>
            {isSearchVisible && (
              <div className="relative mb-4 animate-fade-in-down flex-shrink-0">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search conversation..."
                  className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg py-2 pl-10 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  autoFocus
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                 <button 
                    onClick={() => {setSearchTerm(''); setIsSearchVisible(false);}}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label="Close search"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                 </button>
              </div>
            )}
            <div ref={chatContainerRef} className="flex-1 flex flex-col-reverse overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {searchTerm && displayedMessages.length === 0 && (
                <div className="text-center text-gray-400 my-8">
                  <p>No messages found for "{searchTerm}"</p>
                </div>
              )}
              <div className="flex flex-col gap-6">
                {displayedMessages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              </div>
            </div>
          </>
        )}
        
        <div className={`mt-auto pt-4 transition-all duration-700 ease-in-out ${isChatStarted ? 'opacity-100' : 'opacity-0 -translate-y-10'}`}>
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} isChatStarted={isChatStarted} setIsChatStarted={setIsChatStarted} />
        </div>

        {!isChatStarted &&
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-gray-500 text-xs">
                <p>Created by Pantane</p>
                <div className="flex gap-4 justify-center mt-1">
                    <button onClick={() => openContact('email')} className="hover:text-cyan-300 transition-colors">Email</button>
                    <button onClick={() => openContact('whatsapp')} className="hover:text-cyan-300 transition-colors">WhatsApp</button>
                </div>
            </div>
        }
      </main>
    </div>
  );
};

export default ChatPage;