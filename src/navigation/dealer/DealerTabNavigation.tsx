import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DealerDashboard from '../../screens/dealer/DealerDashboard';
import Products from '../../screens/dealer/Products';
import { BottomTabBar } from './BottomTabBar';

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
        },
        Products: {
            linking: "/products",
            screen: Products,
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