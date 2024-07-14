import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Stack, useColorMode, Button, Tag, Wrap } from '@chakra-ui/react';
import NoteItem from '../components/NoteItem';
import { getStorageData, setStorageData } from '../utils/storage';
import theme from '../theme';
import CategoryDrawer from '../components/CategoryDrawer';
import NoteModal from '../components/NoteModal';
import SearchBar from '../components/SearchBar';
const Popup = () => {
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        getStorageData('categories', (data) => {
            if (data)
                setCategories(data);
        });
        getStorageData('notes', (data) => {
            if (data)
                setNotes(data);
        });
    }, []);
    const addCategory = (category) => {
        const updatedCategories = [...categories, category];
        setCategories(updatedCategories);
        setStorageData('categories', updatedCategories);
    };
    const removeCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        setStorageData('categories', updatedCategories);
    };
    const saveNote = (note, category, tags) => {
        const timestamp = new Date().toLocaleString();
        const updatedNotes = [...notes, { note, category, timestamp, tags }];
        setNotes(updatedNotes);
        setStorageData('notes', updatedNotes);
    };
    const removeNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
        setStorageData('notes', updatedNotes);
    };
    const toggleTagSelection = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        }
        else {
            setSelectedTags([...selectedTags, tag]);
        }
    };
    const filteredNotes = notes.filter(note => (note.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every(tag => note.tags.includes(tag))));
    return (React.createElement(ChakraProvider, { theme: theme },
        React.createElement(Box, { padding: 8, width: "100%", height: "100%", minWidth: "400px", minHeight: "600px" },
            React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between" },
                React.createElement(Heading, { size: "md", marginBottom: 4 }, "NoteFlow"),
                React.createElement(Button, { onClick: toggleColorMode, size: "sm" },
                    "Toggle ",
                    colorMode === 'light' ? 'Dark' : 'Light')),
            React.createElement(SearchBar, { searchQuery: searchQuery, setSearchQuery: setSearchQuery }),
            React.createElement(Wrap, { spacing: 2, marginTop: 4 }, Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: selectedTags.includes(tag) ? "blue" : "gray", cursor: "pointer", onClick: () => toggleTagSelection(tag) }, tag)))),
            React.createElement(Stack, { direction: "row", spacing: 4, marginTop: 4 },
                React.createElement(CategoryDrawer, { categories: categories, addCategory: addCategory, removeCategory: removeCategory }),
                React.createElement(NoteModal, { categories: categories, saveNote: saveNote })),
            React.createElement(Box, { marginTop: 4, overflowY: "auto", height: "calc(100% - 120px)" }, filteredNotes.length === 0 ? (React.createElement(Box, { textAlign: "center", color: "gray.500" }, "No notes available. Add a note to get started!")) : (filteredNotes.map((note, index) => (React.createElement(NoteItem, { key: index, note: note.note, category: note.category, timestamp: note.timestamp, tags: note.tags, onRemove: () => removeNote(index) }))))))));
};
export default Popup;
