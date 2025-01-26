import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AuthButtonProps {
  type: 'submit' | 'button';
  Icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function AuthButton({ type, Icon, children, onClick }: AuthButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
    >
      <Icon className="h-5 w-5 mr-2" />
      {children}
    </motion.button>
  );
}