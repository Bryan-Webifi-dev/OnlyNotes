/**
 * @module Menu
 * @description Component for the menu
 */
import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Box,
  FormControl,
  FormLabel,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

/**
 * @typedef MenuProps
 * @property {string[]} categories - The list of categories
 * @property {(category: string) => void} addCategory - Function to add a category
 * @property {(index: number) => void} removeCategory - Function to remove a category
 * @property {string[]} folders - The list of folders
 * @property {(folder: string) => void} addFolder - Function to add a folder
 * @property {(index: number) => void} removeFolder - Function to remove a folder
 * @returns {JSX.Element}
 */
type MenuProps = {
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (index: number) => void;
  folders: string[];
  addFolder: (folder: string) => void;
  removeFolder: (index: number) => void;
};

/**
 * Component for the menu
 * @param {MenuProps} props - The component properties
 */
const Menu: React.FC<MenuProps> = ({ categories, addCategory, removeCategory, folders, addFolder, removeFolder }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCategory, setNewCategory] = useState('');
  const [newFolder, setNewFolder] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleAddFolder = () => {
    if (newFolder.trim()) {
      addFolder(newFolder.trim());
      setNewFolder('');
    }
  };

  return (
    <>
      <Button onClick={onOpen} size="sm" fontSize="sm">
        Menu
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody display="flex" flexDirection="column" justifyContent="space-between" height="calc(100% - 4rem)">
              <FormControl>
                <FormLabel>New Category</FormLabel>
                <Input
                  placeholder="New category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  bg="white"
                  boxShadow="md"
                  textColor="black"
                  _placeholder={{ color: 'gray.500' }}
                />
                <Button onClick={handleAddCategory} marginTop={2}>
                  Add Category
                </Button>
              </FormControl>
              <FormControl marginTop={4}>
                <FormLabel>New Folder</FormLabel>
                <Input
                  placeholder="New folder"
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  bg="white"
                  boxShadow="md"
                  textColor="black"
                  _placeholder={{ color: 'gray.500' }}
                />
                <Button onClick={handleAddFolder} marginTop={2}>
                  Add Folder
                </Button>
              </FormControl>
              <VStack align="stretch" marginTop={4} spacing={4}>
                <Box>
                  <FormLabel>Categories</FormLabel>
                  {categories.map((category, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      padding={2}
                      borderWidth="1px"
                      borderRadius="md"
                      marginTop={2}
                    >
                      {category}
                      <IconButton
                        aria-label="Remove category"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => removeCategory(index)}
                      />
                    </Box>
                  ))}
                </Box>
                <Box marginTop={4}>
                  <FormLabel>Folders</FormLabel>
                  {folders.map((folder, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      padding={2}
                      borderWidth="1px"
                      borderRadius="md"
                      marginTop={2}
                    >
                      {folder}
                      <IconButton
                        aria-label="Remove folder"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => removeFolder(index)}
                      />
                    </Box>
                  ))}
                </Box>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export { Menu };
