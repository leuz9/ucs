import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types/messaging';

interface UserListProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

function UserList({ users, selectedUser, onSelectUser }: UserListProps) {
  return (
    <div className="overflow-y-auto h-[calc(600px-73px)]">
      {users.map((user) => (
        <motion.div
          key={user.uid}
          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
          onClick={() => onSelectUser(user)}
          className={`p-4 cursor-pointer border-b ${
            selectedUser?.uid === user.uid ? 'bg-blue-50' : ''
          }`}
        >
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
        </motion.div>
      ))}
    </div>
  );
}

export default UserList;