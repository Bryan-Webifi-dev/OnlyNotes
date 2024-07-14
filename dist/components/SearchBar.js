// src/components/SearchBar.tsx
import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (React.createElement(InputGroup, null,
        React.createElement(InputLeftElement, { pointerEvents: "none" },
            React.createElement(SearchIcon, { color: "gray.300" })),
        React.createElement(Input, { type: "text", placeholder: "Search notes...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })));
};
export default SearchBar;
