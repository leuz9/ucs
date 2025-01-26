import React from 'react';
import { Message } from '../../types/messaging';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 flex ${
            message.senderId === currentUserId ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${
              message.senderId === currentUserId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p>{message.content}</p>
            <p className={`text-xs mt-1 ${
              message.senderId === currentUserId
                ? 'text-blue-100'
                : 'text-gray-500'
            }`}>
              {new Date(message.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;