import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  useState,
} from 'react-native';

const ProfileScreen = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Student User</Text>
        <Text style={styles.email}>student@university.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}> Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}> Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
          />
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statText}>Total Habits Tracked:</Text>
          <Text style={styles.statNumber}>12</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statText}>Best Streak:</Text>
          <Text style={styles.statNumber}>21 days</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statText}>Completion Rate:</Text>
          <Text style={styles.statNumber}>85%</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  statsSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  statText: {
    fontSize: 16,
    color: '#666',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#FF5252',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;