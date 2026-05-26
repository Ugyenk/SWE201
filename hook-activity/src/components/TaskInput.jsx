import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  // Two independent pieces of state for the form fields
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    // Notify parent with the new task object
    onAddTask({ id: Date.now(), title: title.trim(), priority });
    // Reset form state
    setTitle("");
    setPriority("normal");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            minWidth: "180px",
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add
        </button>

        <button
          type="button"
          onClick={() => setTitle("")}
          style={{
            padding: "0.5rem 1rem",
            background: "#e5e7eb",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {/* Live preview — updates on every keystroke thanks to controlled state */}
      <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#888" }}>
        Preview: &quot;{title || "(empty)"}&quot; &mdash; priority:{" "}
        <strong>{priority}</strong>
      </div>
    </form>
  );
}

export default TaskInput;
