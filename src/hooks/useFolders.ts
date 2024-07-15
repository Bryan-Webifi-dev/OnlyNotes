/**
 * @module useFolders
 * @description Custom hook for managing folders
 */
import { useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

/**
 * Custom hook for managing folders
 * @returns {object} - The folders state and functions to add and remove folders
 */
const useFolders = () => {
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    getStorageData('folders', (data) => {
      if (data) setFolders(data);
    });
  }, []);

  const addFolder = (folder: string) => {
    const updatedFolders = [...folders, folder];
    setFolders(updatedFolders);
    setStorageData('folders', updatedFolders);
  };

  const removeFolder = (index: number) => {
    const updatedFolders = folders.filter((_, i) => i !== index);
    setFolders(updatedFolders);
    setStorageData('folders', updatedFolders);
  };

  return { folders, addFolder, removeFolder };
};

export { useFolders };
