import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
  const { width } = useWindowDimensions();

  // On wider screens, show info and preferences side by side
  const isWide = width >= 600;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.screenContainer}>

        {/* Avatar and Name */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>UKP</Text>
          </View>
          <Text style={styles.userName}>Ugyen Kinley Phuntshok </Text>
          <Text style={styles.userEmail}>02240337.cst@rub.edu.bt</Text>
        </View>

        {/* Responsive Info + Preferences Row */}
        <View style={[styles.infoRow, isWide && styles.infoRowWide]}>

          {/* User Information */}
          <View style={[styles.section, isWide && styles.sectionWide]}>
            <Text style={styles.sectionTitle}> User Information</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>Ugyen Kinley Phuntshok </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Student ID</Text>
              <Text style={styles.infoValue}>02240337</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Programme</Text>
              <Text style={styles.infoValue}>B.Sc. SWE</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Year</Text>
              <Text style={styles.infoValue}>2nd Year</Text>
            </View>
          </View>

          {/* Preferences */}
          <View style={[styles.section, isWide && styles.sectionWide]}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {[
              { label: 'Notifications', value: 'Enabled' },
              { label: 'Language', value: 'English' },
              { label: 'Theme', value: 'Light' },
              { label: 'Privacy', value: 'Friends Only' },
            ].map((pref, index) => (
              <View key={index} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{pref.label}</Text>
                <Text style={styles.infoValue}>{pref.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            This is a responsive profile screen built for Practical 2. The layout uses Flexbox,
            ScrollView, and useWindowDimensions to gracefully adapt to phones
            and tablets in both portrait and landscape orientations.
          </Text>
        </View>

        {/* Go Back Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Go Back</Text>
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

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: '#475666',
    borderRadius: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#7dd7ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#475666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 13,
    color: '#a8bfd0',
    marginTop: 2,
  },

  // Info Row (responsive)
  infoRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 12,
  },
  infoRowWide: {
    flexDirection: 'row',
  },

  // Section Card
  section: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  sectionWide: {
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475666',
    marginBottom: 12,
  },

  // Info Items
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },

  // About
  aboutText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },

  // Button
  button: {
    backgroundColor: '#475666',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
