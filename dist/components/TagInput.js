// src/components/TagInput.tsx
import React, { useState } from 'react';
import { Input, Box, IconButton, Tag, TagLabel, TagCloseButton, Wrap } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
const TagInput = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState('');
    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };
    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };
    return (React.createElement(Box, null,
        React.createElement(Input, { placeholder: "Add a tag", value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: (e) => e.key === 'Enter' && addTag(), bg: "white", boxShadow: "md", textColor: "black", _placeholder: { color: 'gray.500' } }),
        React.createElement(IconButton, { icon: React.createElement(AddIcon, null), onClick: addTag, marginTop: 2, "aria-label": '' }),
        React.createElement(Wrap, { spacing: 2, marginTop: 2 }, tags.map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: "blue", boxShadow: "md" },
            React.createElement(TagLabel, null, tag),
            React.createElement(TagCloseButton, { onClick: () => removeTag(tag) })))))));
};
export default TagInput;
