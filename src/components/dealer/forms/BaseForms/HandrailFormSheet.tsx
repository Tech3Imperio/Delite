import { useState } from "react"
import { useColorScheme } from "react-native"
import { Sheet, View, Text } from "tamagui"
import { useThemeColors } from "../../../../store/themeColors"
import { HandrailName } from "../../../../types/product/common"
import { StyleSheet } from "react-native"
import { HandrailForm } from "../AccessoryForms/HandrailForm"
import { Handrail } from "../../../../types/product/accessories"


export const HandrailFormSheet = ({ open, setOpen, handrailName, handleCancel, addToBase, defaultValues }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, handrailName: keyof HandrailName, handleCancel?: () => void, addToBase: (data: Handrail<keyof HandrailName>) => void, defaultValues?: Handrail<keyof HandrailName> }) => {
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
                id="SheetOverlayID"
                style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
                animation="quick"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }} />
            <Sheet.Handle style={{ backgroundColor: themeColors.s_color }} />
            <Sheet.Frame id="FrameContentID" width={"100%"} style={{ backgroundColor: themeColors.s_color, padding: 20 }}>
                <View id="This" style={{ flex: 1, flexDirection: "column", gap: 12 }}>
                    <Text>{`Purchasing ${handrailName}`}</Text>
                    <View style={{ width: "100%", height: StyleSheet.hairlineWidth, backgroundColor: `${themeColors.b_color}` }}></View>
                    <HandrailForm handrailKey={handrailName} setOpen={setOpen} withBase={true} handleCancel={handleCancel} addToBase={addToBase} defaultValues={defaultValues} />
                </View>
            </Sheet.Frame>
        </Sheet>
    )
}