import React from 'react';
import { Navigation } from './Navigation';
import { TamaguiProvider } from 'tamagui'
import { config } from './tamagui.config';
const App = () => {
  return (
    <TamaguiProvider config={config}>
      <Navigation />
    </TamaguiProvider>
  );
};

export default App;