import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';

const HabitDetailScreen = ({ route, navigation }) => {
  const { habit } = route.params;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    // Slide up animation
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
    }).start();
  }, []);

  const handleComplete = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={[styles.header, { borderBottomColor: habit.color }]}>
          <Text style={styles.title}>{habit.title}</Text>
          <Text style={styles.category}>{habit.category}</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}> {habit.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>Daily</Text>
            <Text style={styles.statLabel}>Goal</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About this habit</Text>
          <Text style={styles.description}>
            Track your {habit.title.toLowerCase()} progress daily. 
            Consistency is key to building lasting habits!
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.completeButton, { backgroundColor: habit.color }]}
          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <Animated.Text style={styles.buttonText}>
            ✓ Mark Complete
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  descriptionSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  completeButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HabitDetailScreen;