/**
 * @module ThemeToggle
 * @description Component for toggling the theme between light and dark mode
 */

import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import '../css/ThemeToggle.css';

/**
 * ThemeToggle component
 * @returns {JSX.Element}
 */
const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box className="switch" onClick={toggleColorMode}>
      <input type="checkbox" checked={colorMode === 'dark'} readOnly />
      <span className="slider"></span>
    </Box>
  );
};

export { ThemeToggle };

