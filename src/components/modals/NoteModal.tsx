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

type NoteModalProps = {
  saveNote: (note: string, tags: string[]) => void;
  updateNote: (oldNote: string, newNote: string, tags: string[]) => void;
  deleteNote: () => void;
  note?: string;
  tags?: string[];
  isOpen: boolean;
  onClose: () => void;
};

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
            <ModalOverlay>
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