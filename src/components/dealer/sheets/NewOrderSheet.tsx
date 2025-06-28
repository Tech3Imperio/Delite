import { useState } from "react"
import { useColorScheme } from "react-native"
import { Sheet } from "tamagui"
import { useThemeColors } from "../../../store/themeColors"
import { CoverForm } from "../forms/AccessoryForms/CoverForm"
import { BaseName } from "../../../types/product/common"
import { AceForm } from "../forms/BaseForms/AceForm"


export const NewOrderSheet = ({ open, setOpen, baseKey }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, baseKey: keyof BaseName }) => {
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
            <Sheet.Frame style={{ backgroundColor: themeColors.s_color, padding: 20 }}><AceForm setOpen={setOpen} /></Sheet.Frame>
        </Sheet>
    )
}