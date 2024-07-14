// src/components/NoteForm.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Textarea, Select, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import TagInput from './TagInput';
const NoteForm = ({ categories, folders, saveNote, note = '', category = '', tags = [], folder = '', onClose, deleteNote }) => {
    const [noteText, setNoteText] = useState(note);
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [noteTags, setNoteTags] = useState(tags);
    const [selectedFolder, setSelectedFolder] = useState(folder);
    const toast = useToast();
    useEffect(() => {
        if (categories.length > 0 && !category) {
            setSelectedCategory(categories[0]);
        }
        if (folders.length > 0 && !folder) {
            setSelectedFolder(folders[0]);
        }
    }, [categories, category, folders, folder]);
    useEffect(() => {
        setNoteText(note);
        setSelectedCategory(category);
        setNoteTags(tags);
        setSelectedFolder(folder);
    }, [note, category, tags, folder]);
    const handleSaveNote = () => {
        if (noteText.trim() && selectedCategory && selectedFolder) {
            saveNote(noteText.trim(), selectedCategory, noteTags, selectedFolder);
            toast({
                title: note ? 'Note updated.' : 'Note saved.',
                description: note ? 'Your note has been updated successfully.' : 'Your note has been saved successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose();
        }
    };
    const handleDeleteNote = () => {
        if (deleteNote) {
            deleteNote();
            toast({
                title: 'Note deleted.',
                description: 'Your note has been deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose();
        }
    };
    return (React.createElement(Box, null,
        React.createElement(FormControl, null,
            React.createElement(FormLabel, null, "Category"),
            React.createElement(Select, { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), boxShadow: "md" }, categories.map((category, index) => (React.createElement("option", { key: index, value: category, color: "black" }, category))))),
        React.createElement(FormControl, { marginTop: 4 },
            React.createElement(FormLabel, null, "Folder"),
            React.createElement(Select, { value: selectedFolder, onChange: (e) => setSelectedFolder(e.target.value), boxShadow: "md" }, folders.map((folder, index) => (React.createElement("option", { key: index, value: folder, color: "black" }, folder))))),
        React.createElement(FormControl, { marginTop: 4 },
            React.createElement(FormLabel, null, "Note"),
            React.createElement(Textarea, { placeholder: "Write your note here...", value: noteText, onChange: (e) => setNoteText(e.target.value), textColor: "black", _placeholder: { color: 'gray.500' }, boxShadow: "md" })),
        React.createElement(FormControl, { marginTop: 4 },
            React.createElement(FormLabel, null, "Tags"),
            React.createElement(TagInput, { tags: noteTags, setTags: setNoteTags })),
        React.createElement(Button, { onClick: handleSaveNote, colorScheme: "blue", marginTop: 4 }, note ? 'Update Note' : 'Save Note'),
        note && (React.createElement(Button, { onClick: handleDeleteNote, colorScheme: "red", marginTop: 4, marginLeft: 4 }, "Delete Note")),
        React.createElement(Button, { onClick: onClose, variant: "ghost", marginTop: 4, marginLeft: 4 }, "Cancel")));
};
export default NoteForm;
