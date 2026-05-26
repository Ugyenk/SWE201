import React from "react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "0.4rem 1rem",
        border: "2px solid currentColor",
        borderRadius: "999px",
        cursor: "pointer",
        background: "transparent",
        color: "inherit",
        fontSize: "0.9rem",
      }}
    >
      {theme === "light" ? " Dark Mode" : " Light Mode"}
    </button>
  );
}

export default ThemeToggleButton;
