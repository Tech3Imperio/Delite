import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DealerDashboard from '../../../screens/dealer/DealerDashboard';
import Accessories from '../../../screens/dealer/Accessories';
import {BottomTabBar} from './BottomTabBar';
import {Box, ScrollText} from '@tamagui/lucide-icons';
import {BottomTabHeader} from './BottomTabHeader';
import {StaticParamList} from '@react-navigation/native';
export const DealerTabs = createBottomTabNavigator({
  tabBar: props => <BottomTabBar {...props} />,
  initialRouteName: 'Orders',
  screenOptions: {
    headerShown: true,
    header: props => <BottomTabHeader {...props} />,
  },
  screens: {
    Orders: {
      screen: DealerDashboard,
      linking: {path: '/orders'},
      options: {
        tabBarIcon: () => <ScrollText size={16} strokeWidth={1.5} />,
      },
    },
    Accessories: {
      screen: Accessories,
      linking: {path: '/accessories'},
      options: {
        tabBarIcon: () => <Box size={16} strokeWidth={1.5} />,
      },
    },
  },
});

export type DealerTabParamsListType = StaticParamList<typeof DealerTabs>;
