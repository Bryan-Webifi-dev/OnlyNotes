/*********************************************************************
 * @name OnlyNotes
 * @author Bryan Shea
 * @version 1.0.0
 *********************************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Popup from './pages/Popup';
import theme from './theme';
import './global.css';
import './components/css/ThemeToggle.css';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Popup />
  </ChakraProvider>,
  document.getElementById('root')
);
