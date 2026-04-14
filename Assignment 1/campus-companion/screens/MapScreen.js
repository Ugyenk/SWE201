import { View, Text, Button, StyleSheet, Linking } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Map</Text>
      <Button title="Open Google Maps" onPress={() => Linking.openURL('https://maps.google.com')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 10 }
});
