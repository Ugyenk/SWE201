import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

const AnimationDemoScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const handleBounce = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.5, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handleFade = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animation Demo</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Drag Me (Gesture)</Text>
        <Animated.View
          style={[
            styles.draggableBox,
            { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.dragText}>← Drag →</Text>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Bounce Animation</Text>
        <TouchableOpacity onPress={handleBounce}>
          <Animated.View style={[styles.bounceBox, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.buttonText}>Tap to Bounce</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Fade Animation</Text>
        <TouchableOpacity onPress={handleFade}>
          <Animated.View style={[styles.fadeBox, { opacity: fadeAnim }]}>
            <Text style={styles.buttonText}>Tap to Fade</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  draggableBox: {
    width: 120,
    height: 120,
    backgroundColor: '#4CAF50',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dragText: {
    color: 'white',
    fontWeight: '600',
  },
  bounceBox: {
    width: 150,
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeBox: {
    width: 150,
    height: 60,
    backgroundColor: '#FF9800',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AnimationDemoScreen;