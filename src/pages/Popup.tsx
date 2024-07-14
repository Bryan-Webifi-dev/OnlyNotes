import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Stack, useColorMode, Button, Wrap, Tag, SimpleGrid, Menu as ChakraMenu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import NoteItem from '../components/NoteItem';
import { getStorageData, setStorageData } from '../utils/storage';
import theme from '../theme';
import Menu from '../components/Menu';
import NoteModal from '../components/NoteModal';
import SearchBar from '../components/SearchBar';

const Popup: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ note: string; category: string; timestamp: string; tags: string[]; folder: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [size, setSize] = useState<{ width: string; height: string }>({ width: '400px', height: '600px' });
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedNote, setSelectedNote] = useState<{ note: string; category: string; tags: string[]; folder: string } | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getStorageData('categories', (data) => {
      if (data) setCategories(data);
    });
    getStorageData('folders', (data) => {
      if (data) setFolders(data);
    });
    getStorageData('notes', (data) => {
      if (data) setNotes(data);
    });
    getStorageData('size', (data) => {
      if (data) setSize(data);
      else changeSize('600px', '800px'); // Set default size if not found in storage
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

  const addFolder = (folder: string) => {
    const updatedFolders = [...folders, folder];
    setFolders(updatedFolders);
    setStorageData('folders', updatedFolders);
  };

  const removeFolder = (index: number) => {
    const updatedFolders = folders.filter((_, i) => i !== index);
    setFolders(updatedFolders);
    setStorageData('folders', updatedFolders);
  };

  const saveNote = (note: string, category: string, tags: string[], folder: string) => {
    const timestamp = new Date().toLocaleString();
    const updatedNotes = [...notes, { note, category, timestamp, tags, folder }];
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  const updateNote = (note: string, category: string, tags: string[], folder: string) => {
    const updatedNotes = notes.map((n) =>
      n.note === selectedNote?.note && n.category === selectedNote?.category && JSON.stringify(n.tags) === JSON.stringify(selectedNote?.tags)
        ? { ...n, note, category, tags, folder }
        : n
    );
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
    setSelectedNote(null);
    onClose();
  };

  const removeNote = (note: string, category: string, tags: string[], folder: string) => {
    const updatedNotes = notes.filter(n =>
      !(n.note === note && n.category === category && JSON.stringify(n.tags) === JSON.stringify(tags) && n.folder === folder)
    );
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
    setSelectedNote(null);
    onClose();
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
    note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.folder.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.every(tag => note.tags.includes(tag)))
  );

  const changeSize = (width: string, height: string) => {
    const newSize = { width, height };
    setSize(newSize);
    setStorageData('size', newSize);
  };

  const handleNoteClick = (note: string, category: string, tags: string[], folder: string) => {
    setSelectedNote({ note, category, tags, folder });
    setIsCreating(false);
    onOpen();
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsCreating(true);
    onOpen();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box padding={4} width={size.width} height={size.height} minWidth="400px" minHeight="600px">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Heading size="md" marginBottom={4}>OnlyNotes</Heading>
          <Stack direction="row" spacing={4} marginBottom={4}>
            <ChakraMenu>
              <MenuButton as={IconButton} icon={<SettingsIcon />} variant="outline" size="sm" />
              <MenuList>
                <MenuItem onClick={() => changeSize('600px', '800px')}>Option 1: 600x800</MenuItem>
                <MenuItem onClick={() => changeSize('800px', '1000px')}>Option 2: 800x1000</MenuItem>
                <MenuDivider />
                <MenuItem onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </MenuItem>
              </MenuList>
            </ChakraMenu>
            <Button onClick={handleCreateNote} colorScheme="blue" size="sm">
              Create Note
            </Button>
            <Menu
              categories={categories}
              addCategory={addCategory}
              removeCategory={removeCategory}
              folders={folders}
              addFolder={addFolder}
              removeFolder={removeFolder}
            />
          </Stack>
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
        <Box marginTop={4}>
          {filteredNotes.length === 0 ? (
            <Box textAlign="center" color="gray.500">No notes available. Add a note to get started!</Box>
          ) : (
            <SimpleGrid columns={2} spacing={4}>
              {filteredNotes.map((note, index) => (
                <NoteItem
                  key={index}
                  note={note.note}
                  category={note.category}
                  timestamp={note.timestamp}
                  tags={note.tags}
                  folder={note.folder}
                  onClick={() => handleNoteClick(note.note, note.category, note.tags, note.folder)}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
        <NoteModal
          categories={categories}
          folders={folders}
          saveNote={saveNote}
          updateNote={updateNote}
          deleteNote={() => removeNote(selectedNote!.note, selectedNote!.category, selectedNote!.tags, selectedNote!.folder)}
          note={selectedNote?.note}
          category={selectedNote?.category}
          tags={selectedNote?.tags}
          folder={selectedNote?.folder}
          isOpen={isOpen}
          onClose={onClose}
        />
        {isCreating && (
          <NoteModal
            categories={categories}
            folders={folders}
            saveNote={saveNote}
            updateNote={updateNote}
            deleteNote={() => {}}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Popup;

