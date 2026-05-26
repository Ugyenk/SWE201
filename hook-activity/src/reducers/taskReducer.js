export const initialTaskState = {
  tasks: [],
};

export function taskReducer(state, action) {
  switch (action.type) {
    // Called once on mount to restore persisted tasks
    case "LOAD_FROM_STORAGE":
      return { ...state, tasks: action.tasks };

    // Append a new task to the list
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.task] };

    // Flip the done flag of a single task
    case "TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };

    // Remove all tasks that are marked done
    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.done),
      };

    default:
      return state;
  }
}
