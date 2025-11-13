
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string, image: File | null) => void;
  isLoading: boolean;
  isChatStarted: boolean;
  setIsChatStarted: (started: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, isChatStarted, setIsChatStarted }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (isLoading) return;
    onSendMessage(text, image);
    setText('');
    setImage(null);
    setPreviewUrl(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsChatStarted(true);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFirstInput = () => {
    if (!isChatStarted) {
      setIsChatStarted(true);
    }
  };

  return (
    <div className={`w-full transition-all duration-700 ease-in-out ${isChatStarted ? 'mb-0' : 'absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 max-w-4xl px-4'}`}>
      <div className="bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-2 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
        {previewUrl && (
          <div className="relative inline-block m-2">
            <img src={previewUrl} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold border-2 border-black"
            >
              &times;
            </button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-cyan-300 transition-colors rounded-full shrink-0"
            aria-label="Attach image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={handleFirstInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask GP anything... Use /imagine to create images."
            className="w-full bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none max-h-48 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
            rows={1}
          />
          
          <button
            onClick={handleSend}
            disabled={isLoading || (!text.trim() && !image)}
            className="p-2 bg-cyan-500 text-black rounded-full transition-all duration-300 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed shrink-0"
            aria-label="Send message"
          >
            {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
