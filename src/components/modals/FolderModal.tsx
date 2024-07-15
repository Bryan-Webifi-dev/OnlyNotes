/**
 * @module FolderModal
 * @description Modal for adding a new folder
 */
import React, { useState } from 'react';
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
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';

/**
 * @typedef FolderModalProps
 * @property {(folder: string) => void} addFolder - Function to add a new folder
 * @property {boolean} isOpen - Whether the modal is open
 * @property {() => void} onClose - Function to close the modal
 */
type FolderModalProps = {
  addFolder: (folder: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Modal for adding a new folder
 * @param {FolderModalProps} props - The component properties
 */
const FolderModal: React.FC<FolderModalProps> = ({ addFolder, isOpen, onClose }) => {
  const [folderName, setFolderName] = useState('');
  const toast = useToast();

  const handleAddFolder = () => {
    if (folderName.trim()) {
      addFolder(folderName.trim());
      toast({
        title: 'Folder added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay overflowY="hidden">
        <ModalContent>
          <ModalHeader>Add New Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Folder Name</FormLabel>
              <Input
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                boxShadow="md"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddFolder} colorScheme="blue">
              Add Folder
            </Button>
            <Button onClick={onClose} variant="ghost" marginLeft={4}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export { FolderModal };
