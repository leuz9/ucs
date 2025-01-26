import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AuthInputProps {
  id: string;
  type: string;
  label: string;
  error?: string;
  Icon: LucideIcon;
  register: any;
  validation?: object;
}

export default function AuthInput({ id, type, label, error, Icon, register, validation }: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="mt-1 relative">
        <input
          id={id}
          type={type}
          {...register(id, validation)}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/80"
        />
        <Icon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}