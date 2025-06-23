import { useState } from "react"
import { FlatList, useColorScheme } from "react-native"
import { Sheet, YStack, Button } from "tamagui"
import { useThemeColors } from "../store/themeColors"
import { HandrailName } from "../types/product/common"

export const handrailValues = {
    SLEEK12: { name: "Sleek 12", code: "S12" },
    SLEEK17: { name: "Sleek 17", code: "S17" },
    SLEEK21: { name: "Sleek 21", code: "S21" },
    SQUARE40: { name: "Square 40", code: "S40" },
    SQUARE50: { name: "Square 50", code: "S50" },
    ROUND50: { name: "Round 50", code: "R50" },
    OVAL60: { name: "Oval 60", code: "O60" },
    LED20: { name: "LED 20", code: "L20" },
    LED40: { name: "LED 40", code: "L40" },
    LED80: { name: "LED 80", code: "L80" },
    SLIM25: { name: "Slim 25", code: "S25" },
} satisfies HandrailName

type HandrailEntry = {
    key: keyof typeof handrailValues
    name: string
    code: string
}

export const HandrailSelect = ({ open, setOpen, openAccessorySheet }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, openAccessorySheet: (handrailName: keyof HandrailName) => void }) => {


    const handrailList: HandrailEntry[] = Object.entries(handrailValues).map(
        ([key, value]) => ({
            key: key as keyof typeof handrailValues,
            ...value,
        })
    )

    const handlePress = (handrailName: keyof HandrailName) => {
        console.log("Reached handlePress")
        setOpen(!open)
        openAccessorySheet(handrailName)
    }

    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const [position, setPosition] = useState<number>(0)
    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            open={open}
            modal={true}
            zIndex={100_000}
            position={position}
            onPositionChange={setPosition}
            snapPoints={[75]}
            animation={"quick"}
            onOpenChange={setOpen}
            dismissOnSnapToBottom={true}
        >
            <Sheet.Overlay
                style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
                animation="quick"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }} />
            <Sheet.Handle style={{ backgroundColor: themeColors.s_color }} />
            <Sheet.Frame style={{ backgroundColor: themeColors.s_color, padding: 20 }}>
                <FlatList
                    data={handrailList}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <YStack p={12} borderBottomWidth={1} borderColor="gray">
                            <Button fontSize={16} onPress={() => handlePress(item.key)}>{item.name}</Button>
                        </YStack>
                    )}
                />
            </Sheet.Frame>
        </Sheet>
    )
}