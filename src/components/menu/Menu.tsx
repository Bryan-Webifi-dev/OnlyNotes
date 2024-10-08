import React from 'react';
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  IconButton,
  Box,
  VStack,
  Text,
  Select,
} from '@chakra-ui/react';
import { ThemeToggle } from '../inputs/ThemeToggle';
import { FiList } from "react-icons/fi";

type MenuProps = {
  changeSize: (width: string, height: string) => void;
};

const Menu: React.FC<MenuProps> = ({ changeSize }) => {
    return (
        <ChakraMenu>
            <Tooltip label="Preferences" aria-label="Preferences">
                <MenuButton as={IconButton} icon={<FiList />} variant="outline" />
            </Tooltip>
            <MenuList>
                <VStack align="stretch" spacing={4} p={4}>
                    <Box>
                        <Text fontWeight="bold" mb={2}>Theme</Text>
                        <ThemeToggle />
                    </Box>
                    <Box>
                        <Text fontWeight="bold" mb={2}>Size</Text>
                        <Select onChange={(e) => changeSize(e.target.value.split('x')[0] + 'px', e.target.value.split('x')[1] + 'px')} placeholder="Select size">
                        <option value="600x600">Default</option>
                        <option value="800x600">Wide</option>
                        </Select>
                    </Box>
                </VStack>
            </MenuList>
        </ChakraMenu>
    );
};

export { Menu };