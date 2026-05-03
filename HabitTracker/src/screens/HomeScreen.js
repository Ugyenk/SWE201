import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import HabitCard from '../components/HabitCard';
import { habits } from '../data/mockData';

const HomeScreen = ({ navigation }) => {
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.length; // Mock data - all completed

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student! </Text>
        <Text style={styles.subtitle}>Track your daily habits</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{habits.length}</Text>
          <Text style={styles.statLabel}>Active Habits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalStreak}</Text>
          <Text style={styles.statLabel}>Total Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedToday}</Text>
          <Text style={styles.statLabel}>Done Today</Text>
        </View>
      </View>

      {/* Habits List */}
      <Text style={styles.sectionTitle}>Your Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            title={item.title}
            category={item.category}
            streak={item.streak}
            color={item.color}
            onPress={() => navigation.navigate('HabitDetail', { habit: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;