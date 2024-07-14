// src/components/NoteItem.tsx

import React from 'react';
import { Box, Text, IconButton, Stack, Badge, Wrap, Tag } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

type NoteItemProps = {
  note: string;
  category: string;
  timestamp: string;
  tags: string[];
  onRemove: () => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, category, timestamp, tags, onRemove }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" padding={4} marginBottom={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Badge colorScheme="green">{category}</Badge>
        <IconButton
          aria-label="Remove note"
          icon={<CloseIcon />}
          size="sm"
          colorScheme="red"
          onClick={onRemove}
        />
      </Stack>
      <Text marginTop={2}>{note}</Text>
      <Text fontSize="sm" color="gray.500" marginTop={2}>{timestamp}</Text>
      <Wrap spacing={2} marginTop={2}>
        {tags.map(tag => (
          <Tag key={tag} size="sm" borderRadius="full" variant="solid" colorScheme="blue">
            {tag}
          </Tag>
        ))}
      </Wrap>
    </Box>
  );
};

export default NoteItem;
