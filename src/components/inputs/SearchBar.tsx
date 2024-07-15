/**
 * @module SearchBar
 * @description A search bar component
 */
import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * @typedef SearchBarProps
 * @property {string} searchQuery - The search query
 * @property {(query: string) => void} setSearchQuery - Function to set the search query
 */
type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

/**
 * A search bar component
 * @param {SearchBarProps} props - The component properties
 */
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup
      size="sm"
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        bg="white"
        boxShadow="md"
        textColor="black" 
        _placeholder={{ color: 'gray.500' }}
        size="sm"
      />
    </InputGroup>
  );
};

export { SearchBar}
