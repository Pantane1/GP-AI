
import React from 'react';
import { Message, MessageRole } from '../types';
import Logo from './Logo';

interface ChatMessageProps {
  message: Message;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center justify-center space-x-1">
        <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse-fast [animation-delay:0.1s]"></div>
        <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse-fast [animation-delay:0.2s]"></div>
        <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse-fast [animation-delay:0.3s]"></div>
    </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  const containerClasses = `flex gap-3 animate-fade-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`;
  const bubbleClasses = `w-fit max-w-full md:max-w-[80%] rounded-2xl p-4 text-white ${
    isUser
      ? 'bg-cyan-800/50 rounded-br-none'
      : 'bg-gray-800/70 rounded-bl-none'
  }`;
  
  const renderContent = () => (
    <>
      {message.imageUrl && (
        <img
          src={message.imageUrl}
          alt={isUser ? "User upload" : "AI generated"}
          className="rounded-lg max-w-xs mb-2"
        />
      )}
      {message.text && (
        <p className="whitespace-pre-wrap">{message.text}</p>
      )}
      {message.isGenerating && <LoadingIndicator />}
    </>
  );

  return (
    <div className={containerClasses}>
      <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-full h-full bg-gray-600 flex items-center justify-center rounded-full text-sm font-bold">
            U
          </div>
        ) : (
          <div className="w-full h-full"><Logo small /></div>
        )}
      </div>
      <div className={bubbleClasses}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatMessage;
