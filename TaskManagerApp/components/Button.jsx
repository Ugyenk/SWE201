// components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, RADIUS, FONT_SIZE, SPACING } from '../utils/theme';

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost'
  size = 'md',         // 'sm' | 'md' | 'lg'
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const bgColor = {
    primary: COLORS.primary,
    secondary: COLORS.surface,
    danger: COLORS.danger,
    ghost: 'transparent',
  }[variant];

  const textColor = {
    primary: COLORS.textWhite,
    secondary: COLORS.primary,
    danger: COLORS.textWhite,
    ghost: COLORS.primary,
  }[variant];

  const borderColor = {
    primary: COLORS.primary,
    secondary: COLORS.primary,
    danger: COLORS.danger,
    ghost: 'transparent',
  }[variant];

  const padV = { sm: SPACING.xs, md: SPACING.sm + 4, lg: SPACING.md }[size];
  const fontSize = { sm: FONT_SIZE.sm, md: FONT_SIZE.md, lg: FONT_SIZE.lg }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        {
          backgroundColor: bgColor,
          borderColor,
          paddingVertical: padV,
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor, fontSize }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    minHeight: 44,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default Button;
