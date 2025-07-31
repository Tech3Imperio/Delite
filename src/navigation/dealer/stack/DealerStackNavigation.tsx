import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DealerTabs} from '../tab/DealerTabNavigation';
import {ProfileScreen} from '../../../screens/dealer/Profile';
import {StaticParamList} from '@react-navigation/native';
export const DealerStack = createNativeStackNavigator({
  initialRouteName: 'Dashboard',
  screenOptions: {
    headerShown: false,
    headerTitle: 'Delite',
  },
  screens: {
    Dashboard: {
      screen: DealerTabs,
      linking: {path: '/dashboard'},
    },
    Profile: {
      screen: ProfileScreen,
      linking: {path: '/profile'},
    },
  },
});

export type DealerStackParamsListType = StaticParamList<typeof DealerStack>;
