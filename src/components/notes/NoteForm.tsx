/**
 * @module NoteForm
 * @description Form for creating and updating notes
 */
import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, useColorModeValue, Textarea, Select, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { TagInput } from '../inputs';

/**
 * @typedef NoteFormProps
 * @property {string[]} folders - The list of folders
 * @property {(note: string, tags: string[], folder: string) => void} saveNote - Function to save a note
 * @property {string} [note=''] - The note text
 * @property {string[]} [tags=[]] - The tags
 * @property {string} [folder=''] - The folder
 * @property {() => void} onClose - Function to close the form
 * @property {() => void} [deleteNote] - Function to delete the note
 * @returns {JSX.Element}
 */
type NoteFormProps = {
  folders: string[];
  saveNote: (note: string, tags: string[], folder: string) => void;
  note?: string;
  tags?: string[];
  folder?: string;
  onClose: () => void;
  deleteNote?: () => void;
};

/**
 * Form for creating and updating notes
 * @param {NoteFormProps} props - The component properties
 * @returns {JSX.Element}
 */
const NoteForm: React.FC<NoteFormProps> = ({ folders, saveNote, note = '', tags = [], folder = '', onClose, deleteNote }) => {
  const [noteText, setNoteText] = useState(note);
  const [noteTags, setNoteTags] = useState<string[]>(tags);
  const [selectedFolder, setSelectedFolder] = useState(folder);
  const toast = useToast();

  useEffect(() => {
    if (folders.length > 0 && !folder) {
      setSelectedFolder(folders[0]);
    }
  }, [folders, folder]);

  useEffect(() => {
    setNoteText(note);
    setNoteTags(tags);
    setSelectedFolder(folder);
  }, [note, tags, folder]);

  const handleSaveNote = () => {
    if (noteText.trim() && selectedFolder) {
      saveNote(noteText.trim(), noteTags, selectedFolder);
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
      <FormControl marginTop={1}>
        <FormLabel>Folder</FormLabel>
        <Select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} boxShadow="md" size="sm">
          {folders.map((folder, index) => (
            <option key={index} value={folder} color="black">{folder}</option>
          ))}
        </Select>
      </FormControl>
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
        <Button onClick={handleSaveNote} colorScheme="blue" marginTop={2} size="sm">
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
