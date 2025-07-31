import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  DealerDrawer,
  DealerDrawerParamsListType,
} from './drawer/DealerDrawerNavigation';
import {DealerStackParamsListType} from './stack/DealerStackNavigation';
import {DealerTabParamsListType} from './tab/DealerTabNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  createStaticNavigation,
  LinkingOptions,
  NavigationIndependentTree,
  Theme,
} from '@react-navigation/native';

type DealerTabNavigationPropType =
  BottomTabNavigationProp<DealerTabParamsListType>;
type DealerStackNavigationPropType =
  NativeStackNavigationProp<DealerStackParamsListType>;
type DealerDrawerNavigationPropType =
  DrawerNavigationProp<DealerDrawerParamsListType>;

type RootNavigationProp = CompositeNavigationProp<
  DealerTabNavigationPropType,
  CompositeNavigationProp<
    DealerStackNavigationPropType,
    DealerDrawerNavigationPropType
  >
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationProp {}
  }
}

export const DealerNavigation = ({theme}: {theme: Theme}) => {
  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['delite://'],
    enabled: true,
  };

  console.log('This is the theme received', theme);

  const StaticDealerNavigation = createStaticNavigation(DealerDrawer);
  return (
    <NavigationIndependentTree>
      <StaticDealerNavigation linking={linking} theme={theme} />
    </NavigationIndependentTree>
  );
};
