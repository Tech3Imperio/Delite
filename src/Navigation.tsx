import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./screens/auth/Auth";
import Dashboard from "./screens/admin/Dashboard";

const RootStack = createNativeStackNavigator({
    initialRouteName: "Auth",
    screens: {
        Auth: {
            screen: Auth,
            options: {
                title: 'Welcome',
            }
        },
        Dashboard: Dashboard,
    },
});

type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export const Navigation = createStaticNavigation(RootStack);