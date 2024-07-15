/**
 * @module NoteForm
 * @description Form for creating and updating notes
 */
import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, useColorModeValue, Textarea, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { TagInput } from '../inputs';

/**
 * @typedef NoteFormProps
 * @property {(note: string, tags: string[]) => void} saveNote - Function to save a note
 * @property {(oldNote: string, newNote: string, tags: string[]) => void} updateNote - Function to update a note
 * @property {string} [note=''] - The note text
 * @property {string[]} [tags=[]] - The tags
 * @property {() => void} onClose - Function to close the form
 * @property {() => void} [deleteNote] - Function to delete the note
 * @returns {JSX.Element}
 */
type NoteFormProps = {
  saveNote: (note: string, tags: string[]) => void;
  updateNote: (oldNote: string, newNote: string, tags: string[]) => void;
  note?: string;
  tags?: string[];
  onClose: () => void;
  deleteNote?: () => void;
};

/**
 * Form for creating and updating notes
 * @param {NoteFormProps} props - The component properties
 * @returns {JSX.Element}
 */
const NoteForm: React.FC<NoteFormProps> = ({ saveNote, updateNote, note = '', tags = [], onClose, deleteNote }) => {
  const [noteText, setNoteText] = useState(note);
  const [noteTags, setNoteTags] = useState<string[]>(tags);
  const toast = useToast();

  useEffect(() => {
    setNoteText(note);
    setNoteTags(tags);
  }, [note, tags]);

  const handleSaveOrUpdateNote = () => {
    if (noteText.trim()) {
      if (note) {
        updateNote(note, noteText.trim(), noteTags);
      } else {
        saveNote(noteText.trim(), noteTags);
      }
      toast({
        title: note ? 'Note updated.' : 'Note saved.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    }
  };

  const handleDeleteNote = () => {
    if (deleteNote) {
      deleteNote();
      toast({
        title: 'Note deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    }
  };

  return (
    <Box>
      <FormControl marginTop={2}>
        <FormLabel>Note</FormLabel>
        <Textarea
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          textColor={useColorModeValue('black', 'white')}
          _placeholder={{ color: 'gray.500' }}
          boxShadow="md"
          size="sm"
        />
      </FormControl>
      <FormControl marginTop={2}>
        <FormLabel>Tags</FormLabel>
        <TagInput tags={noteTags} setTags={setNoteTags} />
      </FormControl>
      <ButtonGroup
        marginTop={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button onClick={handleSaveOrUpdateNote} colorScheme="blue" marginTop={2} size="sm">
          {note ? 'Update Note' : 'Save Note'}
        </Button>
        {note && (
          <Button onClick={handleDeleteNote} colorScheme="red" marginTop={2} marginLeft={4} size="sm">
            Delete Note
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
};

export { NoteForm };
