/**
 * @module Settings
 * @description Component for the settings menu
 */
import React from 'react';
import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

/**
 * @typedef SettingsProps
 * @property {Function} changeSize - Function to change the size of the popup
 * @property {Function} toggleColorMode - Function to toggle the color mode
 * @property {string} colorMode - The current color mode
 */
type SettingsProps = {
  changeSize: (width: string, height: string) => void;
  toggleColorMode: () => void;
  colorMode: string;
};

/**
 * Settings component
 * @param {SettingsProps} props - The props for the component
 * @return {React.FC} Settings component
 */
const Settings: React.FC<SettingsProps> = ({ changeSize, toggleColorMode, colorMode }) => {
  return (
    <ChakraMenu>
      <MenuButton as={IconButton} icon={<SettingsIcon />} variant="outline" size="sm" />
      <MenuList>
        <MenuItem onClick={() => changeSize('600px', '800px')}>Option 1: 600x800</MenuItem>
        <MenuItem onClick={() => changeSize('800px', '1000px')}>Option 2: 800x1000</MenuItem>
        <MenuDivider />
        <MenuItem onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};

export { Settings };
