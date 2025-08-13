type GetValueFn = <T>(key: string) => Promise<T>;

// TODO chrome check, fallback to browser.storage
export const getValue: GetValueFn = async (key) => {
  const result = await chrome.storage.local.get(key);
  return result[key];
};

export const setValue = async <T>(key: string, value: T) => {
  await chrome.storage.local.set({ [key]: value });
};

export const removeValue = async (key: string) => {
  await chrome.storage.local.remove(key);
};
