import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, XStack, YStack, Text, Button, ScrollView } from "tamagui";
import { useColorScheme } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeColors } from "../../../../store/themeColors";
import { SelectDemo } from "../../../../lib/Select";
import { useEffect, useState } from "react";
import { getFinishCode } from "../../../../utils/dealer/getFinishCode";
import { QuantityInput } from "../../../../lib/QuantityInput";
import { createProProtocol, createSemiProProtocol, Pro, SemiPro } from "../../../../types/product/base";
import { HandrailName } from "../../../../types/product/common";
import { Switch } from "tamagui";
import { HandrailSelect } from "../../../../lib/HandrailSelect";
import { HandrailFormSheet } from "./HandrailFormSheet";
import { Handrail } from "../../../../types/product/accessories";
import { SelectAnchorSize } from "../../../../lib/AnchorSizeSelect";
import { Edit3 } from "@tamagui/lucide-icons";

export const SemiProForm = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    console.log("In Semi Pro form")

    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const [handrailKey, setHandrailKey] = useState<keyof HandrailName | null>(null)
    const [hasHandrail, setHasHandrial] = useState<boolean>(false)
    const [openHandrailForm, setOpenHandrailForm] = useState<boolean>(false)
    const [openHandrailSelect, setOpenHandrailSelect] = useState<boolean>(false)
    const [editHandrailForm, setEditHandrailForm] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SemiPro>({
        resolver: zodResolver(createSemiProProtocol(handrailKey)),
        mode: "onBlur",
        defaultValues: {
            handrail: null
        }
    })

    const handrail = watch("handrail")

    useEffect(() => {
        const color = watch("base.finish.color")
        const base = watch()
        console.log("Color", color, base)
        const code = color !== undefined && getFinishCode(color)
        console.log("In useEffect", code)
        if (code) {
            setValue("base.finish.code", code) // or a mapping function if needed
        }
    }, [watch("base.finish.color")])

    useEffect(() => {
        setValue("baseProfileID", "C50");
        setValue("base.anchor.anchorID", "HH")
        setValue("base.anchor.anchorType", "H10")
        setValue("base.anchor.baseProfileID", "C50")
        setValue("base.anchor.quantity", watch("base.quantity"))
        console.log("reached end of useEffect", watch())
    }, [watch("base.quantity"), watch("base.finish.color")])

    useEffect(() => {
        console.log("Errors:", errors);
    }, [errors]);

    const addToBase = (data: Handrail<keyof HandrailName>) => {
        console.log("data from aceForm for handrail", data)
        setValue("handrail", data)
    }

    const setHandrailToNull = () => {
        setValue("handrail", null)
        console.log(watch("handrail"))
    }

    const handleCancel = () => {
        setHasHandrial(prev => !prev)
    }

    const handleHandrailFormSheet = (handrailName: keyof HandrailName) => {
        console.log("reached handleSheet", handrailName)
        setHandrailKey((prev) => prev = handrailName)
        setTimeout(() => {
            setOpenHandrailForm(!openHandrailForm)
        }, 10)
    }

    const onSubmit: SubmitHandler<SemiPro> = async (data) => {
        console.log("Data from Semi Pro", data)
        // try {
        //     const response = await fetch(`${getApiBaseUrl()}/auth/signin`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     const result = await response.json();
        //     if (result.success) {
        //         await storeToken(result.access_token)
        //         signIn(result.role)
        //     }
        // } catch (error) {
        //     if (error instanceof Error) {
        //         console.error("Sign-in error:", error.message);
        //     } else {
        //         console.error("Sign-in error:", error);
        //     }
        // }
    };

    return (
        <>
            <YStack id="Test" flex={1} style={{ alignItems: "start", justifyContent: "space-between", gap: 16 }}>
                <ScrollView width={"100%"} contentContainerStyle={{
                    verticalAlign: "center",
                    justify: 'flex-start',
                    gap: 16
                }}>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                        <XStack style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-start", gap: 16 }}>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <SelectDemo onChange={onChange} onBlur={onBlur} value={value} />
                                )}
                                name="base.finish.color"
                            />
                            {errors.base?.finish?.color && (
                                <Text style={{ color: "red", fontSize: 12 }}>{errors.base.finish.color.message}</Text>
                            )}
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onBlur, value } }) => (
                                    <Input width={150} readOnly value={value?.toString()} size="$2" placeholder='Color Code' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                                )}
                                name="base.finish.code"
                            />
                            {errors.base?.finish?.code && (
                                <Text style={{ color: "red", fontSize: 12 }}>{errors.base.finish.code.message}</Text>
                            )}
                        </XStack>
                    </YStack>
                    <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Quantity</Text>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            defaultValue={0}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                            )}
                            name="base.quantity"
                        />
                        {errors.base?.quantity && (
                            <Text style={{ color: "red", fontSize: 12, }}>{errors.base.quantity.message}</Text>
                        )}
                    </XStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <SelectAnchorSize onChange={onChange} onBlur={onBlur} value={value} />
                            )}
                            name="base.anchor.anchorSize"
                        />
                        {errors.base?.anchor?.anchorSize && (
                            <Text style={{ color: "red", fontSize: 12 }}>{errors.base.anchor.anchorSize.message}</Text>
                        )}
                    </YStack>
                    <XStack width={"77%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                        <Text flex={1} style={{ fontSize: 14, fontWeight: "bold" }}>Handrail</Text>
                        <XStack flex={1} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 20 }}>
                            <Switch
                                themeInverse
                                size="$1"
                                checked={hasHandrail}
                                onCheckedChange={async (checked) => {
                                    setHasHandrial(prev => !prev)
                                    if (checked) {
                                        setOpenHandrailSelect(prev => !prev)
                                    }
                                    if (!checked) {
                                        setHandrailToNull()
                                    }
                                }}
                            >
                                <Switch.Thumb animation="quicker" />
                            </Switch>
                            {
                                watch("handrail") !== null && (
                                    <XStack gap={"$2"} style={{ alignSelf: "flex-end" }}>
                                        <Button size={"$1.5"} style={{ alignSelf: "flex-end" }} circular themeInverse icon={() => <Edit3 size={14} />} onPress={() => setEditHandrailForm(prev => !prev)} />
                                    </XStack>
                                )
                            }
                        </XStack>
                    </XStack>
                </ScrollView>
                <XStack gap={"$2"} style={{ alignSelf: "flex-end" }}>
                    <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} variant="outlined" onPress={() => setOpen(prev => !prev)}>Cancel</Button>
                    <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} themeInverse onPress={handleSubmit(onSubmit)}>Place Order</Button>
                </XStack>
            </YStack >
            {(openHandrailForm && handrailKey) && <HandrailFormSheet open={openHandrailForm} setOpen={setOpenHandrailForm} handrailName={handrailKey} handleCancel={handleCancel} addToBase={addToBase} />}
            {openHandrailSelect && <HandrailSelect open={openHandrailSelect} setOpen={setOpenHandrailSelect} openAccessorySheet={handleHandrailFormSheet} />}
            {(editHandrailForm && handrailKey) && <HandrailFormSheet open={editHandrailForm} setOpen={setEditHandrailForm} handrailName={handrailKey} addToBase={addToBase} defaultValues={watch("handrail")!} />}
        </>
    )
}