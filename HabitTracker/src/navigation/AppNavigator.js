import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnimationDemoScreen from '../screens/AnimationDemoScreen';
import HabitDetailScreen from '../screens/HabitDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home flow
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Habit Tracker', headerShown: false }}
      />
      <Stack.Screen 
        name="HabitDetail" 
        component={HabitDetailScreen} 
        options={{ title: 'Habit Details' }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 10,
        },
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: 'white',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ 
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📂</Text>,
        }}
      />
      <Tab.Screen 
        name="Animations" 
        component={AnimationDemoScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>✨</Text>,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

// Need this import for the tab icons
import { Text } from 'react-native';

export default AppNavigator;