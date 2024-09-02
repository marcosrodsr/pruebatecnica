import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onSearchTermChange}
      placeholder="Buscar..."
      className="w-full p-2 border border-gray-400 rounded-md mb-4 bg-gray-900 text-white placeholder-gray-500"
    />
  );
};

export default SearchBar;
