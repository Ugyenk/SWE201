// hooks/useAuth.js
// Custom hook encapsulating all authentication logic

import { useState } from 'react';
import { signIn, signUp, signOut } from '../api/authService';
import useAppStore from '../store/useAppStore';

const useAuth = () => {
  const setAuth = useAppStore((s) => s.setAuth);
  const clearAuth = useAppStore((s) => s.clearAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await signIn({ email, password });
      setAuth(user, token);
      return true;
    } catch (err) {
      setError(err?.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await signUp({ name, email, password });
      setAuth(user, token);
      return true;
    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut();
    clearAuth();
  };

  return { login, register, logout, loading, error, setError };
};

export default useAuth;
