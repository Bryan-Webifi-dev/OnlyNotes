/*********************************************************************
 * @module Popup
 * @author Bryan Shea
 * @version 1.0.0
 *********************************************************************/
import React from 'react';
import { ChakraProvider, Box, Heading, Stack, Button, Wrap, Tag } from '@chakra-ui/react';
import theme from '../theme';
import { NoteList, NoteModal, SearchBar, Settings, Menu } from 'components';
import { usePopup } from 'hooks';
/**
 * Popup component
 * @return {React.FC} Popup component
 */
const Popup = () => {
    const { categories, addCategory, removeCategory, folders, addFolder, removeFolder, notes, saveNote, updateNote, removeNote, size, colorMode, changeSize, toggleColorMode, searchQuery, setSearchQuery, selectedTags, toggleTagSelection, filteredNotes, handleNoteClick, handleCreateNote, selectedNote, isOpen, onOpen, onClose, isCreating, } = usePopup();
    return (React.createElement(ChakraProvider, { theme: theme },
        React.createElement(Box, { padding: 4, width: size.width, height: size.height, minWidth: "400px", minHeight: "600px" },
            React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between" },
                React.createElement(Heading, { size: "md", marginBottom: 4 }, "OnlyNotes"),
                React.createElement(Stack, { direction: "row", spacing: 4, marginBottom: 4 },
                    React.createElement(Settings, { changeSize: changeSize, toggleColorMode: toggleColorMode, colorMode: colorMode }),
                    React.createElement(Button, { onClick: handleCreateNote, colorScheme: "blue", size: "sm" }, "Create Note"),
                    React.createElement(Menu, { categories: categories, addCategory: addCategory, removeCategory: removeCategory, folders: folders, addFolder: addFolder, removeFolder: removeFolder }))),
            React.createElement(SearchBar, { searchQuery: searchQuery, setSearchQuery: setSearchQuery }),
            React.createElement(Wrap, { spacing: 2, marginTop: 4 }, Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: selectedTags.includes(tag) ? "blue" : "gray", cursor: "pointer", onClick: () => toggleTagSelection(tag) }, tag)))),
            React.createElement(Box, { marginTop: 4 },
                React.createElement(NoteList, { notes: filteredNotes, onNoteClick: handleNoteClick })),
            React.createElement(NoteModal, { categories: categories, folders: folders, saveNote: saveNote, updateNote: updateNote, deleteNote: () => removeNote(selectedNote.note, selectedNote.category, selectedNote.tags, selectedNote.folder), note: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.note, category: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.category, tags: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.tags, folder: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.folder, isOpen: isOpen, onClose: onClose }),
            isCreating && (React.createElement(NoteModal, { categories: categories, folders: folders, saveNote: saveNote, updateNote: updateNote, deleteNote: () => { }, isOpen: isOpen, onClose: onClose })))));
};
export default Popup;
