/**
 * @module useUIState
 * @description Custom hook for managing UI state
 */
import { useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

/**
 * Custom hook for managing UI state
 * @returns {object} - The UI state
 */
const useUIState = () => {
  const [size, setSize] = useState<{ width: string; height: string }>({ width: '400px', height: '600px' });
  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    getStorageData('size', (data) => {
      if (data) setSize(data);
    });
  }, []);

  const changeSize = (width: string, height: string) => {
    const newSize = { width, height };
    setSize(newSize);
    setStorageData('size', newSize);
  };

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newColorMode);
  };

  return { size, colorMode, changeSize, toggleColorMode };
};

export { useUIState };
