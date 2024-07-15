/**
 * @module NoteModal
 * @description Modal for adding and editing notes
 */
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { NoteForm } from '../notes';

/**
 * @typedef NoteModalProps
 * @property {(note: string, tags: string[]) => void} saveNote - Function to save a note
 * @property {(oldNote: string, newNote: string, tags: string[]) => void} updateNote - Function to update a note
 * @property {() => void} deleteNote - Function to delete a note
 * @property {string} [note=''] - The note text
 * @property {string[]} [tags=[]] - The tags
 * @property {boolean} isOpen - Whether the modal is open
 * @property {() => void} onClose - Function to close the modal
 */
type NoteModalProps = {
  saveNote: (note: string, tags: string[]) => void;
  updateNote: (oldNote: string, newNote: string, tags: string[]) => void;
  deleteNote: () => void;
  note?: string;
  tags?: string[];
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Modal for adding and editing notes
 * @param {NoteModalProps} props - The component properties
 */
const NoteModal: React.FC<NoteModalProps> = ({
  saveNote,
  updateNote,
  deleteNote,
  note = '',
  tags = [],
  isOpen,
  onClose,
}) => {
  const handleSaveOrUpdate = (noteText: string, noteTags: string[]) => {
    if (note) {
      updateNote(note, noteText, noteTags);
    } else {
      saveNote(noteText, noteTags);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay overflowY="hidden">
        <ModalContent>
          <ModalHeader>{note ? 'Edit Note' : 'Add New Note'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NoteForm
              saveNote={handleSaveOrUpdate}
              updateNote={updateNote}
              deleteNote={deleteNote}
              note={note}
              tags={tags}
              onClose={onClose}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export { NoteModal };
