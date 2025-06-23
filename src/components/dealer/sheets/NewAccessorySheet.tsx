import { useState } from "react"
import { useColorScheme } from "react-native"
import { Sheet, View, Text } from "tamagui"
import { useThemeColors } from "../../../store/themeColors"
import { CoverForm } from "../forms/CoverForm"
import { AnchorForm } from "../forms/AnchorForm"
import { BaseName, HandrailName, ModularBendHandrailName } from "../../../types/product/common"
import { WallBracketForm } from "../forms/WallBracketForm"
import { StyleSheet } from "react-native"
import { Accessory } from "../cards/AccessoriesCard"
import { BaseBlockForm } from "../forms/BaseBlockForm"
import { CornerForm } from "../forms/CornerForm"
import { HandrailEndCapForm } from "../forms/HandrailEndCap"
import { JoinerForm } from "../forms/Joiner"
import { EPDMRubberFrom } from "../forms/EPDMRubberForm"
import { ModularBendForm } from "../forms/ModularBendForm"
import { BaseEndCapForm } from "../forms/BaseEndCapForm"
import { HandrailForm } from "../forms/HandrailForm"
const accessoryForms: {
    BA: typeof AnchorForm,
    BC: typeof CoverForm,
    BB: typeof BaseBlockForm
    BEC: typeof BaseEndCapForm
    CC: typeof CornerForm
    FC: typeof ModularBendForm
    H: typeof HandrailForm
    HEC: typeof HandrailEndCapForm
    LJ: typeof JoinerForm
    RG: typeof EPDMRubberFrom
    WB: typeof WallBracketForm
} = {
    BA: AnchorForm,
    BC: CoverForm,
    BB: BaseBlockForm,
    BEC: BaseEndCapForm,
    CC: CornerForm,
    FC: ModularBendForm,
    H: HandrailForm,
    HEC: HandrailEndCapForm,
    LJ: JoinerForm,
    RG: EPDMRubberFrom,
    WB: WallBracketForm,
}

const handrailAccessoryForms: {
    CC: typeof CornerForm
    FC: typeof ModularBendForm
    H: typeof HandrailForm
    HEC: typeof HandrailEndCapForm
    LJ: typeof JoinerForm
    RG: typeof EPDMRubberFrom
    WB: typeof WallBracketForm
} = {
    CC: CornerForm,
    FC: ModularBendForm,
    H: HandrailForm,
    HEC: HandrailEndCapForm,
    LJ: JoinerForm,
    RG: EPDMRubberFrom,
    WB: WallBracketForm,
}

const baseAccessoryForms: {
    BA: typeof AnchorForm,
    BC: typeof CoverForm,
    BB: typeof BaseBlockForm
    BEC: typeof BaseEndCapForm
} = {
    BA: AnchorForm,
    BC: CoverForm,
    BB: BaseBlockForm,
    BEC: BaseEndCapForm,
}

export type AccessoryCode = keyof typeof accessoryForms
export type HandrailAccessoryCode = keyof typeof handrailAccessoryForms
export type BaseAccessoryCode = keyof typeof baseAccessoryForms


export const NewAccessorySheet = ({ open, setOpen, accessory, code, handrailName, baseName, forBase }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, accessory: Accessory, code: HandrailAccessoryCode | BaseAccessoryCode, handrailName: keyof HandrailName | null, baseName: keyof BaseName | null, forBase: boolean }) => {
    if (code === "BC" || code === "BB") {
        baseName = "ACE"
    }
    console.log("accessory", accessory)
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
            snapPoints={[80]}
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
                <View id="This" style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%", maxHeight: "100%" }}>
                    <Text>{`Purchasing ${accessory.name} for ${handrailName || baseName}`}</Text>
                    <View style={{ width: "100%", height: StyleSheet.hairlineWidth, backgroundColor: `${themeColors.b_color}` }}></View>
                    {(() => {
                        if (forBase && baseName) {
                            const FormComponent = baseAccessoryForms[code as BaseAccessoryCode]
                            return FormComponent ? <FormComponent baseKey={baseName} setOpen={setOpen} /> : null
                        }

                        // if (!forBase && handrailName) {
                        //     const FormComponent = handrailAccessoryForms[code as HandrailAccessoryCode]
                        //     return FormComponent ? (
                        //         <FormComponent handrailKey={handrailName} setOpen={setOpen} />
                        //     ) : null
                        // }

                        if (!forBase && handrailName) {
                            const FormComponent = handrailAccessoryForms[code as HandrailAccessoryCode]
                            if (FormComponent) {
                                const Component = FormComponent as React.ComponentType<{ handrailKey: keyof HandrailName | ModularBendHandrailName; setOpen: React.Dispatch<React.SetStateAction<boolean>> }>
                                return <Component handrailKey={handrailName} setOpen={setOpen} />
                            }
                            return null
                        }

                        return null
                    })()}
                </View>
            </Sheet.Frame>
        </Sheet>
    )
}