// src/components/SearchBar.tsx
import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (React.createElement(InputGroup, { size: "sm" },
        React.createElement(InputLeftElement, { pointerEvents: "none" },
            React.createElement(SearchIcon, { color: "gray.300" })),
        React.createElement(Input, { type: "text", placeholder: "Search notes...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), bg: "white", boxShadow: "md", textColor: "black", _placeholder: { color: 'gray.500' }, size: "sm" })));
};
export default SearchBar;
