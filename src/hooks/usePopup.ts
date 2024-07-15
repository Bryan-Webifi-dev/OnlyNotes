/**
 * @module usePopup
 * @description Custom hook for managing popup state
 */
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useCategories, useFolders, useNotes, useUIState } from './';

/**
 * Custom hook for managing popup state
 * @returns {object} - The popup state
 */
const usePopup = () => {
  const { categories, addCategory, removeCategory } = useCategories();
  const { folders, addFolder, removeFolder } = useFolders();
  const { notes, saveNote, updateNote, removeNote } = useNotes();
  const { size, colorMode, changeSize, toggleColorMode } = useUIState();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<{ note: string; category: string; tags: string[]; folder: string } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return {
    categories,
    addCategory,
    removeCategory,
    folders,
    addFolder,
    removeFolder,
    notes,
    saveNote,
    updateNote,
    removeNote,
    size,
    colorMode,
    changeSize,
    toggleColorMode,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    selectedNote,
    setSelectedNote,
    isCreating,
    setIsCreating,
    isOpen,
    onOpen,
    onClose,
    toggleTagSelection,
    filteredNotes,
    handleNoteClick,
    handleCreateNote,
  };
};

export { usePopup };
