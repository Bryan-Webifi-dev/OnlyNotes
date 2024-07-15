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
ReactDOM.render(React.createElement(ChakraProvider, { theme: theme },
    React.createElement(ColorModeScript, { initialColorMode: theme.config.initialColorMode }),
    React.createElement(Popup, null)), document.getElementById('root'));
