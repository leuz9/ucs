import React from 'react';
import { Search } from 'lucide-react';

interface UserSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

function UserSearch({ searchTerm, onSearch }: UserSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Rechercher un contact..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}

export default UserSearch;