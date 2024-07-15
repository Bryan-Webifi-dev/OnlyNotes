/**
 * @module theme
 * @description Custom Chakra UI theme configuration
 * @see https://chakra-ui.com/docs/theming/customize-theme
 */

import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
