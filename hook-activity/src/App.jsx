import React from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, dispatch } = useTasks();

  const background = theme === "light" ? "#f5f5f5" : "#1a1a1a";
  const color = theme === "light" ? "#111111" : "#f0f0f0";
  const cardBg = theme === "light" ? "#ffffff" : "#2a2a2a";
  const border = theme === "light" ? "#e0e0e0" : "#444444";

  // Filter helpers
  const activeTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background,
        color,
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      {/* Part 3: Header reads theme via useTheme */}
      <Header />

      <div style={{ padding: "1rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1 style={{ margin: 0 }}>Reactive Task Board</h1>
          {/* Part 3: ThemeToggleButton uses useContext */}
          <ThemeToggleButton />
        </div>

        {/* Part 1 & 4: TaskInput uses useState internally; onAddTask dispatches ADD_TASK */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
          <h3 style={{ marginTop: 0 }}>➕ Add a Task</h3>
          <TaskInput
            onAddTask={(task) =>
              dispatch({ type: "ADD_TASK", task: { ...task, done: false } })
            }
          />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <StatBadge label="Total" count={tasks.length} color="#6366f1" />
          <StatBadge label="Active" count={activeTasks.length} color="#10b981" />
          <StatBadge label="Done" count={completedTasks.length} color="#f59e0b" />
        </div>

        {/* Task List */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: "8px", padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ margin: 0 }}>📋 Tasks</h3>
            <button
              onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
              style={{
                padding: "0.3rem 0.75rem",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Clear Completed
            </button>
          </div>

          {tasks.length === 0 && (
            <p style={{ color: "#999", fontStyle: "italic" }}>No tasks yet. Add one above!</p>
          )}

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tasks.map((t) => (
              <li
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.6rem 0",
                  borderBottom: `1px solid ${border}`,
                  gap: "0.75rem",
                }}
              >
                {/* Part 4: TOGGLE_DONE action dispatched on checkbox change */}
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => dispatch({ type: "TOGGLE_DONE", id: t.id })}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <span
                  style={{
                    flex: 1,
                    textDecoration: t.done ? "line-through" : "none",
                    opacity: t.done ? 0.5 : 1,
                  }}
                >
                  {t.title}
                </span>
                <PriorityBadge priority={t.priority} />
              </li>
            ))}
          </ul>
        </div>

        <footer style={{ marginTop: "2rem", fontSize: "0.8rem", color: "#888", textAlign: "center" }}>
          React Hooks Lab — 2nd Year B.E. Software Engineering
        </footer>
      </div>
    </div>
  );
}

function StatBadge({ label, count, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        borderRadius: "6px",
        padding: "0.4rem 0.9rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "70px",
      }}
    >
      <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{count}</span>
      <span style={{ fontSize: "0.75rem" }}>{label}</span>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const colors = { low: "#10b981", normal: "#6366f1", high: "#ef4444" };
  return (
    <span
      style={{
        fontSize: "0.75rem",
        padding: "0.2rem 0.5rem",
        borderRadius: "999px",
        background: colors[priority] || "#999",
        color: "#fff",
        textTransform: "capitalize",
      }}
    >
      {priority}
    </span>
  );
}

export default App;
