import { createStaticNavigation, LinkingOptions, StaticParamList, Theme } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";
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

export const DealerStackNavigation = ({ theme }: { theme: Theme }) => {

    const linking: LinkingOptions<ReactNavigation.DealerParamsList> = {
        prefixes: ["delite://"],
        enabled: true
    };

    const StaticDealerNavigation = createStaticNavigation(DealerStack);
    return <StaticDealerNavigation linking={linking} theme={theme} />
};