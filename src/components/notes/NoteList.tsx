/**
 * @module NoteList
 * @description Displays a list of notes
 */
import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import { NoteItem } from './NoteItem';

/**
 * @typedef NoteListProps
 * @property {{ note: string; timestamp: string; tags: string[] }[]} notes - The list of notes
 * @property {(note: string, tags: string[]) => void} onNoteClick - Function to handle note click event
 * @returns {JSX.Element}
 */
type NoteListProps = {
  notes: { note: string; timestamp: string; tags: string[] }[];
  onNoteClick: (note: string, tags: string[]) => void;
};

/**
 * Displays a list of notes
 * @param {NoteListProps} props - The component properties
 */
const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick }) => {
  if (notes.length === 0) {
    return <Box textAlign="center" color="gray.500">No notes available. Add a note to get started!</Box>;
  }

  return (
    <SimpleGrid columns={2} spacing={4} p="6">
      {notes.map((note, index) => (
        <NoteItem
          key={index}
          note={note.note}
          timestamp={note.timestamp}
          tags={note.tags}
          onClick={() => onNoteClick(note.note, note.tags)}
        />
      ))}
    </SimpleGrid>
  );
};

export { NoteList };
