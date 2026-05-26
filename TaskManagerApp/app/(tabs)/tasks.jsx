// app/(tabs)/tasks.jsx
// Main task list screen with search, filter, and pull-to-refresh

import React, { useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  RefreshControl, StyleSheet, SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import useAppStore from '../../store/useAppStore';
import useFetchTasks from '../../hooks/useFetchTasks';
import useFetchCategories from '../../hooks/useFetchCategories';
import TaskCard from '../../components/TaskCard';
import FilterBar from '../../components/FilterBar';
import EmptyState from '../../components/EmptyState';
import ErrorBanner from '../../components/ErrorBanner';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../utils/theme';

export default function TasksScreen() {
  const { loading, error, refresh } = useFetchTasks();
  useFetchCategories(); // load categories into global state

  const getFilteredTasks = useAppStore((s) => s.getFilteredTasks);
  const categories = useAppStore((s) => s.categories);
  const filterStatus = useAppStore((s) => s.filterStatus);
  const setFilterStatus = useAppStore((s) => s.setFilterStatus);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const user = useAppStore((s) => s.user);

  const filteredTasks = getFilteredTasks();

  // Map category id → category for display in task cards
  const categoryMap = categories.reduce((acc, c) => ({ ...acc, [c.id]: c }), {});

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] ?? 'there'} 👋</Text>
          <Text style={styles.subtitle}>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push('/task/create')}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks…"
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter pills */}
      <FilterBar activeFilter={filterStatus} onFilterChange={setFilterStatus} />

      {/* Error */}
      {error ? <ErrorBanner message={error} onRetry={refresh} /> : null}

      {/* Task list */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            category={categoryMap[item.categoryId]}
            onPress={(task) => router.push(`/task/${task.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          !loading ? (
            <EmptyState
              title="No tasks found"
              message={
                searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter.'
                  : 'Tap "+ New" to create your first task!'
              }
              onAction={filterStatus !== 'all' || searchQuery ? () => {
                setFilterStatus('all');
                setSearchQuery('');
              } : () => router.push('/task/create')}
              actionLabel={filterStatus !== 'all' || searchQuery ? 'Clear Filters' : 'Create Task'}
            />
          ) : null
        }
      />
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
  greeting: { fontSize: FONT_SIZE.xl, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, marginTop: 2 },
  addBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  addBtnText: { color: COLORS.textWhite, fontWeight: '700', fontSize: FONT_SIZE.sm },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    marginHorizontal: SPACING.lg,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    height: 46,
  },
  searchIcon: { fontSize: 16, marginRight: SPACING.sm },
  searchInput: { flex: 1, fontSize: FONT_SIZE.md, color: COLORS.textPrimary },
  clearText: { fontSize: 16, color: COLORS.textMuted, padding: 4 },
  list: { padding: SPACING.lg, paddingTop: SPACING.sm, flexGrow: 1 },
});
