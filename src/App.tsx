import React from 'react';
import { Navigation } from './Navigation';
import { TamaguiProvider } from 'tamagui'
import { config } from './tamagui.config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { usePrimaryBackgroundColor } from '../states/primaryBackgroundColor';
const App = () => {
  const primaryBackgroundColor = usePrimaryBackgroundColor((state) => state.light)
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: `${primaryBackgroundColor}` }}>
        <TamaguiProvider config={config}>
          <Navigation />
        </TamaguiProvider>
      </SafeAreaView>
    </SafeAreaProvider >

  );
};

export default App;