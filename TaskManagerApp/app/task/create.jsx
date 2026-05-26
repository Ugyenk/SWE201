// app/task/create.jsx
// Create new task screen with client-side validation

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import useAppStore from '../../store/useAppStore';
import { createTask } from '../../api/tasksService';
import useForm from '../../hooks/useForm';
import { validateTaskForm } from '../../utils/helpers';
import { COLORS, FONT_SIZE, SPACING } from '../../utils/theme';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import StatusPicker from '../../components/StatusPicker';

export default function CreateTaskScreen() {
  const categories = useAppStore((s) => s.categories);
  const addTask = useAppStore((s) => s.addTask);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    { title: '', description: '', status: 'pending', dueDate: '' },
    validateTaskForm
  );

  const handleSave = async () => {
    if (!validateAll()) return;
    setSaving(true);
    setApiError(null);
    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        dueDate: values.dueDate || new Date().toISOString(),
        categoryId: selectedCategoryId,
        createdAt: new Date().toISOString(),
      };
      const created = await createTask(payload);
      addTask(created);
      Alert.alert('✅ Task Created', 'Your task has been saved.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (err) {
      setApiError(err?.message || 'Failed to create task. Please try again.');
    } finally {
      setSaving(false);
    }
  };

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
          <Text style={styles.headerTitle}>New Task</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
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
            placeholder="What needs to be done?"
            error={errors.title}
          />

          <InputField
            label="Description"
            value={values.description}
            onChangeText={(v) => handleChange('description', v)}
            onBlur={() => handleBlur('description')}
            placeholder="Add some details…"
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
                  style={[
                    styles.catChip,
                    !selectedCategoryId && styles.catChipActive,
                  ]}
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
            title="Create Task"
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
