import { ScrollView, Text, StyleSheet } from 'react-native';
import schedule from '../data/schedule';

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.container}>
      {schedule.map((item) => (
        <Text key={item.id} style={styles.item}>
          {item.day}: {item.subject}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { marginBottom: 10, fontSize: 16 }
});