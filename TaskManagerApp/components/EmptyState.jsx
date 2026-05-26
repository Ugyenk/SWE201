// components/EmptyState.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../utils/theme';
import Button from './Button';

const EmptyState = ({ title = 'Nothing here yet', message, onAction, actionLabel }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>📭</Text>
    <Text style={styles.title}>{title}</Text>
    {message ? <Text style={styles.message}>{message}</Text> : null}
    {onAction && actionLabel ? (
      <Button title={actionLabel} onPress={onAction} style={styles.button} />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    gap: SPACING.sm,
  },
  emoji: { fontSize: 52, marginBottom: SPACING.sm },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: { marginTop: SPACING.md, paddingHorizontal: SPACING.xl },
});

export default EmptyState;
