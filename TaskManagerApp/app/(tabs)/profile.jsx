// app/(tabs)/profile.jsx
import React from 'react';
import { View, Text, Alert, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import useAppStore from '../../store/useAppStore';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import { COLORS, FONT_SIZE, SPACING, RADIUS, SHADOW } from '../../utils/theme';

export default function ProfileScreen() {
  const user = useAppStore((s) => s.user);
  const tasks = useAppStore((s) => s.tasks);
  const { logout } = useAuth();

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/auth');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() ?? '?'}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Task Summary</Text>
        <View style={styles.statsRow}>
          <StatCard label="Completed" count={completedCount} color={COLORS.success} />
          <StatCard label="In Progress" count={inProgressCount} color={COLORS.warning} />
          <StatCard label="Pending" count={pendingCount} color={COLORS.textMuted} />
        </View>

        {/* Sign out */}
        <Button
          title="Sign Out"
          variant="danger"
          onPress={handleSignOut}
          style={styles.signOutBtn}
        />
      </View>
    </SafeAreaView>
  );
}

function StatCard({ label, count, color }) {
  return (
    <View style={[styles.statCard, { borderTopColor: color, borderTopWidth: 3 }]}>
      <Text style={[styles.statCount, { color }]}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, padding: SPACING.lg },
  avatarCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOW.light,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: '800' },
  name: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.textPrimary },
  email: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary, marginTop: 4 },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  statsRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.xl },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOW.light,
  },
  statCount: { fontSize: FONT_SIZE.xxl, fontWeight: '800' },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary, fontWeight: '600', marginTop: 2 },
  signOutBtn: { marginTop: 'auto' },
});
