// src/components/NoteModal.tsx
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react';
import NoteForm from './NoteForm';
const NoteModal = ({ categories, folders, saveNote, updateNote, deleteNote, note = '', category = '', tags = [], folder = '', isOpen, onClose, }) => {
    const handleSaveOrUpdate = (note, category, tags, folder) => {
        if (note) {
            updateNote(note, category, tags, folder);
        }
        else {
            saveNote(note, category, tags, folder);
        }
    };
    return (React.createElement(Modal, { isOpen: isOpen, onClose: onClose, size: "sm", isCentered: true },
        React.createElement(ModalOverlay, { overflowY: "hidden" },
            React.createElement(ModalContent, null,
                React.createElement(ModalHeader, null, note ? 'Edit Note' : 'Add New Note'),
                React.createElement(ModalCloseButton, null),
                React.createElement(ModalBody, null,
                    React.createElement(NoteForm, { categories: categories, folders: folders, saveNote: handleSaveOrUpdate, note: note, category: category, tags: tags, folder: folder, onClose: onClose, deleteNote: deleteNote })),
                React.createElement(ModalFooter, null)))));
};
export default NoteModal;
