import { FlatList } from 'react-native';
import ContactItem from '../components/ContactItem';
import contacts from '../data/contacts';

export default function ContactsScreen({ navigation }) {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          onPress={() => navigation.navigate('ContactDetail', { contact: item })}
        />
      )}
    />
  );
}