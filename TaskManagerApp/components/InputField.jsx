// components/InputField.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../utils/theme';

const InputField = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  style,
}) => (
  <View style={[styles.container, style]}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <TextInput
      style={[
        styles.input,
        multiline && styles.multiline,
        error && styles.inputError,
        !editable && styles.disabled,
      ]}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textMuted}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      numberOfLines={multiline ? numberOfLines : 1}
      editable={editable}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    minHeight: 48,
  },
  multiline: {
    minHeight: 100,
    paddingTop: SPACING.sm + 2,
  },
  inputError: { borderColor: COLORS.danger },
  disabled: { backgroundColor: '#F3F4F6', color: COLORS.textMuted },
  errorText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
});

export default InputField;
