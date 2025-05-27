import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation<any>(); // ✅ fixes TypeScript + runtime issues

  return (
    <View style={styles.container}>
      <Animated.View entering={ZoomIn.duration(800)}>
        <Image
          source={require('../assets/ice-cube.png')}
          style={styles.logo}
        />
      </Animated.View>

      <Animated.Text entering={FadeInDown.delay(300).duration(600)} style={styles.title}>
        🧊 Melt Me Not
      </Animated.Text>

      <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={styles.buttonText}>▶️ Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('HowItWorks')}
        >
          <Text style={styles.buttonText}>📖 How It Works</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 40,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0096c7',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  secondaryButton: {
    backgroundColor: '#48cae4',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
