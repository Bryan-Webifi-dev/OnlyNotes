import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, Select, VStack, HStack } from '@chakra-ui/react';

type NoteFormProps = {
  categories: string[];
  addCategory: (category: string) => void;
  saveNote: (note: string, category: string) => void;
};

const NoteForm: React.FC<NoteFormProps> = ({ categories, addCategory, saveNote }) => {
  const [note, setNote] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleSaveNote = () => {
    if (note.trim() && selectedCategory) {
      saveNote(note.trim(), selectedCategory);
      setNote('');
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Select placeholder="Select category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </Select>
      <HStack spacing={2}>
        <Input
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={handleAddCategory} colorScheme="teal">Add</Button>
      </HStack>
      <Textarea
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button onClick={handleSaveNote} colorScheme="teal">Save Note</Button>
    </VStack>
  );
};

export default NoteForm;
