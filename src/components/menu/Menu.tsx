/**
 * @module Menu
 * @description Component for the configuration and preferences menu
 */
import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tooltip,
  IconButton,
  useDisclosure,
  Box,
  VStack,
  Text,
} from '@chakra-ui/react';
import { ThemeToggle } from '../inputs/ThemeToggle';
import { FiList } from "react-icons/fi";

/**
 * @typedef MenuProps
 * @property {string[]} folders - List of folders
 */
type MenuProps = {
  folders: string[];
};

/**
 * Menu component
 * @param {MenuProps} props - The props for the component
 * @return {React.FC} Menu component
 */
const Menu: React.FC<MenuProps> = ({ folders }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="Preferences" aria-label="Preferences">
        <IconButton
          aria-label="Preferences"
          icon={<FiList />}
          onClick={onOpen}
          variant="outline"
        />
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Preferences</DrawerHeader>
            <DrawerBody>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={2}>Theme</Text>
                  <ThemeToggle />
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Folders</Text>
                  {folders.length === 0 ? (
                    <Text color="gray.500">No folders available.</Text>
                  ) : (
                    folders.map((folder, index) => (
                      <Text key={index}>{folder}</Text>
                    ))
                  )}
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

