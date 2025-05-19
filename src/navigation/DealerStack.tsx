import { createStaticNavigation, LinkingOptions, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/dealer/DealerDashboard";
const DealerStack = createNativeStackNavigator({
    initialRouteName: "DealerDashboard",
    screenOptions: {
        headerShown: false,
        headerTitle: undefined
    },
    screens: {
        DealerDashboard: {
            linking: "/dashboard",
            screen: Dashboard,
        },
    },
});

type DealerStackParamsList = StaticParamList<typeof DealerStack>;
declare global {
    namespace ReactNavigation {
        interface DealerParamsList extends DealerStackParamsList { }
    }
}

export const DealerNavigation = () => {

    const linking: LinkingOptions<ReactNavigation.DealerParamsList> = {
        prefixes: ["delite://"],
        enabled: true
    };

    const StaticDealerNavigation = createStaticNavigation(DealerStack);
    return <StaticDealerNavigation linking={linking} />
};