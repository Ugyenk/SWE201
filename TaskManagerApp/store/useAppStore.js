// store/useAppStore.js
// Global state using Zustand — holds tasks, categories, auth, and filters
// Persists auth token + last filter to AsyncStorage

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAppStore = create((set, get) => ({
  // ─── Auth State ────────────────────────────────────────────
  user: null,
  token: null,
  isAuthLoading: true, // true while rehydrating on app start

  setAuth: (user, token) => {
    set({ user, token });
  },

  clearAuth: () => {
    set({ user: null, token: null });
  },

  setAuthLoading: (val) => set({ isAuthLoading: val }),

  // ─── Tasks State ───────────────────────────────────────────
  tasks: [],
  tasksLoading: false,
  tasksError: null,

  setTasks: (tasks) => set({ tasks }),
  setTasksLoading: (val) => set({ tasksLoading: val }),
  setTasksError: (err) => set({ tasksError: err }),

  // Add a new task to the list
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),

  // Replace a task in the list by id
  updateTaskInList: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    })),

  // Remove a task from the list by id
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

  // ─── Categories State ──────────────────────────────────────
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  setCategories: (categories) => set({ categories }),
  setCategoriesLoading: (val) => set({ categoriesLoading: val }),
  setCategoriesError: (err) => set({ categoriesError: err }),

  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),

  removeCategoryFromList: (id) =>
    set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),

  // ─── Filter/Search State ───────────────────────────────────
  filterStatus: 'all',     // 'all' | 'pending' | 'in_progress' | 'completed'
  filterCategoryId: null,
  searchQuery: '',

  setFilterStatus: async (status) => {
    set({ filterStatus: status });
    // Persist last selected filter
    await AsyncStorage.setItem('last_filter_status', status);
  },

  setFilterCategoryId: (id) => set({ filterCategoryId: id }),

  setSearchQuery: (q) => set({ searchQuery: q }),

  // Derived selector: tasks filtered by current filter/search state
  getFilteredTasks: () => {
    const { tasks, filterStatus, filterCategoryId, searchQuery } = get();
    return tasks.filter((task) => {
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesCategory =
        !filterCategoryId || task.categoryId === filterCategoryId;
      const matchesSearch =
        !searchQuery ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  },

  // ─── Rehydration ───────────────────────────────────────────
  rehydrate: async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userRaw = await AsyncStorage.getItem('auth_user');
      const lastFilter = await AsyncStorage.getItem('last_filter_status');

      if (token && userRaw) {
        set({ user: JSON.parse(userRaw), token });
      }
      if (lastFilter) {
        set({ filterStatus: lastFilter });
      }
    } catch (e) {
      // Rehydration failure is non-fatal
      console.warn('Rehydration failed:', e);
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));

export default useAppStore;
