import { createStaticNavigation, LinkingOptions, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./screens/auth/Auth";
import Dashboard from "./screens/admin/Dashboard";
const RootStack = createNativeStackNavigator({
    initialRouteName: "Auth",
    screenOptions: {
        headerShown: false,
        headerTitle: undefined
    },
    screens: {
        Auth: {
            linking: "/",
            screen: Auth,
            options: {
                title: 'Welcome',
            }
        },
        Dashboard: {
            linking: "/dashboard",
            screen: Dashboard
        },
    },
});

type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export const Navigation = () => {

    const linking: LinkingOptions<ReactNavigation.RootParamList> = {
        prefixes: ["delite://"],
        // config: {
        //     screens: {
        //         Auth: '',
        //         Dashboard: 'dashboard',
        //     },
        // }, config is not necessary for linking to work if linking is provided in screens in RootStack above
        enabled: true
    };

    const StaticNavigation = createStaticNavigation(RootStack);

    return <StaticNavigation linking={linking} />;
};