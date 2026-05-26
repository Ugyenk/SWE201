// hooks/useForm.js
// Reusable custom hook for managing form state and client-side validation

import { useState, useCallback } from 'react';

/**
 * useForm
 * @param {object} initialValues - initial field values
 * @param {function} validate - (values) => errors object
 */
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Update a single field value
  const handleChange = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Mark a field as touched (for showing errors on blur)
  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
    }
  }, [values, validate]);

  // Run full validation and return whether form is valid
  const validateAll = useCallback(() => {
    if (!validate) return true;
    const validationErrors = validate(values);
    setErrors(validationErrors);
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    );
    setTouched(allTouched);
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Set form values externally (e.g., when editing an existing record)
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    resetForm,
    setFormValues,
  };
};

export default useForm;
