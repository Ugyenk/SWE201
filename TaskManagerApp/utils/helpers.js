// utils/helpers.js
// Shared utility functions used across the app

/**
 * Format an ISO date string to a readable date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Returns a color string for a given task status
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return '#22C55E';   // green
    case 'in_progress': return '#F59E0B'; // amber
    case 'pending': return '#6B7280';     // gray
    default: return '#6B7280';
  }
};

/**
 * Returns a human-readable label for a status key
 */
export const getStatusLabel = (status) => {
  switch (status) {
    case 'completed': return 'Completed';
    case 'in_progress': return 'In Progress';
    case 'pending': return 'Pending';
    default: return status;
  }
};

/**
 * Client-side validation for the task form
 * @returns {object} errors — empty object means valid
 */
export const validateTaskForm = (values) => {
  const errors = {};

  if (!values.title || values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }
  if (values.title && values.title.trim().length > 100) {
    errors.title = 'Title must be at most 100 characters.';
  }
  if (values.description && values.description.length > 500) {
    errors.description = 'Description must be at most 500 characters.';
  }
  if (!values.status) {
    errors.status = 'Please select a status.';
  }

  return errors;
};

/**
 * Client-side validation for the auth form
 */
export const validateAuthForm = (values, isSignUp = false) => {
  const errors = {};

  if (isSignUp && (!values.name || values.name.trim().length < 2)) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
};

/**
 * Truncate text to a max character count
 */
export const truncate = (text, maxLength = 80) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};
