import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Personality } from '../../types/personalities';

interface PersonalityModalProps {
  personality: Personality;
  onClose: () => void;
}

function PersonalityModal({ personality, onClose }: PersonalityModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl max-w-2xl mx-4 overflow-hidden"
      >
        <div className="relative h-96">
          <img
            src={personality.image}
            alt={personality.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {personality.name}
          </h3>
          <p className="text-blue-600 font-medium mb-4">
            {personality.role}
          </p>
          <p className="text-gray-600">
            {personality.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default PersonalityModal;