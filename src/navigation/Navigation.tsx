import {AuthNavigation} from './auth/AuthStack';
import {AdminNavigation} from './admin/AdminStack';
import {useContext} from 'react';
import {AuthContext} from './auth/AuthContext';
import {DefaultTheme, Theme} from '@react-navigation/native';
import {ActivityIndicator, useColorScheme} from 'react-native';
import {useThemeColors} from '../store/themeColors';
import {DealerNavigation} from './dealer/DealerNavigation';
export const Navigation = () => {
  const theme = useColorScheme();
  const themeColors = useThemeColors(state =>
    theme === 'light' ? state.light_colors : state.dark_colors,
  );
  const newTheme: Theme = {...DefaultTheme};
  const {role, loading} = useContext(AuthContext);

  if (loading) {
    return <ActivityIndicator />;
  }

  newTheme.colors.background = themeColors.bg_color;
  switch (role) {
    case 'admin':
      return <AdminNavigation theme={newTheme} />;
    case 'dealer':
      return <DealerNavigation theme={newTheme} />;
    case 'guest':
      return <AuthNavigation theme={newTheme} />;
  }
};
