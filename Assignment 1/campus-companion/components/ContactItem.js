import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ContactItem({ contact, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{contact.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  text: { fontSize: 16 }
});