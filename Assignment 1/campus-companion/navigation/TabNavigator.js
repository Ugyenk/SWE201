import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MapScreen from '../screens/MapScreen';

import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Switch } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [darkMode, setDarkMode] = useState(false);

  const background = darkMode ? '#121212' : '#ffffff';
  const activeColor = darkMode ? '#4da3ff' : '#2563eb';
  const inactiveColor = darkMode ? '#888' : 'gray';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
          </View>
        ),

        tabBarStyle: {
          backgroundColor: background
        },

        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Contacts') iconName = 'address-book';
          else if (route.name === 'Schedule') iconName = 'calendar';
          else if (route.name === 'Map') iconName = 'map';

          return <FontAwesome name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}
