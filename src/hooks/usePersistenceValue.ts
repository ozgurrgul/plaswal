import { useEffect, useState } from "react";
import { getValue } from "../utils/persistence";

export const usePersistenceValue = <T>(
  key: string,
  initialValue: T | undefined
) => {
  const [value, setValue] = useState<T | undefined>(initialValue);

  useEffect(() => {
    getValue<T>(key).then(setValue);

    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes[key]) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [key]);

  return value;
};
