import { createStaticNavigation, LinkingOptions, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "../../screens/admin/AdminDashboard";
const AdminStack = createNativeStackNavigator({
    initialRouteName: "AdminDashboard",
    screenOptions: {
        headerShown: false,
        headerTitle: undefined
    },
    screens: {
        AdminDashboard: {
            linking: "/dashboard",
            screen: AdminDashboard,
        },
    },
});

type AdminStackParamsList = StaticParamList<typeof AdminStack>;
declare global {
    namespace ReactNavigation {
        interface AdminParamsList extends AdminStackParamsList { }
    }
}

export const AdminNavigation = () => {

    const linking: LinkingOptions<ReactNavigation.AdminParamsList> = {
        prefixes: ["delite://"],
        enabled: true
    };

    const StaticAdminNavigation = createStaticNavigation(AdminStack);
    return <StaticAdminNavigation linking={linking} />
};