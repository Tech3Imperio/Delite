import { AuthNavigation } from "./auth/AuthStack";
import { AdminNavigation } from "./admin/AdminStack";
import { DealerStackNavigation } from "./dealer/DealerStackNavigation";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { DefaultTheme, Theme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useThemeColors } from "../store/themeColors";
export const Navigation = () => {
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const { role,
    } = useContext(AuthContext)
    const newTheme: Theme = { ...DefaultTheme }
    newTheme.colors.background = themeColors.bg_color
    switch (role) {
        case 'admin':
            return <AdminNavigation theme={newTheme} />;
        case 'dealer':
            return <DealerStackNavigation theme={newTheme} />;
        case 'guest':
            return <AuthNavigation theme={newTheme} />;
    }
};