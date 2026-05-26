// components/TaskCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS, SHADOW } from '../utils/theme';
import { formatDate, getStatusColor, getStatusLabel, truncate } from '../utils/helpers';

const TaskCard = ({ task, onPress, category }) => {
  const statusColor = getStatusColor(task.status);

  return (
    <TouchableOpacity
      onPress={() => onPress(task)}
      activeOpacity={0.85}
      style={styles.card}
    >
      {/* Status accent bar on left */}
      <View style={[styles.accent, { backgroundColor: statusColor }]} />

      <View style={styles.content}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {task.title}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {getStatusLabel(task.status)}
            </Text>
          </View>
        </View>

        {/* Description */}
        {task.description ? (
          <Text style={styles.description}>{truncate(task.description, 90)}</Text>
        ) : null}

        {/* Footer: category + due date */}
        <View style={styles.footer}>
          {category ? (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ) : null}
          <Text style={styles.date}>Due: {formatDate(task.dueDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm + 4,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOW.light,
  },
  accent: {
    width: 5,
    borderTopLeftRadius: RADIUS.lg,
    borderBottomLeftRadius: RADIUS.lg,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  categoryText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
  date: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
  },
});

export default TaskCard;
