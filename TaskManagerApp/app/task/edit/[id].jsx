// app/task/edit/[id].jsx
// Edit existing task screen — pre-fills form from global state or API

import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StyleSheet, Alert, ActivityIndicator,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import useAppStore from '../../../store/useAppStore';
import { fetchTaskById, updateTask } from '../../../api/tasksService';
import useForm from '../../../hooks/useForm';
import { validateTaskForm, formatDate } from '../../../utils/helpers';
import { COLORS, FONT_SIZE, SPACING } from '../../../utils/theme';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import StatusPicker from '../../../components/StatusPicker';
import ErrorBanner from '../../../components/ErrorBanner';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const tasks = useAppStore((s) => s.tasks);
  const categories = useAppStore((s) => s.categories);
  const updateTaskInList = useAppStore((s) => s.updateTaskInList);

  const taskFromStore = tasks.find((t) => t.id === id);
  const [loadingTask, setLoadingTask] = useState(!taskFromStore);
  const [fetchError, setFetchError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    taskFromStore?.categoryId || null
  );

  const { values, errors, handleChange, handleBlur, validateAll, setFormValues } = useForm(
    {
      title: taskFromStore?.title || '',
      description: taskFromStore?.description || '',
      status: taskFromStore?.status || 'pending',
      dueDate: taskFromStore?.dueDate?.slice(0, 10) || '',
    },
    validateTaskForm
  );

  // Fetch task from API if not in store
  useEffect(() => {
    if (taskFromStore) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchTaskById(id);
        if (!cancelled) {
          setFormValues({
            title: data.title || '',
            description: data.description || '',
            status: data.status || 'pending',
            dueDate: data.dueDate?.slice(0, 10) || '',
          });
          setSelectedCategoryId(data.categoryId || null);
        }
      } catch (err) {
        if (!cancelled) setFetchError(err?.message || 'Failed to load task.');
      } finally {
        if (!cancelled) setLoadingTask(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const handleSave = async () => {
    if (!validateAll()) return;
    setSaving(true);
    setApiError(null);
    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        dueDate: values.dueDate || undefined,
        categoryId: selectedCategoryId,
      };
      const updated = await updateTask(id, payload);
      updateTaskInList(updated);
      Alert.alert('✅ Updated', 'Task has been updated successfully.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (err) {
      setApiError(err?.message || 'Failed to update task.');
    } finally {
      setSaving(false);
    }
  };

  if (loadingTask) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Task</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          {fetchError ? <ErrorBanner message={fetchError} /> : null}
          {apiError ? (
            <View style={styles.apiErrorBox}>
              <Text style={styles.apiErrorText}>{apiError}</Text>
            </View>
          ) : null}

          <InputField
            label="Title *"
            value={values.title}
            onChangeText={(v) => handleChange('title', v)}
            onBlur={() => handleBlur('title')}
            placeholder="Task title"
            error={errors.title}
          />

          <InputField
            label="Description"
            value={values.description}
            onChangeText={(v) => handleChange('description', v)}
            onBlur={() => handleBlur('description')}
            placeholder="Details…"
            multiline
            numberOfLines={4}
            error={errors.description}
          />

          <StatusPicker
            value={values.status}
            onChange={(v) => handleChange('status', v)}
            error={errors.status}
          />

          <InputField
            label="Due Date"
            value={values.dueDate}
            onChangeText={(v) => handleChange('dueDate', v)}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />

          {/* Category selector */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionLabel}>CATEGORY</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryRow}>
                <TouchableOpacity
                  onPress={() => setSelectedCategoryId(null)}
                  style={[styles.catChip, !selectedCategoryId && styles.catChipActive]}
                >
                  <Text style={[styles.catChipText, !selectedCategoryId && styles.catChipTextActive]}>
                    None
                  </Text>
                </TouchableOpacity>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategoryId(cat.id)}
                    style={[
                      styles.catChip,
                      selectedCategoryId === cat.id && styles.catChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        selectedCategoryId === cat.id && styles.catChipTextActive,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={saving}
            style={styles.saveBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  cancelText: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary },
  headerTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.textPrimary },
  form: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  apiErrorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  apiErrorText: { color: '#991B1B', fontSize: FONT_SIZE.sm },
  sectionLabel: {
    fontSize: FONT_SIZE.xs + 1,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  categorySection: { marginBottom: SPACING.md },
  categoryRow: { flexDirection: 'row', gap: SPACING.sm },
  catChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catChipText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.textSecondary },
  catChipTextActive: { color: '#fff' },
  saveBtn: { marginTop: SPACING.lg },
});
