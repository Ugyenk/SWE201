// components/ErrorBanner.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../utils/theme';

const ErrorBanner = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.icon}>⚠️</Text>
    <Text style={styles.message}>{message}</Text>
    {onRetry ? (
      <TouchableOpacity onPress={onRetry} style={styles.retryBtn}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF2F2',
    borderColor: COLORS.danger,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    margin: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  icon: { fontSize: 18 },
  message: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: '#991B1B',
    lineHeight: 18,
  },
  retryBtn: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  retryText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
});

export default ErrorBanner;
