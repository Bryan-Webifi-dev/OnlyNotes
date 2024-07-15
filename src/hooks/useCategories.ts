/**
 * @module useCategories
 * @description Custom hook for managing categories
 */
import { useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

/**
 * Custom hook for managing categories
 * @returns {object} - The categories state and functions to add and remove categories
 */
const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getStorageData('categories', (data) => {
      if (data) setCategories(data);
    });
  }, []);

  const addCategory = (category: string) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setStorageData('categories', updatedCategories);
  };

  const removeCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    setStorageData('categories', updatedCategories);
  };

  return { categories, addCategory, removeCategory };
};

export { useCategories };
