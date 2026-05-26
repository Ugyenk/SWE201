import React, { createContext, useContext, useState } from "react";

// 1. Create the context (initial value is null; provider supplies the real value)
const ThemeContext = createContext(null);

// 2. Provider wraps the app and holds the state
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Everything passed to `value` is available to any consumer
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. Convenience hook — throws a helpful error if used outside the provider
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}
