import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ react-native-vector-icons

export default function HowItWorks() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2563eb" />
      </TouchableOpacity>

      <Text style={styles.title}>🧊 How It Works</Text>

      <Text style={styles.sectionTitle}>🎯 Goal</Text>
      <Text style={styles.text}>
        Guide the ice cube to the 🏠 home tile before it completely melts!
      </Text>

      <Text style={styles.sectionTitle}>🎮 Controls</Text>
      <Text style={styles.text}>
        Tap on any adjacent tile (up/down/left/right) to move the ice cube.
      </Text>

      <Text style={styles.sectionTitle}>☀️ Sun & ❄️ Snow</Text>
      <Text style={styles.text}>
        - Sun (☀️) melts the ice when it's next to it.{"\n"}
        - Snow (❄️) helps restore the ice cube if it's near.
      </Text>

      <Text style={styles.sectionTitle}>🧱 Walls</Text>
      <Text style={styles.text}>
        You can't move through walls. Find another way!
      </Text>

      <Text style={styles.sectionTitle}>🔥 Melting Stages</Text>
      <Text style={styles.text}>
        Ice → Melt-1 → Melt-2 → Melt-3 → Melt-4 (💧 Game Over!)
      </Text>

      <Text style={styles.sectionTitle}>🏆 Win Condition</Text>
      <Text style={styles.text}>
        Reach the 🏠 home tile before the ice melts completely.
      </Text>

      <Text style={styles.sectionTitle}>💥 Game Over</Text>
      <Text style={styles.text}>
        If you reach Melt-4 stage, the level restarts.
      </Text>

      <Text style={styles.footer}>Have fun and stay cool! 🧊❄️🔥</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#f0f9ff',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2563eb',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
    color: '#1e40af',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1e293b',
  },
  footer: {
    fontSize: 16,
    marginTop: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0f172a',
  },
});
