// src/components/NoteForm.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, Select, FormControl, FormLabel, useToast } from '@chakra-ui/react';
const NoteForm = ({ categories, addCategory, saveNote }) => {
    const [note, setNote] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const toast = useToast();
    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0]);
        }
    }, [categories]);
    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setNewCategory('');
            toast({
                title: 'Category added.',
                description: `Category "${newCategory.trim()}" has been added.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    const handleSaveNote = () => {
        if (note.trim() && selectedCategory) {
            saveNote(note.trim(), selectedCategory);
            setNote('');
            toast({
                title: 'Note saved.',
                description: 'Your note has been saved successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    return (React.createElement(Box, null,
        React.createElement(FormControl, null,
            React.createElement(FormLabel, null, "Category"),
            React.createElement(Select, { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value) }, categories.map((category, index) => (React.createElement("option", { key: index, value: category }, category))))),
        React.createElement(FormControl, { marginTop: 2 },
            React.createElement(FormLabel, null, "New Category"),
            React.createElement(Input, { placeholder: "New category", value: newCategory, onChange: (e) => setNewCategory(e.target.value) })),
        React.createElement(Button, { onClick: handleAddCategory, marginTop: 2 }, "Add Category"),
        React.createElement(FormControl, { marginTop: 4 },
            React.createElement(FormLabel, null, "Note"),
            React.createElement(Textarea, { placeholder: "Write your note here...", value: note, onChange: (e) => setNote(e.target.value) })),
        React.createElement(Button, { onClick: handleSaveNote, marginTop: 2 }, "Save Note")));
};
export default NoteForm;
