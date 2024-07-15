import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Stack, IconButton, Wrap, Tag, Tooltip } from '@chakra-ui/react';
import { NoteList, NoteModal, Settings, Menu, Task, CustomTabs, FolderModal } from 'components';
import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import theme from '../theme';
import { usePopup } from 'hooks';
const Popup = () => {
    const { folders, addFolder, notes, saveNote, updateNote, removeNote, tasks, size, changeSize, selectedTags, toggleTagSelection, filteredNotes, handleNoteClick, handleCreateNote, selectedNote, isOpen, onClose, isCreating, } = usePopup();
    const [currentTab, setCurrentTab] = useState('notes');
    const [isFolderModalOpen, setFolderModalOpen] = useState(false);
    return (React.createElement(ChakraProvider, { theme: theme },
        React.createElement(Box, { padding: 3, width: size.width, height: size.height, minWidth: "400px", borderRadius: "md" },
            React.createElement(Stack, { direction: "row", alignItems: "stretch", justifyContent: "space-between", w: "100%" },
                React.createElement(Stack, { direction: "row", spacing: 6, alignItems: "center", justifyContent: "space-between", w: "100%" },
                    React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 4 },
                        React.createElement(CustomTabs, { currentTab: currentTab, onTabChange: setCurrentTab, noteCount: filteredNotes.length, taskCount: tasks.length })),
                    React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "flex-end", spacing: 4, marginBottom: 4 },
                        React.createElement(Tooltip, { label: "Add folder", "aria-label": "Add folder" },
                            React.createElement(IconButton, { "aria-label": "Add folder", icon: React.createElement(FiFolderPlus, null), onClick: () => setFolderModalOpen(true), variant: "outline" })),
                        React.createElement(Tooltip, { label: "Add note", "aria-label": "Add note" },
                            React.createElement(IconButton, { "aria-label": "Add note", icon: React.createElement(FiFilePlus, null), onClick: handleCreateNote, variant: "outline" })),
                        React.createElement(Settings, { changeSize: changeSize }),
                        React.createElement(Menu, { folders: folders })))),
            currentTab === 'notes' && (React.createElement(React.Fragment, null,
                React.createElement(Wrap, { spacing: 2, marginTop: 1 }, Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: selectedTags.includes(tag) ? "blue" : "gray", cursor: "pointer", onClick: () => toggleTagSelection(tag) }, tag)))),
                React.createElement(Box, { marginTop: 1 },
                    React.createElement(NoteList, { notes: filteredNotes, onNoteClick: handleNoteClick })),
                React.createElement(NoteModal, { folders: folders, saveNote: saveNote, updateNote: updateNote, deleteNote: () => removeNote(selectedNote.note, selectedNote.tags, selectedNote.folder), note: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.note, tags: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.tags, folder: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.folder, isOpen: isOpen, onClose: onClose }),
                isCreating && (React.createElement(NoteModal, { folders: folders, saveNote: saveNote, updateNote: updateNote, deleteNote: () => { }, isOpen: isOpen, onClose: onClose })))),
            currentTab === 'tasks' && (React.createElement(Task, { tasks: tasks })),
            React.createElement(FolderModal, { addFolder: addFolder, isOpen: isFolderModalOpen, onClose: () => setFolderModalOpen(false) }),
            React.createElement(Box, { position: "fixed", bottom: 4, right: 2, color: "gray.500", bg: "whiteAlpha.900", width: "auto", textAlign: "right", zIndex: 999, px: 2 },
                React.createElement(Heading, { size: "sm" }, "OnlyNotes")))));
};
export default Popup;
