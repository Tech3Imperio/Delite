import { useState } from "react"
import { FlatList, useColorScheme } from "react-native"
import { Sheet, YStack, Button } from "tamagui"
import { useThemeColors } from "../store/themeColors"
import { HandrailName, ModularBendHandrailName } from "../types/product/common"

export const ModularBendHandrailValues = {
    SQUARE40: { name: "Square 40", code: "S40" },
    SQUARE50: { name: "Square 50", code: "S50" },
    ROUND50: { name: "Round 50", code: "R50" },
} satisfies ModularBendHandrailName

type ModularBendHaindrailEnrty = {
    key: keyof typeof ModularBendHandrailValues
    name: string
    code: string
}

export const ModularBendHandrailSelect = ({ open, setOpen, openAccessorySheet }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, openAccessorySheet: (handrailName: keyof HandrailName) => void }) => {


    const handrailList: ModularBendHaindrailEnrty[] = Object.entries(ModularBendHandrailValues).map(
        ([key, value]) => ({
            key: key as keyof typeof ModularBendHandrailValues,
            ...value,
        })
    )

    const handlePress = (ModularBendHandrailName: keyof ModularBendHandrailName) => {
        console.log("Reached handlePress")
        setOpen(!open)
        openAccessorySheet(ModularBendHandrailName)
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