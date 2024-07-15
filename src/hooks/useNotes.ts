/**
 * @module useNotes
 * @description Custom hook for managing notes
 */
import { useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

/**
 * Custom hook for managing notes
 * @returns {object} - The notes state and functions to save, update, and remove notes
 */
const useNotes = () => {
  const [notes, setNotes] = useState<{ note: string; timestamp: string; tags: string[]; folder: string }[]>([]);

  useEffect(() => {
    getStorageData('notes', (data) => {
      if (data) setNotes(data);
    });
  }, []);

  const saveNote = (note: string, tags: string[], folder: string) => {
    const timestamp = new Date().toLocaleString();
    const updatedNotes = [...notes, { note, timestamp, tags, folder }];
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  const updateNote = (note: string, tags: string[], folder: string) => {
    const updatedNotes = notes.map((n) =>
      n.note === note && JSON.stringify(n.tags) === JSON.stringify(tags) && n.folder === folder
        ? { ...n, note, tags, folder }
        : n
    );
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  const removeNote = (note: string, tags: string[], folder: string) => {
    const updatedNotes = notes.filter(n =>
      !(n.note === note && JSON.stringify(n.tags) === JSON.stringify(tags) && n.folder === folder)
    );
    setNotes(updatedNotes);
    setStorageData('notes', updatedNotes);
  };

  return { notes, saveNote, updateNote, removeNote };
};

export { useNotes };
