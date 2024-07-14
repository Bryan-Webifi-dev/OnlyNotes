// src/components/NoteForm.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, Select, FormControl, FormLabel, useToast } from '@chakra-ui/react';

type NoteFormProps = {
  categories: string[];
  addCategory: (category: string) => void;
  saveNote: (note: string, category: string) => void;
};

const NoteForm: React.FC<NoteFormProps> = ({ categories, addCategory, saveNote }) => {
  const [note, setNote] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
      toast({
        title: 'Category added.',
        description: `Category "${newCategory.trim()}" has been added.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSaveNote = () => {
    if (note.trim() && selectedCategory) {
      saveNote(note.trim(), selectedCategory);
      setNote('');
      toast({
        title: 'Note saved.',
        description: 'Your note has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl marginTop={2}>
        <FormLabel>New Category</FormLabel>
        <Input
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleAddCategory} marginTop={2}>Add Category</Button>
      <FormControl marginTop={4}>
        <FormLabel>Note</FormLabel>
        <Textarea
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSaveNote} marginTop={2}>Save Note</Button>
    </Box>
  );
};

export default NoteForm;
