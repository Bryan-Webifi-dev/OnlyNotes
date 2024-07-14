import React from 'react';
import { Box, Text, Stack, Badge, Wrap, Tag } from '@chakra-ui/react';
const NoteItem = ({ note, category, timestamp, tags, folder, onClick }) => {
    return (React.createElement(Box, { borderWidth: "1px", borderColor: "gray.300", borderRadius: "lg", padding: 4, boxShadow: "md", onClick: onClick, cursor: "pointer" },
        React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between" },
            React.createElement(Badge, { colorScheme: "green" }, category),
            React.createElement(Badge, { colorScheme: "purple" }, folder)),
        React.createElement(Text, { marginTop: 2 }, note),
        React.createElement(Text, { fontSize: "sm", color: "gray.500", marginTop: 2 }, timestamp),
        React.createElement(Wrap, { spacing: 2, marginTop: 2 }, tags.map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: "blue", boxShadow: "md" }, tag))))));
};
export default NoteItem;
