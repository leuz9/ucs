import React from 'react';
import { motion } from 'framer-motion';
import { Personality } from '../../types/personalities';

interface PersonalityCardProps {
  personality: Personality;
  index: number;
  onClick: () => void;
}

function PersonalityCard({ personality, index, onClick }: PersonalityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-80">
        <img
          src={personality.image}
          alt={personality.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">{personality.name}</h3>
          <p className="text-gray-200">{personality.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default PersonalityCard;