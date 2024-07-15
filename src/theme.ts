/**
 * @module theme
 * @description Custom Chakra UI theme configuration
 * @see https://chakra-ui.com/docs/theming/customize-theme
 */

import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;

