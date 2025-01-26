import React from 'react';
import { User } from '../../types/messaging';

interface ConversationHeaderProps {
  user: User;
}

function ConversationHeader({ user }: ConversationHeaderProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            {user.firstName[0]}{user.lastName[0]}
          </span>
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ConversationHeader;