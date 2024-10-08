import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Stack, Button, Wrap, Tag, Flex } from '@chakra-ui/react';
import theme from '../theme';
import { NoteList, NoteModal, Menu, Task, CustomTabs } from 'components';
import { usePopup } from 'hooks';
const Popup = () => {
    const { notes, saveNote, updateNote, removeNote, tasks, size, changeSize, selectedTags, toggleTagSelection, filteredNotes, handleNoteClick, handleCreateNote, selectedNote, isOpen, onClose, isCreating, } = usePopup();
    const [currentTab, setCurrentTab] = useState('notes');
    return (React.createElement(ChakraProvider, { theme: theme },
        React.createElement(Box, { padding: 3, width: size.width, height: size.height, minWidth: "400px", borderRadius: "md", overflow: "hidden" },
            React.createElement(Flex, { direction: "column", height: "100%" },
                React.createElement(Stack, { direction: "row", alignItems: "stretch", justifyContent: "space-between", w: "100%" },
                    React.createElement(Stack, { direction: "row", spacing: 6, alignItems: "center", justifyContent: "space-between", w: "100%" },
                        React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 4 },
                            React.createElement(CustomTabs, { currentTab: currentTab, onTabChange: setCurrentTab, noteCount: filteredNotes.length, taskCount: tasks.length })),
                        React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "flex-end", spacing: 4, marginBottom: 4 },
                            React.createElement(Button, { onClick: handleCreateNote, colorScheme: "blue", size: "sm" }, "Create Note"),
                            React.createElement(Menu, { changeSize: changeSize })))),
                React.createElement(Box, { flex: "1", overflowY: "auto", paddingY: 4 },
                    currentTab === 'notes' && (React.createElement(React.Fragment, null,
                        React.createElement(Wrap, { spacing: 2, marginTop: 1 }, Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (React.createElement(Tag, { key: tag, size: "sm", borderRadius: "full", variant: "solid", colorScheme: selectedTags.includes(tag) ? "blue" : "gray", cursor: "pointer", onClick: () => toggleTagSelection(tag) }, tag)))),
                        React.createElement(Box, { marginTop: 1 },
                            React.createElement(NoteList, { notes: filteredNotes, onNoteClick: handleNoteClick })),
                        React.createElement(NoteModal, { saveNote: saveNote, updateNote: (oldNote, newNote, tags) => updateNote(oldNote, newNote, tags), deleteNote: () => removeNote(selectedNote.note, selectedNote.tags), note: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.note, tags: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.tags, isOpen: isOpen, onClose: onClose }),
                        isCreating && (React.createElement(NoteModal, { saveNote: saveNote, updateNote: (oldNote, newNote, tags) => updateNote(oldNote, newNote, tags), deleteNote: () => { }, isOpen: isOpen, onClose: onClose })))),
                    currentTab === 'tasks' && React.createElement(Task, { tasks: tasks })),
                React.createElement(Box, { position: "absolute", bottom: 4, left: 4, color: "gray.500", textAlign: "left" },
                    React.createElement(Heading, { size: "md", isTruncated: true }, "OnlyNotes"))))));
};
export default Popup;
