import { createStaticNavigation, LinkingOptions, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DealerTabs } from "./DealerTabNavigation";
const DealerStack = createNativeStackNavigator({
    initialRouteName: "DealerDashboard",
    screenOptions: {
        headerShown: false,
        headerTitle: "Delite"
    },
    screens: {
        DealerDashboard: {
            screen: DealerTabs,
        },
    },
});

type DealerParamsListType = StaticParamList<typeof DealerStack>;
declare global {
    namespace ReactNavigation {
        interface DealerParamsList extends DealerParamsListType { }
    }
}

export const DealerStackNavigation = () => {

    const linking: LinkingOptions<ReactNavigation.DealerParamsList> = {
        prefixes: ["delite://"],
        enabled: true
    };

    const StaticDealerNavigation = createStaticNavigation(DealerStack);
    return <StaticDealerNavigation linking={linking} />
};