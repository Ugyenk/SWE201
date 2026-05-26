// components/StatusPicker.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../utils/theme';
import { getStatusColor, getStatusLabel } from '../utils/helpers';

const STATUSES = ['pending', 'in_progress', 'completed'];

const StatusPicker = ({ value, onChange, error }) => (
  <View style={styles.container}>
    <Text style={styles.label}>STATUS</Text>
    <View style={styles.row}>
      {STATUSES.map((s) => {
        const isSelected = value === s;
        const color = getStatusColor(s);
        return (
          <TouchableOpacity
            key={s}
            onPress={() => onChange(s)}
            style={[
              styles.option,
              isSelected && { backgroundColor: color, borderColor: color },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[styles.optionText, isSelected && { color: '#fff' }]}>
              {getStatusLabel(s)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  label: {
    fontSize: FONT_SIZE.xs + 1,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: { flexDirection: 'row', gap: SPACING.sm },
  option: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  optionText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
});

export default StatusPicker;
