import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { theme } = useTheme();

  // Part 2 — side effect: keep the browser tab title in sync with the theme
  useEffect(() => {
    document.title = `Task Board [${theme} mode]`;
  }, [theme]);

  const bg = theme === "light" ? "#6366f1" : "#312e81";

  return (
    <header
      style={{
        background: bg,
        color: "#ffffff",
        padding: "0.6rem 2rem",
        fontSize: "0.85rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>⚛️ React Hooks Lab</span>
      <span style={{ opacity: 0.8 }}>
        Current theme: <strong>{theme}</strong>
      </span>
    </header>
  );
}

export default Header;
