// hooks/useFetchCategories.js
// Custom hook to fetch categories and store them globally

import { useEffect, useCallback, useRef } from 'react';
import useAppStore from '../store/useAppStore';
import { fetchCategories } from '../api/categoriesService';

const useFetchCategories = () => {
  const setCategories = useAppStore((s) => s.setCategories);
  const setCategoriesLoading = useAppStore((s) => s.setCategoriesLoading);
  const setCategoriesError = useAppStore((s) => s.setCategoriesError);
  const categoriesLoading = useAppStore((s) => s.categoriesLoading);
  const categoriesError = useAppStore((s) => s.categoriesError);
  const cancelledRef = useRef(false);

  const loadCategories = useCallback(async () => {
    cancelledRef.current = false;
    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const data = await fetchCategories();
      if (!cancelledRef.current) setCategories(data);
    } catch (err) {
      if (!cancelledRef.current)
        setCategoriesError(err?.message || 'Failed to load categories.');
    } finally {
      if (!cancelledRef.current) setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
    return () => { cancelledRef.current = true; };
  }, [loadCategories]);

  return { loading: categoriesLoading, error: categoriesError, refresh: loadCategories };
};

export default useFetchCategories;
