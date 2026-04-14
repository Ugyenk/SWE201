import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactDetailScreen({ route }) {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contact.name}</Text>

      <View style={styles.row}>
        <Ionicons name="call" size={20} color="#2563eb" />
        <Text style={styles.text}>{contact.phone}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="mail" size={20} color="#2563eb" />
        <Text style={styles.text}>{contact.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  text: {
    fontSize: 16,
    marginLeft: 10
  }
});
