export const getStorageData = (key: string, callback: (data: any) => void) => {
    chrome.storage.sync.get(key, (data) => {
      callback(data[key]);
    });
  };
  
  export const setStorageData = (key: string, value: any, callback?: () => void) => {
    const data = {};
    data[key] = value;
    chrome.storage.sync.set(data, () => {
      if (callback) callback();
    });
  };
  