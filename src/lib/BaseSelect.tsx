import { useState } from "react"
import { FlatList, useColorScheme } from "react-native"
import { Sheet, YStack, Button } from "tamagui"
import { useThemeColors } from "../store/themeColors"
import { BaseName } from "../types/product/common"

export const baseValues = {
    ACE: { anchorID: "CH", anchorType: "C10", ID: "A50" },
    PRO: { anchorID: "HH", anchorType: "H10", ID: "L50" },
    SMART: { anchorID: "HH", anchorType: "H10", ID: "C75" },
    MINI: { anchorID: "HK", anchorType: "H8", ID: "F55" },
    SEMIPRO: { anchorID: "HH", anchorType: "H10", ID: "C50" },
    SEMISMART: { anchorID: "HH", anchorType: "H10", ID: "D75" },
    SEMIMINI: { anchorID: "HK", anchorType: "H8", ID: "D55" },
    LUX: { anchorID: "HH", anchorType: "C10", ID: "T100" },
    SPIGOT: { anchorID: "HH", anchorType: "C10", ID: "E80" },
    DOT: { anchorID: "M12", anchorType: "M12", ID: "E50" },
    MICRO: { anchorID: "NA", anchorType: "NA", ID: "F40" },
} satisfies BaseName


type BaseEntry = {
    key: keyof typeof baseValues
    anchorID: string
    anchorType: string
    ID: string
}

export const Baseselect = ({ open, setOpen, openAccessorySheet }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, openAccessorySheet: (baseName: keyof BaseName) => void }) => {


    const baseList: BaseEntry[] = Object.entries(baseValues).map(
        ([key, value]) => ({
            key: key as keyof typeof baseValues,
            ...value,
        })
    )

    const handlePress = (baseName: keyof BaseName) => {
        console.log("Reached handlePress")
        setPosition(1)
        setTimeout(() => {
            setOpen(!open)
            openAccessorySheet(baseName)
        }, 300)
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
            snapPoints={[75, 0]}
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
                    data={baseList}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <YStack p={12} borderBottomWidth={1} borderColor="gray">
                            <Button fontSize={16} onPress={() => handlePress(item.key)}>{item.key}</Button>
                        </YStack>
                    )}
                />
            </Sheet.Frame>
        </Sheet>
    )
}