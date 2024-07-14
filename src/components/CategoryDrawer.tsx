// src/components/CategoryDrawer.tsx

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
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

type CategoryDrawerProps = {
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (index: number) => void;
};

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ categories, addCategory, removeCategory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Manage Categories
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Manage Categories</DrawerHeader>
            <DrawerBody>
              <FormControl>
                <FormLabel>New Category</FormLabel>
                <Input
                  placeholder="New category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button onClick={handleAddCategory} marginTop={2}>
                  Add Category
                </Button>
              </FormControl>
              <VStack align="stretch" marginTop={4}>
                {categories.map((category, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                    borderWidth="1px"
                    borderRadius="md"
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
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default CategoryDrawer;
