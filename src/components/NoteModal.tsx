// src/components/NoteModal.tsx

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
import NoteForm from './NoteForm';

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

export default NoteModal;
