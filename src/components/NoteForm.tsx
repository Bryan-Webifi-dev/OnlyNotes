// src/components/NoteForm.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, Select, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import TagInput from './TagInput';

type NoteFormProps = {
  categories: string[];
  folders: string[];
  saveNote: (note: string, category: string, tags: string[], folder: string) => void;
  note?: string;
  category?: string;
  tags?: string[];
  folder?: string;
  onClose: () => void;
  deleteNote?: () => void;
};

const NoteForm: React.FC<NoteFormProps> = ({ categories, folders, saveNote, note = '', category = '', tags = [], folder = '', onClose, deleteNote }) => {
  const [noteText, setNoteText] = useState(note);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [noteTags, setNoteTags] = useState<string[]>(tags);
  const [selectedFolder, setSelectedFolder] = useState(folder);
  const toast = useToast();

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setSelectedCategory(categories[0]);
    }
    if (folders.length > 0 && !folder) {
      setSelectedFolder(folders[0]);
    }
  }, [categories, category, folders, folder]);

  useEffect(() => {
    setNoteText(note);
    setSelectedCategory(category);
    setNoteTags(tags);
    setSelectedFolder(folder);
  }, [note, category, tags, folder]);

  const handleSaveNote = () => {
    if (noteText.trim() && selectedCategory && selectedFolder) {
      saveNote(noteText.trim(), selectedCategory, noteTags, selectedFolder);
      toast({
        title: note ? 'Note updated.' : 'Note saved.',
        description: note ? 'Your note has been updated successfully.' : 'Your note has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleDeleteNote = () => {
    if (deleteNote) {
      deleteNote();
      toast({
        title: 'Note deleted.',
        description: 'Your note has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} boxShadow="md">
          {categories.map((category, index) => (
            <option key={index} value={category} color="black">{category}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl marginTop={4}>
        <FormLabel>Folder</FormLabel>
        <Select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} boxShadow="md">
          {folders.map((folder, index) => (
            <option key={index} value={folder} color="black">{folder}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl marginTop={4}>
        <FormLabel>Note</FormLabel>
        <Textarea
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          textColor="black"
          _placeholder={{ color: 'gray.500' }}
          boxShadow="md"
        />
      </FormControl>
      <FormControl marginTop={4}>
        <FormLabel>Tags</FormLabel>
        <TagInput tags={noteTags} setTags={setNoteTags} />
      </FormControl>
      <Button onClick={handleSaveNote} colorScheme="blue" marginTop={4}>
        {note ? 'Update Note' : 'Save Note'}
      </Button>
      {note && (
        <Button onClick={handleDeleteNote} colorScheme="red" marginTop={4} marginLeft={4}>
          Delete Note
        </Button>
      )}
      <Button onClick={onClose} variant="ghost" marginTop={4} marginLeft={4}>Cancel</Button>
    </Box>
  );
};

export default NoteForm;
