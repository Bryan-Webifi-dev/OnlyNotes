import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Stack, useColorMode, Button, Wrap, Tag, SimpleGrid, Menu as ChakraMenu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton, useDisclosure } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import NoteItem from '../components/NoteItem';
import { getStorageData, setStorageData } from '../utils/storage';
import theme from '../theme';
import Menu from '../components/Menu';
import NoteModal from '../components/NoteModal';
import SearchBar from '../components/SearchBar';
const Popup = () => {
    const [categories, setCategories] = useState([]);
    const [folders, setFolders] = useState([]);
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [size, setSize] = useState({ width: '400px', height: '600px' });
    const { colorMode, toggleColorMode } = useColorMode();
    const [selectedNote, setSelectedNote] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        getStorageData('categories', (data) => {
            if (data)
                setCategories(data);
        });
        getStorageData('folders', (data) => {
            if (data)
                setFolders(data);
        });
        getStorageData('notes', (data) => {
            if (data)
                setNotes(data);
        });
        getStorageData('size', (data) => {
            if (data)
                setSize(data);
            else
                changeSize('600px', '800px'); // Set default size if not found in storage
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
    const addFolder = (folder) => {
        const updatedFolders = [...folders, folder];
        setFolders(updatedFolders);
        setStorageData('folders', updatedFolders);
    };
    const removeFolder = (index) => {
        const updatedFolders = folders.filter((_, i) => i !== index);
        setFolders(updatedFolders);
        setStorageData('folders', updatedFolders);
    };
    const saveNote = (note, category, tags, folder) => {
        const timestamp = new Date().toLocaleString();
        const updatedNotes = [...notes, { note, category, timestamp, tags, folder }];
        setNotes(updatedNotes);
        setStorageData('notes', updatedNotes);
    };
    const updateNote = (note, category, tags, folder) => {
        const updatedNotes = notes.map((n) => n.note === (selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.note) && n.category === (selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.category) && JSON.stringify(n.tags) === JSON.stringify(selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.tags)
            ? Object.assign(Object.assign({}, n), { note, category, tags, folder }) : n);
        setNotes(updatedNotes);
        setStorageData('notes', updatedNotes);
        setSelectedNote(null);
        onClose();
    };
    const removeNote = (note, category, tags, folder) => {
        const updatedNotes = notes.filter(n => !(n.note === note && n.category === category && JSON.stringify(n.tags) === JSON.stringify(tags) && n.folder === folder));
        setNotes(updatedNotes);
        setStorageData('notes', updatedNotes);
        setSelectedNote(null);
        onClose();
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
        note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.folder.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every(tag => note.tags.includes(tag))));
    const changeSize = (width, height) => {
        const newSize = { width, height };
        setSize(newSize);
        setStorageData('size', newSize);
    };
    const handleNoteClick = (note, category, tags, folder) => {
        setSelectedNote({ note, category, tags, folder });
        setIsCreating(false);
        onOpen();
    };
    const handleCreateNote = () => {
        setSelectedNote(null);
        setIsCreating(true);
        onOpen();
    };
    return (React.createElement(ChakraProvider, { theme: theme },
        React.createElement(Box, { padding: 4, width: size.width, height: size.height, minWidth: "400px", minHeight: "600px" },
            React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between" },
                React.createElement(Heading, { size: "md", marginBottom: 4 }, "OnlyNotes"),
                React.createElement(Stack, { direction: "row", spacing: 4, marginBottom: 4 },
                    React.createElement(ChakraMenu, null,
                        React.createElement(MenuButton, { as: IconButton, icon: React.createElement(SettingsIcon, null), variant: "outline", size: "sm" }),
                        React.createElement(MenuList, null,
                            React.createElement(MenuItem, { onClick: () => changeSize('600px', '800px') }, "Option 1: 600x800"),
                            React.createElement(MenuItem, { onClick: () => changeSize('800px', '1000px') }, "Option 2: 800x1000"),
                            React.createElement(MenuDivider, null),
                            React.createElement(MenuItem, { onClick: toggleColorMode },
                                "Toggle ",
                                colorMode === 'light' ? 'Dark' : 'Light'))),
                    React.createElement(Button, { onClick: handleCreateNote, colorScheme: "blue", size: "sm" }, "Create Note"),
                    React.createElement(Menu, { categories: categories, addCategory: addCategory, removeCategory: removeCategory, folders: folders, addFolder: addFolder, removeFolder: removeFolder }))),
            React.createElement(SearchBar, { searchQuery: searchQuery, setSearchQuery: setSearchQuery }),
            React.createElement(Wrap, { spacing: 2, marginTop: 4 }, Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: selectedTags.includes(tag) ? "blue" : "gray", cursor: "pointer", onClick: () => toggleTagSelection(tag) }, tag)))),
            React.createElement(Box, { marginTop: 4 }, filteredNotes.length === 0 ? (React.createElement(Box, { textAlign: "center", color: "gray.500" }, "No notes available. Add a note to get started!")) : (React.createElement(SimpleGrid, { columns: 2, spacing: 4 }, filteredNotes.map((note, index) => (React.createElement(NoteItem, { key: index, note: note.note, category: note.category, timestamp: note.timestamp, tags: note.tags, folder: note.folder, onClick: () => handleNoteClick(note.note, note.category, note.tags, note.folder) })))))),
            React.createElement(NoteModal, { categories: categories, folders: folders, saveNote: saveNote, updateNote: updateNote, deleteNote: () => removeNote(selectedNote.note, selectedNote.category, selectedNote.tags, selectedNote.folder), note: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.note, category: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.category, tags: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.tags, folder: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.folder, isOpen: isOpen, onClose: onClose }),
            isCreating && (React.createElement(NoteModal, { categories: categories, folders: folders, saveNote: saveNote, updateNote: updateNote, deleteNote: () => { }, isOpen: isOpen, onClose: onClose })))));
};
export default Popup;
