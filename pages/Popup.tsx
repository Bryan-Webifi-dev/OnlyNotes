import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, VStack, Text } from '@chakra-ui/react';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import { getStorageData, setStorageData } from '../utils/storage';

const Popup: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ note: string; category: string }[]>([]);

  useEffect(() => {
    getStorageData('categories', (data) => {
      if (data) setCategories(data);
    });
    getStorageData('notes', (data) => {
      if (data) setNotes(data);
    });
  }, []);

  const addCategory = (category: string) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setStorageData('categories', updatedCategories);
  };

  const saveNote = (note: string, category: string) => {
    const updatedNotes = [...notes, { note, category }];
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  const removeNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading size="lg" mb={4} textAlign="center">NoteFlow</Heading>
        <NoteForm categories={categories} addCategory={addCategory} saveNote={saveNote} />
        <VStack mt={4} spacing={4} align="stretch">
          {notes.length === 0 ? (
            <Text textAlign="center" color="gray.500">No notes available. Add a note to get started!</Text>
          ) : (
            notes.map((note, index) => (
              <NoteItem key={index} note={note.note} category={note.category} onRemove={() => removeNote(index)} />
            ))
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Popup;

