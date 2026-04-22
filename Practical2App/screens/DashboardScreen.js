import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

export default function DashboardScreen({ navigation }) {
  const { width } = useWindowDimensions();

  // Breakpoint: side-by-side cards on wide screens (tablets/landscape)
  const isWide = width >= 600;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.screenContainer}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome Back </Text>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            This layout adapts to your screen size using Flexbox and
            useWindowDimensions.
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>87%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Responsive Cards */}
        <Text style={styles.sectionHeading}>Overview</Text>
        <View style={[styles.cardContainer, isWide && styles.cardContainerWide]}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}></Text>
            <Text style={styles.cardTitle}>Analytics</Text>
            <Text style={styles.cardText}>
              Track your performance metrics and monitor growth across all
              your activities in real time.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}></Text>
            <Text style={styles.cardTitle}>Schedule</Text>
            <Text style={styles.cardText}>
              View upcoming tasks and deadlines. Stay organised with a clear
              timeline of your responsibilities.
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionHeading}>Recent Activity</Text>
        {['Submitted Assignment 3', 'Reviewed Lab Report', 'Attended Lecture'].map(
          (item, index) => (
            <View key={index} style={styles.activityItem}>
              <Text style={styles.activityDot}>●</Text>
              <Text style={styles.activityText}>{item}</Text>
            </View>
          )
        )}

        {/* Navigate to Profile */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>View Profile →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eef2f7',
  },

  // Header
  header: {
    backgroundColor: '#475666',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#a8bfd0',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#c5d5e0',
    lineHeight: 18,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#475666',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  // Section Heading
  sectionHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },

  // Cards
  cardContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  cardContainerWide: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },

  // Activity
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  activityDot: {
    color: '#7dd7ee',
    fontSize: 16,
    marginRight: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#444',
  },

  // Button
  button: {
    backgroundColor: '#475666',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
