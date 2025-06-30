import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { useColorScheme, StyleSheet, Platform } from "react-native"
import { View, Image, Text, Button } from "tamagui"
import { useThemeColors } from "../../store/themeColors"
import { UserCircle } from "@tamagui/lucide-icons"
import { removeToken } from "../../utils/auth/session"

export const BottomTabHeader: React.FC<BottomTabHeaderProps> = ({ navigation, route, options }) => {
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const lightImage = Platform.OS === "web"
        ? { uri: `/assets/${theme}.png` }
        : theme === "light" ? require("../../../public/assets/light.png") : require("../../../public/assets/dark.png")

    const deliteImage = Platform.OS === "web"
        ? { uri: `/assets/delite-${theme}.png` }
        : theme === "light" ? require("../../../public/assets/delite-light.png") : require("../../../public/assets/delite-dark.png")
    function signOut() {
        throw new Error("Function not implemented.")
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: "flex-end", justifyContent: "space-between", padding: 20, height: 60, backgroundColor: themeColors.bg_color, borderBottomColor: themeColors.b_color, borderBottomWidth: StyleSheet.hairlineWidth }}>
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 8 }}>
                <Image source={lightImage} style={{ width: 28, height: 28, borderRadius: 100 }} />
                <Image source={deliteImage} style={{ width: 72, height: 16, borderRadius: 0 }} />
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', gap: 8 }}>
                <Button size="$3" themeInverse onPress={() => {
                    signOut()
                    removeToken()
                }}>Sign Out</Button>
            </View>
        </View>
    )
}