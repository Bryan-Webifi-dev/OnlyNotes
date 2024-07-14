// src/components/NoteModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea, Select, useDisclosure, FormControl, FormLabel, } from '@chakra-ui/react';
import TagInput from './TagInput';
import { AddIcon } from '@chakra-ui/icons';
const NoteModal = ({ categories, saveNote }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [note, setNote] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [tags, setTags] = useState([]);
    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0]);
        }
    }, [categories]);
    const handleSaveNote = () => {
        if (note.trim() && selectedCategory) {
            saveNote(note.trim(), selectedCategory, tags);
            setNote('');
            setTags([]);
            onClose();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: onOpen, colorScheme: "blue", leftIcon: React.createElement(AddIcon, null) }, "Add Note"),
        React.createElement(Modal, { isOpen: isOpen, onClose: onClose },
            React.createElement(ModalOverlay, null,
                React.createElement(ModalContent, null,
                    React.createElement(ModalHeader, null, "Add New Note"),
                    React.createElement(ModalCloseButton, null),
                    React.createElement(ModalBody, null,
                        React.createElement(FormControl, null,
                            React.createElement(FormLabel, null, "Category"),
                            React.createElement(Select, { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value) }, categories.map((category, index) => (React.createElement("option", { key: index, value: category }, category))))),
                        React.createElement(FormControl, { marginTop: 4 },
                            React.createElement(FormLabel, null, "Note"),
                            React.createElement(Textarea, { placeholder: "Write your note here...", value: note, onChange: (e) => setNote(e.target.value) })),
                        React.createElement(FormControl, { marginTop: 4 },
                            React.createElement(FormLabel, null, "Tags"),
                            React.createElement(TagInput, { tags: tags, setTags: setTags }))),
                    React.createElement(ModalFooter, null,
                        React.createElement(Button, { colorScheme: "blue", mr: 3, onClick: handleSaveNote }, "Save Note"),
                        React.createElement(Button, { variant: "ghost", onClick: onClose }, "Cancel")))))));
};
export default NoteModal;
