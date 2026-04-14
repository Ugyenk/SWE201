import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Campus Companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efb7e5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#000000',
    fontSize: 22
  }
});
