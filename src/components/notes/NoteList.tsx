/**
 * @module NoteList
 * @description Displays a list of notes
 */
import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import { NoteItem } from './NoteItem';

/**
 * @typedef NoteListProps
 * @property {{ note: string; category: string; timestamp: string; tags: string[]; folder: string }[]} notes - The list of notes
 * @property {(note: string, category: string, tags: string[], folder: string) => void} onNoteClick - Function to handle note click event
 * @returns {JSX.Element}
 */
type NoteListProps = {
  notes: { note: string; category: string; timestamp: string; tags: string[]; folder: string }[];
  onNoteClick: (note: string, category: string, tags: string[], folder: string) => void;
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
    <SimpleGrid columns={2} spacing={4}>
      {notes.map((note, index) => (
        <NoteItem
          key={index}
          note={note.note}
          category={note.category}
          timestamp={note.timestamp}
          tags={note.tags}
          folder={note.folder}
          onClick={() => onNoteClick(note.note, note.category, note.tags, note.folder)}
        />
      ))}
    </SimpleGrid>
  );
};

export { NoteList }; 
