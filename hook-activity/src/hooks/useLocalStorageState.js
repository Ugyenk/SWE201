import { useState, useEffect } from "react";

export function useLocalStorageState(key, defaultValue) {
  // Lazy initializer — runs only once; avoids reading localStorage every render
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  // Sync to localStorage whenever key or value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
