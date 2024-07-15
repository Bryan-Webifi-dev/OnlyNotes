/**
 * @module NoteItem
 * @description A single note item
 */
import React from 'react';
import { Box, Text, Stack, Wrap, Tag } from '@chakra-ui/react';

/**
 * @typedef NoteItemProps
 * @property {string} note - The note text
 * @property {string} timestamp - The timestamp
 * @property {string[]} tags - The tags
 * @property {() => void} onClick - Function to handle click event
 * @returns {JSX.Element}
 */
type NoteItemProps = {
  note: string;
  timestamp: string;
  tags: string[];
  onClick: () => void;
};

/**
 * A single note item
 * @param {NoteItemProps} props - The component properties
 */
const NoteItem: React.FC<NoteItemProps> = ({ note, timestamp, tags, onClick }) => {
  return (
    <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" padding={4} boxShadow="md" onClick={onClick} cursor="pointer"
      _hover={{ borderColor: 'gray.500', boxShadow: 'lg' }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {tags.map(tag => (
          <Tag key={tag} size="sm" borderRadius="full" variant="solid" colorScheme="blue" boxShadow="md">
            {tag}
          </Tag>
        ))}
      </Stack>
      <Text marginTop={2}>{note}</Text>
      <Text fontSize="sm" color="gray.500" marginTop={2}>{timestamp}</Text>
      <Wrap spacing={2} marginTop={2}>
      </Wrap>
    </Box>
  );
};

export { NoteItem };
