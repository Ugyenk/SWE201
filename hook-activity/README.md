---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Lab Structure

| Part | Hook(s) | What you build |
|------|---------|---------------|
| 1 | `useState` | `TaskInput` — controlled form with two state fields |
| 2 | `useEffect` | localStorage sync + `document.title` update |
| 3 | `useContext` | `ThemeContext` — light/dark mode without prop drilling |
| 4 | `useReducer` | Refactor task state → `ADD_TASK`, `TOGGLE_DONE`, `CLEAR_COMPLETED` |
| 5 | Custom hooks | `useLocalStorageState`, `useTasks` |

---

## File Map

```
src/
├── main.jsx                        Entry point — wraps app with ThemeProvider
├── App.jsx                         Final integrated app (all hooks in use)
├── components/
│   ├── TaskInput.jsx               Part 1 — useState (controlled form)
│   ├── ThemeToggleButton.jsx       Part 3 — useContext consumer
│   └── Header.jsx                  Part 3 mini-exercise + Part 2 (document.title)
├── context/
│   └── ThemeContext.jsx            Part 3 — createContext, Provider, useTheme
├── reducers/
│   └── taskReducer.js              Part 4 — pure reducer + action types
└── hooks/
    ├── useLocalStorageState.js     Part 5 — custom hook (useState + useEffect)
    └── useTasks.js                 Part 5 (optional) — custom hook (useReducer + useEffect)
```

---

## Exercises

1. **Filter tabs** — Add "All / Active / Completed" filter using local `useState`.

2. **Edit task** — Implement `EDIT_TASK` in `taskReducer.js` (stub is already there).

3. **Clock** — Add a `Clock` component in the Header using `useEffect` + `setInterval`.

4. **Timestamp badge** — Add `createdAt` to tasks; show a badge if created < 5 min ago.

---

## Common Mistakes to Avoid

- **Mutating state** — Never do `state.tasks.push(...)`. Always return a new array/object from reducers.

- **Wrong `useEffect` deps** — Missing or incorrect dependencies cause stale values or infinite loops.

- **Missing provider** — Using `useTheme()` outside `<ThemeProvider>` throws an error (by design).

- **Side effects in reducers** — `taskReducer` must be pure. Put `localStorage` calls in `useEffect`.

- **Conditional hook calls** — Hooks must always be called at the top level, never inside `if`/loops.
