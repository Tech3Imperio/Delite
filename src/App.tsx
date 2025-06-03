// import "react-native-get-random-values"
import React from 'react';
import { Navigation } from './navigation/Navigation';
import { TamaguiProvider } from 'tamagui'
import { config } from './tamagui.config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from './store/themeColors';
import { useColorScheme } from 'react-native';
import AuthProvider from './navigation/auth/AuthContext';
const App = () => {
  const theme = useColorScheme()
  const themeName = theme === 'dark' ? 'dark' : 'light'
  const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
  const bg_color = themeColors.bg_color
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: `${bg_color}` }}>
        <TamaguiProvider config={config} defaultTheme={themeName}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </TamaguiProvider>
      </SafeAreaView>
    </SafeAreaProvider >
  );
};

export default App;