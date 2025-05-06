import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import ProfileScreen from './Profile';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Welcome' }} />
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;