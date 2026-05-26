// components/FilterBar.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../utils/theme';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
];

const FilterBar = ({ activeFilter, onFilterChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {FILTER_OPTIONS.map((opt) => {
      const isActive = activeFilter === opt.value;
      return (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onFilterChange(opt.value)}
          style={[styles.pill, isActive && styles.pillActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  pillTextActive: { color: COLORS.textWhite },
});

export default FilterBar;
