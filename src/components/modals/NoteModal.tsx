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
 * @property {string[]} categories - The list of categories
 * @property {string[]} folders - The list of folders
 * @property {(note: string, category: string, tags: string[], folder: string) => void} saveNote - Function to save a note
 * @property {(note: string, category: string, tags: string[], folder: string) => void} updateNote - Function to update a note
 * @property {() => void} deleteNote - Function to delete a note
 * @property {string} [note=''] - The note text
 * @property {string} [category=''] - The category
 * @property {string[]} [tags=[]] - The tags
 * @property {string} [folder=''] - The folder
 * @property {boolean} isOpen - Whether the modal is open
 * @property {() => void} onClose - Function to close the modal
 */
type NoteModalProps = {
  categories: string[];
  folders: string[];
  saveNote: (note: string, category: string, tags: string[], folder: string) => void;
  updateNote: (note: string, category: string, tags: string[], folder: string) => void;
  deleteNote: () => void;
  note?: string;
  category?: string;
  tags?: string[];
  folder?: string;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Modal for adding and editing notes
 * @param {NoteModalProps} props - The component properties
 */
const NoteModal: React.FC<NoteModalProps> = ({
  categories,
  folders,
  saveNote,
  updateNote,
  deleteNote,
  note = '',
  category = '',
  tags = [],
  folder = '',
  isOpen,
  onClose,
}) => {
  const handleSaveOrUpdate = (note: string, category: string, tags: string[], folder: string) => {
    if (note) {
      updateNote(note, category, tags, folder);
    } else {
      saveNote(note, category, tags, folder);
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
              categories={categories}
              folders={folders}
              saveNote={handleSaveOrUpdate}
              note={note}
              category={category}
              tags={tags}
              folder={folder}
              onClose={onClose}
              deleteNote={deleteNote}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export { NoteModal };
