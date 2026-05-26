// hooks/useFetchTasks.js
// Custom hook: fetches all tasks and loads them into global store
// Supports manual refresh and retry

import { useEffect, useCallback, useRef } from 'react';
import useAppStore from '../store/useAppStore';
import { fetchTasks } from '../api/tasksService';

const useFetchTasks = () => {
  const setTasks = useAppStore((s) => s.setTasks);
  const setTasksLoading = useAppStore((s) => s.setTasksLoading);
  const setTasksError = useAppStore((s) => s.setTasksError);
  const tasksLoading = useAppStore((s) => s.tasksLoading);
  const tasksError = useAppStore((s) => s.tasksError);

  // Use a ref to handle cancellation (prevent state updates on unmounted component)
  const cancelledRef = useRef(false);

  const loadTasks = useCallback(async () => {
    cancelledRef.current = false;
    setTasksLoading(true);
    setTasksError(null);
    try {
      const data = await fetchTasks();
      if (!cancelledRef.current) {
        // Sort newest first by createdAt
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sorted);
      }
    } catch (err) {
      if (!cancelledRef.current) {
        setTasksError(err?.message || 'Failed to load tasks.');
      }
    } finally {
      if (!cancelledRef.current) {
        setTasksLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadTasks();
    return () => {
      cancelledRef.current = true;
    };
  }, [loadTasks]);

  return { loading: tasksLoading, error: tasksError, refresh: loadTasks };
};

export default useFetchTasks;
