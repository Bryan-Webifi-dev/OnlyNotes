import React from 'react';
import { Box, Text, IconButton, HStack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

type NoteItemProps = {
  note: string;
  category: string;
  onRemove: () => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, category, onRemove }) => {
  return (
    <HStack spacing={4} align="center" justify="space-between" borderBottom="1px solid #ddd" py={2}>
      <Text fontWeight="bold" color="teal.500">{category}:</Text>
      <Text flex={1} pl={2} wordBreak="break-word">{note}</Text>
      <IconButton
        aria-label="Remove note"
        icon={<CloseIcon />}
        size="sm"
        colorScheme="red"
        onClick={onRemove}
      />
    </HStack>
  );
};

export default NoteItem;
