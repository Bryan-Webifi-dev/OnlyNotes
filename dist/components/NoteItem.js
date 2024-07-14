// src/components/NoteItem.tsx
import React from 'react';
import { Box, Text, IconButton, Stack, Badge, Wrap, Tag } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
const NoteItem = ({ note, category, timestamp, tags, onRemove }) => {
    return (React.createElement(Box, { borderWidth: "1px", borderRadius: "lg", padding: 4, marginBottom: 2 },
        React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between" },
            React.createElement(Badge, { colorScheme: "green" }, category),
            React.createElement(IconButton, { "aria-label": "Remove note", icon: React.createElement(CloseIcon, null), size: "sm", colorScheme: "red", onClick: onRemove })),
        React.createElement(Text, { marginTop: 2 }, note),
        React.createElement(Text, { fontSize: "sm", color: "gray.500", marginTop: 2 }, timestamp),
        React.createElement(Wrap, { spacing: 2, marginTop: 2 }, tags.map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: "blue" }, tag))))));
};
export default NoteItem;
