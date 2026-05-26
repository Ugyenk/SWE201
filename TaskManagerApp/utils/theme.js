// utils/theme.js
// Centralized design tokens for consistent styling across the app

export const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#4B44CC',
  primaryLight: '#EEF0FF',
  secondary: '#F59E0B',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  background: '#F8F9FF',
  surface: '#FFFFFF',
  border: '#E5E7EB',

  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textWhite: '#FFFFFF',

  pending: '#6B7280',
  in_progress: '#F59E0B',
  completed: '#22C55E',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const SHADOW = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};
