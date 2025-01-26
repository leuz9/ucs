import React from 'react';
import PersonalityCard from './PersonalityCard';
import { Personality } from '../../types/personalities';

interface PersonalityGridProps {
  personalities: Personality[];
  onSelectPersonality: (personality: Personality) => void;
}

function PersonalityGrid({ personalities, onSelectPersonality }: PersonalityGridProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalities.map((personality, index) => (
            <PersonalityCard
              key={personality.id}
              personality={personality}
              index={index}
              onClick={() => onSelectPersonality(personality)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PersonalityGrid;