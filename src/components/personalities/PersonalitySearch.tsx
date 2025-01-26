import React from 'react';
import { Search } from 'lucide-react';

interface PersonalitySearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

function PersonalitySearch({ searchTerm, onSearch }: PersonalitySearchProps) {
  return (
    <section className="py-8 bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une personnalité..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </section>
  );
}

export default PersonalitySearch;