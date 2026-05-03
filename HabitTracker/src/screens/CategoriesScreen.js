import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { categories, habits } from '../data/mockData';

const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          const categoryHabits = habits.filter(h => h.category === item.name);
          
          return (
            <TouchableOpacity
              style={[styles.categoryCard, { backgroundColor: item.color + '20' }]}
              onPress={() => navigation.navigate('AnimationDemo')}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.habitCount}>{categoryHabits.length} habits</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingTop: 40,
  },
  listContainer: {
    padding: 10,
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  habitCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default CategoriesScreen;