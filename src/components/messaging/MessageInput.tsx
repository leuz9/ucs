import React from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSubmit: (data: { message: string }) => Promise<void>;
}

function MessageInput({ onSubmit }: MessageInputProps) {
  const { register, handleSubmit, reset } = useForm();

  const handleSubmitMessage = async (data: any) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitMessage)} className="flex space-x-3">
      <input
        type="text"
        {...register('message', { required: true })}
        placeholder="Écrivez votre message..."
        className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}

export default MessageInput;