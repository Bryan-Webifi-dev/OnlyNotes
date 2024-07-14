import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Stack, useColorMode, Button, Tag, Wrap } from '@chakra-ui/react';
import NoteItem from '../components/NoteItem';
import { getStorageData, setStorageData } from '../utils/storage';
import theme from '../theme';
import CategoryDrawer from '../components/CategoryDrawer';
import NoteModal from '../components/NoteModal';
import SearchBar from '../components/SearchBar';

const Popup: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ note: string; category: string; timestamp: string; tags: string[] }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { colorMode, toggleColorMode } = useColorMode();

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

  const removeCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    setStorageData('categories', updatedCategories);
  };

  const saveNote = (note: string, category: string, tags: string[]) => {
    const timestamp = new Date().toLocaleString();
    const updatedNotes = [...notes, { note, category, timestamp, tags }];
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  const removeNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  const toggleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredNotes = notes.filter(note => 
    (note.note.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.every(tag => note.tags.includes(tag)))
  );

  return (
    <ChakraProvider theme={theme}>
      <Box 
        padding={8}
        width="100%"
        height="100%"
        minWidth="400px"
        minHeight="600px"
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Heading size="md" marginBottom={4}>NoteFlow</Heading>
          <Button onClick={toggleColorMode} size="sm">
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </Stack>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Wrap spacing={2} marginTop={4}>
          {Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (
            <Tag
              key={tag}
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme={selectedTags.includes(tag) ? "blue" : "gray"}
              cursor="pointer"
              onClick={() => toggleTagSelection(tag)}
            >
              {tag}
            </Tag>
          ))}
        </Wrap>
        <Stack direction="row" spacing={4} marginTop={4}>
          <CategoryDrawer categories={categories} addCategory={addCategory} removeCategory={removeCategory} />
          <NoteModal categories={categories} saveNote={saveNote} />
        </Stack>
        <Box 
          marginTop={4}
          overflowY="auto"
          height="calc(100% - 120px)"
        >
          {filteredNotes.length === 0 ? (
            <Box textAlign="center" color="gray.500">No notes available. Add a note to get started!</Box>
          ) : (
            filteredNotes.map((note, index) => (
              <NoteItem
                key={index}
                note={note.note}
                category={note.category}
                timestamp={note.timestamp}
                tags={note.tags}
                onRemove={() => removeNote(index)}
              />
            ))
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Popup;
