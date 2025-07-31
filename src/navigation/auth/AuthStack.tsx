import {
  createStaticNavigation,
  LinkingOptions,
  NavigationIndependentTree,
  StaticParamList,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '../../screens/auth/Auth';
const AuthStack = createNativeStackNavigator({
  initialRouteName: 'Auth',
  screenOptions: {
    headerShown: false,
    headerTitle: undefined,
  },
  screens: {
    Auth: {
      linking: '/',
      screen: Auth,
    },
  },
});

type AuthStackParamsList = StaticParamList<typeof AuthStack>;
declare global {
  namespace ReactNavigation {
    interface AuthParamsList extends AuthStackParamsList {}
  }
}

export const AuthNavigation = ({theme}: {theme: Theme}) => {
  const linking: LinkingOptions<ReactNavigation.AuthParamsList> = {
    prefixes: ['delite://'],
    enabled: true,
  };

  const StaticAuthNavigation = createStaticNavigation(AuthStack);
  return (
    <NavigationIndependentTree>
      <StaticAuthNavigation linking={linking} theme={theme} />
    </NavigationIndependentTree>
  );
};
