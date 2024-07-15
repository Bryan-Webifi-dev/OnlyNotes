/**
 * @module NoteItem
 * @description A single note item
 */
import React from 'react';
import { Box, Text, Stack, Badge, Wrap, Tag } from '@chakra-ui/react';

/**
 * @typedef NoteItemProps
 * @property {string} note - The note text
 * @property {string} category - The category
 * @property {string} timestamp - The timestamp
 * @property {string[]} tags - The tags
 * @property {string} folder - The folder
 * @property {() => void} onClick - Function to handle click event
 * @returns {JSX.Element}
 */
type NoteItemProps = {
  note: string;
  category: string;
  timestamp: string;
  tags: string[];
  folder: string;
  onClick: () => void;
};

/**
 * A single note item
 * @param {NoteItemProps} props - The component properties
 */
const NoteItem: React.FC<NoteItemProps> = ({ note, category, timestamp, tags, folder, onClick }) => {
  return (
    <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" padding={4} boxShadow="md" onClick={onClick} cursor="pointer">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Badge colorScheme="green">{category}</Badge>
        <Badge colorScheme="purple">{folder}</Badge>
      </Stack>
      <Text marginTop={2}>{note}</Text>
      <Text fontSize="sm" color="gray.500" marginTop={2}>{timestamp}</Text>
      <Wrap spacing={2} marginTop={2}>
        {tags.map(tag => (
          <Tag key={tag} size="sm" borderRadius="full" variant="solid" colorScheme="blue" boxShadow="md">
            {tag}
          </Tag>
        ))}
      </Wrap>
    </Box>
  );
};

export { NoteItem };

