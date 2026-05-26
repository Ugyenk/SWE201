// app/(tabs)/categories.jsx
// Categories CRUD screen (secondary entity)

import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert,
  SafeAreaView, StyleSheet, Modal, ActivityIndicator,
} from 'react-native';
import useAppStore from '../../store/useAppStore';
import useFetchCategories from '../../hooks/useFetchCategories';
import { createCategory, deleteCategory } from '../../api/categoriesService';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import ErrorBanner from '../../components/ErrorBanner';
import { COLORS, FONT_SIZE, SPACING, RADIUS, SHADOW } from '../../utils/theme';

export default function CategoriesScreen() {
  const { loading, error, refresh } = useFetchCategories();
  const categories = useAppStore((s) => s.categories);
  const addCategory = useAppStore((s) => s.addCategory);
  const removeCategoryFromList = useAppStore((s) => s.removeCategoryFromList);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleCreate = async () => {
    if (!newName.trim() || newName.trim().length < 2) {
      setNameError('Name must be at least 2 characters.');
      return;
    }
    setSaving(true);
    setApiError(null);
    try {
      const created = await createCategory({ name: newName.trim() });
      addCategory(created);
      setNewName('');
      setModalVisible(false);
    } catch (err) {
      setApiError(err?.message || 'Failed to create category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (category) => {
    Alert.alert(
      'Delete Category',
      `Delete "${category.name}"? Tasks using this category won't be affected.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCategory(category.id);
              removeCategoryFromList(category.id);
            } catch (err) {
              Alert.alert('Error', err?.message || 'Failed to delete category.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => { setModalVisible(true); setApiError(null); }}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {error ? <ErrorBanner message={error} onRetry={refresh} /> : null}

      {loading && categories.length === 0 ? (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.catCard}>
              <Text style={styles.catEmoji}>🏷️</Text>
              <Text style={styles.catName}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <EmptyState
              title="No categories yet"
              message="Add categories to organize your tasks."
              onAction={() => setModalVisible(true)}
              actionLabel="Add Category"
            />
          }
        />
      )}

      {/* Create Category Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Category</Text>
            {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}
            <InputField
              label="Category Name"
              value={newName}
              onChangeText={(v) => { setNewName(v); setNameError(''); }}
              placeholder="e.g. Work, Personal…"
              error={nameError}
            />
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => { setModalVisible(false); setNewName(''); setNameError(''); }}
                variant="ghost"
                style={{ flex: 1 }}
              />
              <Button
                title="Create"
                onPress={handleCreate}
                loading={saving}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: { fontSize: FONT_SIZE.xl, fontWeight: '800', color: COLORS.textPrimary },
  addBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: FONT_SIZE.sm },
  list: { padding: SPACING.lg, flexGrow: 1 },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  catCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOW.light,
  },
  catEmoji: { fontSize: 22, marginRight: SPACING.sm },
  catName: { flex: 1, fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.textPrimary },
  deleteBtn: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  deleteText: { color: COLORS.danger, fontWeight: '700', fontSize: FONT_SIZE.sm },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  modalTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  apiError: {
    backgroundColor: '#FEF2F2',
    color: '#991B1B',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZE.sm,
  },
  modalActions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
});
