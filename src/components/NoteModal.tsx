// src/components/NoteModal.tsx

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Select,
  useDisclosure,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import TagInput from './TagInput';
import { AddIcon } from '@chakra-ui/icons';

type NoteModalProps = {
  categories: string[];
  saveNote: (note: string, category: string, tags: string[]) => void;
};

const NoteModal: React.FC<NoteModalProps> = ({ categories, saveNote }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);

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

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" leftIcon={<AddIcon />}>
        Add Note
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add New Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl marginTop={4}>
                <FormLabel>Note</FormLabel>
                <Textarea
                  placeholder="Write your note here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </FormControl>
              <FormControl marginTop={4}>
                <FormLabel>Tags</FormLabel>
                <TagInput tags={tags} setTags={setTags} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveNote}>
                Save Note
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default NoteModal;
