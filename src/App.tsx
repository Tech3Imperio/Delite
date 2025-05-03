import React from 'react';
import { SafeAreaView, View, Text } from 'react-native'; // Import necessary components

const App = () => {
  return (
    <SafeAreaView 
     style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
      <Text accessibilityRole='header'>React Native Fun!</Text>
      <View><Text>Hi Hello</Text></View>
    </SafeAreaView>
  );
};

export default App;