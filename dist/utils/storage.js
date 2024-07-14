// src/utils/storage.ts
export const getStorageData = (key, callback) => {
    chrome.storage.sync.get(key, (data) => {
        callback(data[key]);
    });
};
export const setStorageData = (key, value, callback) => {
    const data = {};
    data[key] = value;
    chrome.storage.sync.set(data, () => {
        if (callback)
            callback();
    });
};
