import { useReducer, useEffect } from "react";
import { taskReducer, initialTaskState } from "../reducers/taskReducer";

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  // Side effect 1: Load persisted tasks on first mount only (empty dep array)
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      dispatch({ type: "LOAD_FROM_STORAGE", tasks: JSON.parse(stored) });
    }
  }, []);

  // Side effect 2: Persist tasks to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Expose tasks array and dispatch to the consumer
  return { tasks: state.tasks, dispatch };
}
