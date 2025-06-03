import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DealerDashboard from '../../screens/dealer/DealerDashboard';
import Products from '../../screens/dealer/Products';
import { BottomTabBar } from './BottomTabBar';
import { Box, ScrollText } from '@tamagui/lucide-icons';

export const DealerTabs = createBottomTabNavigator({
    tabBar: (props) => <BottomTabBar {...props} />,
    initialRouteName: "Orders",
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Orders: {
            linking: "/all-orders",
            screen: DealerDashboard,
            options: {
                tabBarIcon: () => <ScrollText size={16} strokeWidth={1.5} />
            }
        },
        Products: {
            linking: "/products",
            screen: Products,
            options: {
                tabBarIcon: () => <Box size={16} strokeWidth={1.5} />
            }
        }
    },
});

// type DealerTabsParamsListType = StaticParamList<typeof DealerTabs>;
// declare global {
//     namespace ReactNavigation {
//         interface DealerTabsParamsList extends DealerTabsParamsListType { }
//     }
// }

// export const DealerTabNavigation = () => {

//     const linking: LinkingOptions<ReactNavigation.DealerTabsParamsList> = {
//         prefixes: ["delite://"],
//         enabled: true
//     };

//     const StaticDealerTabNavigation = createStaticNavigation(DealerTabs);
//     return <StaticDealerTabNavigation linking={linking} />
// };