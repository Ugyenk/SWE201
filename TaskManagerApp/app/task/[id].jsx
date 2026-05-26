// app/task/[id].jsx
// Task detail screen: view all fields, navigate to edit, delete with confirmation

import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
  SafeAreaView, StyleSheet, ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import useAppStore from '../../store/useAppStore';
import { fetchTaskById } from '../../api/tasksService';
import { deleteTask } from '../../api/tasksService';
import { COLORS, FONT_SIZE, SPACING, RADIUS, SHADOW } from '../../utils/theme';
import { formatDate, getStatusColor, getStatusLabel } from '../../utils/helpers';
import Button from '../../components/Button';
import ErrorBanner from '../../components/ErrorBanner';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const tasks = useAppStore((s) => s.tasks);
  const categories = useAppStore((s) => s.categories);
  const removeTask = useAppStore((s) => s.removeTask);

  // Try to find task from global store first for instant display
  const taskFromStore = tasks.find((t) => t.id === id);
  const [task, setTask] = useState(taskFromStore || null);
  const [loading, setLoading] = useState(!taskFromStore);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const category = categories.find((c) => c.id === task?.categoryId);
  const statusColor = getStatusColor(task?.status);

  // Fetch task from backend if not in store
  useEffect(() => {
    if (taskFromStore) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchTaskById(id);
        if (!cancelled) setTask(data);
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load task.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteTask(task.id);
              removeTask(task.id);
              router.back();
            } catch (err) {
              Alert.alert('Error', err?.message || 'Failed to delete task.');
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <ErrorBanner message={error} onRetry={() => { setError(null); setLoading(true); }} />
      </SafeAreaView>
    );
  }

  if (!task) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Tasks</Text>
        </TouchableOpacity>

        {/* Status banner */}
        <View style={[styles.statusBanner, { backgroundColor: statusColor + '18' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusLabel, { color: statusColor }]}>
            {getStatusLabel(task.status)}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{task.title}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          {category ? (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>🏷️ {category.name}</Text>
            </View>
          ) : null}
          <Text style={styles.date}>📅 Due {formatDate(task.dueDate)}</Text>
        </View>

        {/* Description */}
        {task.description ? (
          <View style={styles.descCard}>
            <Text style={styles.descLabel}>Description</Text>
            <Text style={styles.descText}>{task.description}</Text>
          </View>
        ) : null}

        {/* Created at */}
        <Text style={styles.createdAt}>
          Created {formatDate(task.createdAt)}
        </Text>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Edit Task"
            onPress={() => router.push(`/task/edit/${task.id}`)}
            style={{ flex: 1 }}
          />
          <Button
            title={deleting ? 'Deleting…' : 'Delete'}
            variant="danger"
            loading={deleting}
            onPress={handleDelete}
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: SPACING.lg, flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backBtn: { marginBottom: SPACING.lg },
  backText: { fontSize: FONT_SIZE.md, color: COLORS.primary, fontWeight: '600' },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.md,
    gap: SPACING.xs,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusLabel: { fontWeight: '700', fontSize: FONT_SIZE.sm },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 34,
    marginBottom: SPACING.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  categoryText: { fontSize: FONT_SIZE.sm, color: COLORS.primary, fontWeight: '600' },
  date: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary },
  descCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOW.light,
  },
  descLabel: {
    fontSize: FONT_SIZE.xs + 1,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  descText: { fontSize: FONT_SIZE.md, color: COLORS.textPrimary, lineHeight: 22 },
  createdAt: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  actions: { flexDirection: 'row', gap: SPACING.sm, marginTop: 'auto' },
});
