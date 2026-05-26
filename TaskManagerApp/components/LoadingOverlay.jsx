// components/LoadingOverlay.jsx
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../utils/theme';

const LoadingOverlay = ({ message = 'Loading…' }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
});

export default LoadingOverlay;
