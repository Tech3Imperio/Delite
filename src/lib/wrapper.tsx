import { ReactNode } from "react"
import { useColorScheme } from "react-native"
import { XStack } from "tamagui"
import { useThemeColors } from "../store/themeColors"
export const Wrapper = ({ children }: { children: ReactNode }) => {
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    return (
        <XStack id='Test'
            style={{ flex: 1, justifyContent: 'center', alignItems: "center", flexDirection: "row", backgroundColor: `${themeColors.bg_color}` }}>
            {children}
        </XStack >
    )

}