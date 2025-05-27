// AppNavigator.tsx — Stack navigation with updated structure
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import GameScreen from './Screens/GameScreen';
import HowItWorks from './Screens/HowItWorks';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="HowItWorks" component={HowItWorks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
