/*********************************************************************
 * @module storage
 * @description Functions to interact with the Chrome storage API
 *********************************************************************/

/**
 * Get data from Chrome storage
 * @param {string} key - The key to get data from
 * @param {function} callback - The callback function to execute with the data
 * @returns {void}
 */
export const getStorageData = (key: string, callback: (data: any) => void) => {
  chrome.storage.sync.get(key, (data) => {
    callback(data[key]);
  });
};

/**
 * Set data in Chrome storage
 * @param {string} key - The key to set data to
 * @param {any} value - The value to set
 * @param {function} callback - The callback function to execute after setting the data
 * @returns {void}
 */
export const setStorageData = (key: string, value: any, callback?: () => void) => {
  const data = {};
  data[key] = value;
  chrome.storage.sync.set(data, () => {
    if (callback) callback();
  });
};
