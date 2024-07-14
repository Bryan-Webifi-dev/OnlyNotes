// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Popup from './pages/Popup';
import theme from './theme';
ReactDOM.render(React.createElement(ChakraProvider, { theme: theme },
    React.createElement(ColorModeScript, { initialColorMode: theme.config.initialColorMode }),
    React.createElement(Popup, null)), document.getElementById('root'));
