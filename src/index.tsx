// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Popup from './pages/Popup';
import theme from './theme';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Popup />
  </ChakraProvider>,
  document.getElementById('root')
);
