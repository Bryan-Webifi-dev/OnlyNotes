/**
 * @module Settings
 * @description Component for the settings menu
 */
import React from 'react';
import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, Tooltip, MenuGroup, IconButton } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

/**
 * @typedef SettingsProps
 * @property {Function} changeSize - Function to change the size of the popup
 * @property {Function} toggleColorMode - Function to toggle the color mode
 * @property {string} colorMode - The current color mode
 */
type SettingsProps = {
  changeSize: (width: string, height: string) => void;
};

/**
 * Settings component
 * @param {SettingsProps} props - The props for the component
 * @return {React.FC} Settings component
 */
const Settings: React.FC<SettingsProps> = ({ changeSize }) => {
  return (
    <ChakraMenu>
      <Tooltip label="Settings" aria-label="Settings">
      <MenuButton as={IconButton} icon={<SettingsIcon />} variant="outline" />
      </Tooltip>
      <MenuList>
        <MenuGroup title="Size">
          <MenuItem onClick={() => changeSize('600px', '600px')}>Default</MenuItem>
          <MenuItem onClick={() => changeSize('800px', '600px')}>Wide</MenuItem>
        </MenuGroup>
      </MenuList>
    </ChakraMenu>
  );
};

export { Settings };

