import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {StaticParamList} from '@react-navigation/native';
import {DealerStack} from '../stack/DealerStackNavigation';
import {SettingsScreen} from '../../../screens/dealer/Settings';
import {DealerDrawerContent} from './DealerDrawerContent';

export const DealerDrawer = createDrawerNavigator({
  initialRouteName: 'Dealer',
  drawerContent: (props: DrawerContentComponentProps) => (
    <DealerDrawerContent props={props} />
  ),
  screenOptions: {
    headerShown: false,
    drawerType: 'slide',
  },
  screens: {
    Dealer: {
      screen: DealerStack,
      linking: {path: '/'},
    },
    Settings: {
      screen: SettingsScreen,
      linking: {path: '/settings'},
    },
  },
});

export type DealerDrawerParamsListType = StaticParamList<typeof DealerDrawer>;
