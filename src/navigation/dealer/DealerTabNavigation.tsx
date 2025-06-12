import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DealerDashboard from '../../screens/dealer/DealerDashboard';
import Accessories from '../../screens/dealer/Accessories';
import { BottomTabBar } from '../../components/dealer/BottomTabBar';
import { Box, ScrollText } from '@tamagui/lucide-icons';
import { BottomTabHeader } from '../../components/dealer/BottomTabHeader';

export const DealerTabs = createBottomTabNavigator({
    tabBar: (props) => <BottomTabBar {...props} />,
    initialRouteName: "Orders",
    screenOptions: {
        headerShown: true,
        header: (props) => <BottomTabHeader {...props} />
    },
    screens: {
        Orders: {
            linking: "/all-orders",
            screen: DealerDashboard,
            options: {
                tabBarIcon: () => <ScrollText size={16} strokeWidth={1.5} />
            }
        },
        Accessories: {
            linking: "/accessories",
            screen: Accessories,
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